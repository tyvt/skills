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
  // P0-1 plan_path 契约校验（纯逻辑，不 spawn python；测试用临时 DSH_PLAN_ROOT 隔离）
  {
    const wd = mkdtempSync(join(tmpdir(), 'orch-pp-'))
    const prevRoot = process.env.DSH_PLAN_ROOT
    const testRoot = mkdtempSync(join(tmpdir(), 'orch-planroot-'))
    process.env.DSH_PLAN_ROOT = testRoot
    try {
      const wsName = wd.split(/[\\/]/).filter(Boolean).pop()
      const pd = join(testRoot, wsName)
      mkdirSync(pd, { recursive: true })
      writeFileSync(join(pd, 'ok.md'), '# ok\n')
      // ① 存在且合法的 plan_path（相对计划目录）：放行（返回 null）
      assert.equal(validatePlanPath('ok.md', wd), null)
      // ② 文件不存在：预检报错
      assert.match(validatePlanPath('nope.md', wd), /不存在/)
      // ③ 越界（用 .. 逃出 <planRoot>/<workspace>）：报错
      assert.match(validatePlanPath('../outside.md', wd), /工作区目录名/)
      // ④ 非 .md：报错
      writeFileSync(join(pd, 'ok.txt'), 'x')
      assert.match(validatePlanPath('ok.txt', wd), /Markdown/)
      // ⑤ 绝对路径指向计划目录内：放行
      assert.equal(validatePlanPath(join(pd, 'ok.md'), wd), null)
      // ⑤b 绝对路径越界：报错
      assert.match(validatePlanPath(join(testRoot, 'other.md'), wd), /工作区目录名/)
      // ⑥ 无 plan_path：放行
      assert.equal(validatePlanPath('', wd), null)
    } finally {
      if (prevRoot === undefined) delete process.env.DSH_PLAN_ROOT
      else process.env.DSH_PLAN_ROOT = prevRoot
    }
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
