/**
 * dsh-orchestrator selftest —— 不依赖 DSH host，直接验证：
 *   1) config 的 Standard Schema 校验
 *   2) apply() 能注册工具
 *   3) 子进程调到 python 的 src/jsonbridge.py (op=list)
 *
 * 运行: node selftest.mjs
 */
import assert from 'node:assert'
import { Config, apply, validatePlanPath } from './lib/index.js'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { fileURLToPath } from 'node:url'
const PROJECT = fileURLToPath(new URL('../langgraph-orchestrator', import.meta.url))

async function main() {
  // 1) config 校验
  const bad = Config['~standard'].validate({})
  assert.ok(bad.issues, '空配置应报缺 projectDir')

  const good = Config['~standard'].validate({ projectDir: PROJECT })
  assert.ok(good.value, '带 projectDir 应通过')
  assert.equal(good.value.pythonExe, 'python')
  assert.equal(good.value.timeoutMs, 300000)
  console.log('[PASS] config validate')

  // 2) 捕获注册的工具
  let registered = null
  const fakeCtx = { tools: { register: (def) => { registered = def } } }
  apply(fakeCtx, good.value)
  assert.ok(registered, '应注册工具')
  assert.equal(registered.name, 'orchestrate')
  assert.ok(typeof registered.execute === 'function')
  assert.equal(registered.parameters.required, undefined)
  assert.ok(registered.parameters.properties.workdir)
  assert.deepEqual(registered.parameters.properties.execution.required, ['program', 'args'])
  assert.ok(registered.parameters.properties.delta)
  await assert.rejects(() => registered.execute({ op: 'plan_review' }, {}), /plan/)
  // P0-1 plan_path 契约校验（纯逻辑，不 spawn python）
  {
    const wd = mkdtempSync(join(tmpdir(), 'orch-pp-'))
    mkdirSync(join(wd, '.plan'), { recursive: true })
    writeFileSync(join(wd, '.plan', 'ok.md'), '# ok\n')
    // ① 存在且合法的 plan_path：放行（返回 null）
    assert.equal(validatePlanPath('.plan/ok.md', wd), null)
    // ② 文件不存在：预检报错
    assert.match(validatePlanPath('.plan/nope.md', wd), /不存在/)
    // ③ 越界（不在 .plan 内）：报错
    assert.match(validatePlanPath('outside.md', wd), /\.plan/)
    // ④ 非 .md：报错
    assert.match(validatePlanPath('.plan/ok.txt', wd), /Markdown/)
    // ⑤ 绝对路径：报错
    assert.match(validatePlanPath(join(wd, '.plan', 'ok.md'), wd), /相对/)
    // ⑥ 无 plan_path：放行
    assert.equal(validatePlanPath('', wd), null)
    // ⑦ 仅 plan_path 不抛「需要 plan 参数」——参数校验前置不再因缺 body 而报错
    //    （真正执行会 spawn python，这里只验证校验函数与不误判）
    console.log('[PASS] validatePlanPath contract')
  }
  const invalid = await registered.execute({ op: 'full', workdir: PROJECT + '/missing',
    execution: { program: 'git', args: ['status', '--short'] } }, {})
  assert.ok(invalid.includes('WORKDIR'), 'invalid cwd must fail before execution')
  console.log('[PASS] apply registers orchestrate tool')

  // 3) 真实跑 op=list(会 spawn python)
  const out = await registered.execute(
    { op: 'list', request: 'x' },
    { signal: undefined },
  )
  assert.ok(out.includes('编排器网关'), 'list 输出应含网关')
  assert.ok(out.includes('planner'), 'list 输出应含工具')
  console.log('[PASS] op=list via python bridge')

  // Network/model smoke test is explicit opt-in; default selftests are offline.
  if (process.env.DSH_TEST_MODELS === '1') {
    const out2 = await registered.execute(
      { op: 'tool', tool: 'file_reader', request: '用三个字回答: 你好吗' }, {},
    )
    assert.ok(out2.length > 0)
    console.log('[PASS] optional model smoke test')
  }

  console.log('\nALL ORCHESTRATOR SELFTESTS PASSED')
}

main().catch((e) => {
  console.error('SELFTEST FAILED:', e)
  process.exit(1)
})
