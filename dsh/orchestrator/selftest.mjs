/**
 * dsh-orchestrator selftest —— 不依赖 DSH host，直接验证：
 *   1) config 的 Standard Schema 校验
 *   2) apply() 能注册工具
 *   3) 子进程调到 python 的 src/jsonbridge.py (op=list)
 *
 * 运行: node selftest.mjs
 */
import assert from 'node:assert'
import { Config, apply } from './lib/index.js'

const PROJECT = 'D:\\repository\\skills\\dsh\\langgraph-orchestrator'

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
  assert.deepEqual(registered.parameters.required, ['request'])
  console.log('[PASS] apply registers orchestrate tool')

  // 3) 真实跑 op=list(会 spawn python)
  const out = await registered.execute(
    { op: 'list', request: 'x' },
    { signal: undefined },
  )
  assert.ok(out.includes('编排器网关'), 'list 输出应含网关')
  assert.ok(out.includes('planner'), 'list 输出应含工具')
  console.log('[PASS] op=list via python bridge')

  // 4) 真实跑 op=tool file_reader(一次真实模型调用)
  const out2 = await registered.execute(
    { op: 'tool', tool: 'file_reader', request: '用三个字回答: 你好吗' },
    { signal: undefined },
  )
  assert.ok(out2.length > 0, 'tool 输出不应为空')
  console.log('[PASS] op=tool file_reader ->', out2.split('\n')[0])

  console.log('\nALL ORCHESTRATOR SELFTESTS PASSED')
}

main().catch((e) => {
  console.error('SELFTEST FAILED:', e)
  process.exit(1)
})
