// dsh-agent-guard 集成测试：用真实的插件代码 + 模拟的 cordis 服务，
// 验证两个钩子真的接上了、修复真的发生在参数校验之前。
//
// 用法：node integration-test.mjs
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { apply } from './lib/index.js'

let passed = 0
let failed = 0

async function test(name, fn) {
  try {
    await fn()
    passed++
    console.log(`  ok   ${name}`)
  } catch (error) {
    failed++
    console.log(`  FAIL ${name}`)
    console.log(`       ${error.message}`)
  }
}

// ── 模拟 cordis ctx ────────────────────────────────────────────────────────
const TOOL_DEFS = {
  update_goal: {
    name: 'update_goal',
    parameters: {
      type: 'object',
      properties: {
        action: { type: 'string' },
        goal_id: { type: 'string' },
        revision: { type: 'number' },
        objective: { type: 'string' },
        max_goal_rounds: { type: 'number' },
        blocked_reason: { type: 'string' },
      },
      required: ['action', 'goal_id', 'revision'],
      additionalProperties: false,
    },
  },
  pwsh: {
    name: 'pwsh',
    parameters: {
      type: 'object',
      properties: {
        command: { type: 'string' },
        description: { type: 'string' },
        justification: { type: 'string' },
        sandbox_permissions: { type: 'string' },
        run_in_background: { type: 'boolean' },
        timeoutMs: { type: 'number' },
      },
      required: ['command', 'description'],
      additionalProperties: false,
    },
  },
  grep: { name: 'grep', parameters: { type: 'object', properties: { pattern: { type: 'string' } }, required: ['pattern'] } },
}

function makeCtx() {
  const listeners = { 'tools/pre-execute': [], 'agent/request-error': [], dispose: [] }
  const guards = []
  const ledgerPath = path.join(os.tmpdir(), `agent-guard-it-${process.pid}.jsonl`)
  try { fs.unlinkSync(ledgerPath) } catch { /* fresh */ }
  const ctx = {
    logger: { info() {}, warn() {}, error() {} },
    tools: {
      get: (name) => TOOL_DEFS[name],
      // 真实注册表把 guard 存在 layer 里，这里照搬同样的语义。
      guard: (fn) => { guards.push(fn); return () => { const i = guards.indexOf(fn); if (i >= 0) guards.splice(i, 1) } },
    },
    on: (event, handler) => { (listeners[event] ??= []).push(handler) },
  }
  const config = {
    enabled: true,
    repair: { toolName: true, schema: true, escalation: true, semantics: true },
    recovery: {
      enabled: true,
      maxExtraRetries: 3,
      rateLimitMaxExtraRetries: 1,
      initialDelayMs: 1,
      maxDelayMs: 5,
      jitterRatio: 0,
      maxWaitMs: 120000,
    },
    ledgerPath,
  }
  apply(ctx, config)
  return { ctx, listeners, guards, ledgerPath }
}

/** 模拟 cordis 水流：依次调用监听器，最后一个 next 返回默认值。 */
async function runWaterfall(listeners, payload, fallback) {
  let index = -1
  const next = async () => {
    index++
    if (index >= listeners.length) return fallback()
    return listeners[index](payload, next)
  }
  return next()
}

/**
 * 模拟注册表的 guardReason：按注册顺序调用每个 guard，
 * 第一个返回字符串的即为拒绝原因（我们的守卫返回 undefined = 不拒绝）。
 */
function runGuard(guards, exec) {
  for (const guard of guards) {
    const reason = guard(exec)
    if (reason !== undefined) return reason
  }
  return undefined
}

console.log('\n=== 工具注册表 guard 钩子（真实生效路径）===')

await (async () => {
  const { guards, ledgerPath } = makeCtx()

  await test('update_goal 去掉不属于 action 的字段', () => {
    const exec = {
      name: 'update_goal',
      agent: {},
      callId: 'c1',
      arguments: { action: 'complete', goal_id: 'g1', revision: 2, objective: 'x', max_goal_rounds: 9 },
    }
    assert.equal(runGuard(guards, exec), undefined)
    assert.equal(exec.arguments.objective, undefined)
    assert.equal(exec.arguments.max_goal_rounds, undefined)
    assert.equal(exec.arguments.action, 'complete')
  })

  await test('工具名被拼进 JSON 片段时归一化', () => {
    const exec = { name: 'grep">', agent: {}, callId: 'c2', arguments: { pattern: 'x' } }
    runGuard(guards, exec)
    assert.equal(exec.name, 'grep')
  })

  await test('未声明字段 / 字符串布尔 被收敛', () => {
    const exec = { name: 'pwsh', agent: {}, callId: 'c3', arguments: { command: 'ls', description: 'd', run_in_background: 'true', bogus: 1 } }
    runGuard(guards, exec)
    assert.equal(exec.arguments.run_in_background, true)
    assert.equal(exec.arguments.bogus, undefined)
  })

  await test('落单的 justification 被剔除', () => {
    const exec = { name: 'pwsh', agent: {}, callId: 'c4', arguments: { command: 'ls', description: 'd', justification: '原因' } }
    runGuard(guards, exec)
    assert.equal(exec.arguments.justification, undefined)
  })

  await test('原始 arguments 不被就地修改（DSH 用 deepFreeze 冻结）', () => {
    const original = Object.freeze({ action: 'complete', goal_id: 'g1', revision: 1, objective: 'y' })
    const exec = { name: 'update_goal', agent: {}, callId: 'c5', arguments: original }
    runGuard(guards, exec)
    assert.equal(original.objective, 'y', '原始对象必须保持不变')
    assert.notEqual(exec.arguments, original, '应替换成新对象')
  })

  await test('修复后的 arguments 仍然是冻结的', () => {
    const exec = { name: 'update_goal', agent: {}, callId: 'c6', arguments: { action: 'complete', goal_id: 'g1', revision: 1, objective: 'y' } }
    runGuard(guards, exec)
    assert.equal(Object.isFrozen(exec.arguments), true)
  })

  await test('同一 exec 不会被重复修复（幂等）', () => {
    const exec = { name: 'update_goal', agent: {}, callId: 'c7', arguments: { action: 'complete', goal_id: 'g1', revision: 1, objective: 'y' } }
    runGuard(guards, exec)
    const first = exec.arguments
    runGuard(guards, exec)
    assert.equal(exec.arguments, first, '第二次不应再替换对象')
  })

  await test('每次修复都写进记账', () => {
    const lines = fs.readFileSync(ledgerPath, 'utf8').trim().split('\n').map((l) => JSON.parse(l))
    assert.ok(lines.length >= 4, `记账条数 ${lines.length} < 4`)
    assert.ok(lines.every((l) => l.kind === 'repaired'))
    assert.ok(lines.some((l) => l.rule === 'goal-edit-only-field'))
    assert.ok(lines.some((l) => l.rule === 'tool-name-trim'))
  })

  try { fs.unlinkSync(ledgerPath) } catch { /* ignore */ }
})()

console.log('\n=== agent/request-error 钩子 ===')

await (async () => {
  const { listeners, ledgerPath } = makeCtx()

  await test('SERVER 失败被额外恢复一次', async () => {
    const action = await runWaterfall(
      listeners['agent/request-error'],
      { provider: 'magpie', turn: 1, step: 1, failure: { code: 'SERVER', message: '503' } },
      async () => undefined,
    )
    assert.deepEqual(action, { kind: 'retry' })
  })

  await test('同一轮第二次恢复仍然允许', async () => {
    const action = await runWaterfall(
      listeners['agent/request-error'],
      { provider: 'magpie', turn: 1, step: 1, failure: { code: 'SERVER', message: '503' } },
      async () => undefined,
    )
    assert.deepEqual(action, { kind: 'retry' })
  })

  await test('超过上限后交还给内建策略（返回 undefined）', async () => {
    let last
    for (let i = 0; i < 5; i++) {
      last = await runWaterfall(
        listeners['agent/request-error'],
        { provider: 'magpie', turn: 1, step: 1, failure: { code: 'SERVER', message: '503' } },
        async () => undefined,
      )
    }
    assert.equal(last, undefined)
  })

  await test('AUTH 失败不恢复', async () => {
    const action = await runWaterfall(
      listeners['agent/request-error'],
      { provider: 'magpie', turn: 2, step: 1, failure: { code: 'AUTH', message: '401' } },
      async () => undefined,
    )
    assert.equal(action, undefined)
  })

  await test('恢复事件写进记账', () => {
    const lines = fs.readFileSync(ledgerPath, 'utf8').trim().split('\n').map((l) => JSON.parse(l))
    const recovered = lines.filter((l) => l.kind === 'recovered')
    assert.ok(recovered.length >= 2, `恢复记账 ${recovered.length} < 2`)
    assert.equal(recovered[0].rule, 'provider-retry')
  })

  try { fs.unlinkSync(ledgerPath) } catch { /* ignore */ }
})()

console.log(`\n${failed === 0 ? 'PASS' : 'FAIL'}  passed=${passed} failed=${failed}\n`)
process.exit(failed === 0 ? 0 : 1)
