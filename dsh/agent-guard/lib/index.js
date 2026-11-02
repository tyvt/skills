/**
 * dsh-agent-guard
 *
 * 把「模型写错工具调用形状」和「供应商抽风」两类失败拦在执行之前。
 *
 * 背景（2026-10-29 审计，~/.dsh/reports/agent-failures-latest.json）：
 *
 *   工具层 57 次失败 / 2624 次调用（2.2%），其中约 **2/3 是模型写错了调用形状**：
 *     - GOAL_TOOL_INVALID_UPDATE 11  update_goal 带了不属于该 action 的字段
 *     - ESCALATION_ARGS           3  justification / sandbox_permissions 落单
 *     - UNKNOWN_TOOL              1  工具名被拼进了 JSON 片段（`grep">`）
 *     - INVALID_ARGS              2  参数类型/字段不符合声明
 *     其余是路径写错、文件没读就改等语义错误，机械修复会改变行为，不碰。
 *
 *   供应商层 71 次失败：SERVER_5XX 50 / RATE_LIMIT 15 / TRANSPORT 6。
 *   内建 llm-retry 的预算是「每会话每 provider 5 次」，用完之后 provider 的
 *   503/429 会直接终结整轮 —— 实测单日 38 轮就是这么没的。
 *
 * 本插件做两件事：
 *
 *   1. `tools/pre-execute` 水流：在工具自己的参数校验**之前**修参数。
 *      DSH 在这一层冻结了 exec.arguments（deepFreeze），但 exec 本身没冻结，
 *      所以用 `exec.arguments = repaired` 整体替换，而不是就地改。
 *
 *   2. `agent/request-error` 水流：内建重试预算用完之后，再给一小段带退避的
 *      恢复机会。对额度型 429 保持克制（provider 要求等待超过上限就不重试，
 *      避免把会话挂几个小时）。
 *
 * 零依赖：与 dsh-mcp-gateway 一样不 import `@deepseek-ai/*`（profile 外解析不到）。
 *
 * @module dsh-agent-guard
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { Config } from './config.js'
import { planRecovery, repairArguments, repairToolName } from './rules.js'

export { Config }

/** cordis 用 name 做日志分类与 patch 行 id。 */
export const name = 'agent-guard'

/** 需要工具注册表就位（tools/pre-execute 与工具名归一化都要查注册表）。 */
export const inject = ['tools']

/** DSH_HOME：优先环境变量，其次 ~/.dsh。 */
function dshHome() {
  const fromEnv = process.env.DSH_HOME
  if (typeof fromEnv === 'string' && fromEnv.trim() !== '') return fromEnv.trim()
  return path.join(os.homedir(), '.dsh')
}

/**
 * 追加一条记账。
 * @param {string} ledgerPath - 记账文件绝对路径。
 * @param {object} entry - 记账内容。
 */
function appendLedger(ledgerPath, entry) {
  try {
    fs.mkdirSync(path.dirname(ledgerPath), { recursive: true })
    fs.appendFileSync(ledgerPath, JSON.stringify(entry) + '\n', 'utf8')
  } catch {
    /* 记账失败不能影响主流程 */
  }
}

/**
 * 可中断的等待。
 * @param {number} ms - 等待毫秒数。
 * @param {AbortSignal} [signal] - 中断信号。
 * @returns {Promise<boolean>} true = 等满了，false = 被中断。
 */
function delay(ms, signal) {
  if (ms <= 0) return Promise.resolve(true)
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener?.('abort', onAbort)
      resolve(true)
    }, ms)
    const onAbort = () => {
      clearTimeout(timer)
      resolve(false)
    }
    if (signal?.aborted) {
      clearTimeout(timer)
      resolve(false)
      return
    }
    signal?.addEventListener?.('abort', onAbort, { once: true })
  })
}

/**
 * 深拷贝。参数按契约是可 JSON 序列化的，所以 structuredClone 是安全的。
 * @param {unknown} value - 待拷贝的值。
 * @returns {unknown} 拷贝后的值。
 */
function deepCopy(value) {
  try {
    return structuredClone(value)
  } catch {
    return JSON.parse(JSON.stringify(value))
  }
}

/**
 * 递归冻结，保持 DSH 「参数在执行期间不可变」的不变式。
 * @param {object} value - 待冻结的对象。
 * @returns {object} 冻结后的对象。
 */
function deepFreeze(value) {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) return value
  Object.freeze(value)
  for (const key of Object.keys(value)) deepFreeze(value[key])
  return value
}

/**
 * 挂载守卫。
 * @param {object} ctx - cordis 上下文。
 * @param {object} config - 已由 {@link Config} 收敛过的配置。
 */
export function apply(ctx, config) {
  const ledgerPath = path.isAbsolute(config.ledgerPath)
    ? config.ledgerPath
    : path.join(dshHome(), config.ledgerPath)

  const log = ctx.logger
  const counters = { repaired: 0, recovered: 0 }

  log?.info?.(
    'agent-guard: active (repair=%s/%s/%s/%s recovery=%s maxExtraRetries=%d ledger=%s)',
    config.repair.toolName ? 'on' : 'off',
    config.repair.schema ? 'on' : 'off',
    config.repair.escalation ? 'on' : 'off',
    config.repair.semantics ? 'on' : 'off',
    config.recovery.enabled ? 'on' : 'off',
    config.recovery.maxExtraRetries,
    ledgerPath,
  )

  // ── 1. 工具参数修复 ──────────────────────────────────────────────────────
  //
  // 关键点：**不能**只挂 `tools/pre-execute` 事件。
  // cordis 的 `ctx.waterfall` 只从「发起 dispatch 的那个 ctx」自己的 hook 表里
  // 取监听器（见 cordis/lib/index.js 的 `dispatch()`：`this._hooks[name]`）。
  // 工具注册表在 **agent plane** 上，而本插件在 host plane，两边不是同一条 ctx
  // 链，所以 host 侧 `ctx.on('tools/pre-execute')` 根本收不到事件（实测验证：
  // todo_write 正常执行，但守卫一次都没触发）。
  //
  // `ctx.tools.guard()` 是注册表自己的钩子，存在注册表的 layer 里，
  // `guardReason(exec)` 在**每次执行前**都会跑，且全局 layer 对所有作用域生效，
  // 不受 plane 限制 —— 这是唯一可靠的拦截点。
  //
  // `tools/pre-execute` 仍然保留：当插件恰好挂在同一条 ctx 链上时它更早触发，
  // 两条路径共用同一个幂等修复函数（WeakSet 去重），不会重复记账。
  const repairedExecs = new WeakSet()

  const guardDisposer = ctx.tools.guard((exec) => {
    try {
      if (config.enabled) repairExecution(exec)
    } catch (error) {
      log?.warn?.('agent-guard: repair failed for %s: %o', exec?.name, error)
    }
    // 不返回字符串 = 不拒绝。修复是通过替换 exec.arguments 完成的。
    return undefined
  })

  ctx.on('tools/pre-execute', async (exec, next) => {
    try {
      if (config.enabled) repairExecution(exec)
    } catch (error) {
      log?.warn?.('agent-guard: repair failed for %s: %o', exec?.name, error)
    }
    const decision = await next()
    return decision ?? { kind: 'allow' }
  })

  /**
   * 找到这次执行所属的**工具注册表**。
   *
   * 工具（todo_write / update_goal / pwsh …）注册在 **agent plane**（preset 的
   * layer）上，host plane 的 `ctx.tools` 只是兜底副本，`view(agentScope)` 里
   * 根本没有这些工具。必须顺着 `exec.agent.ctx` 拿到 agent 自己的注册表，
   * 否则拿不到 schema，修复就无从谈起（实测：host plane 取到 undefined，
   * 守卫只 inspect 不 repair）。
   */
  function resolveRegistry(exec) {
    const candidates = [exec?.agent?.ctx?.tools, ctx.tools]
    for (const registry of candidates) {
      if (registry === undefined || registry === null) continue
      if (typeof registry.get !== 'function') continue
      return registry
    }
    return ctx.tools
  }

  function repairExecution(exec) {
    if (exec === null || typeof exec !== 'object') return
    if (repairedExecs.has(exec)) return
    repairedExecs.add(exec)

    let toolName = exec?.name
    if (typeof toolName !== 'string' || toolName === '') return

    const registry = resolveRegistry(exec)
    const registryKind = registry === ctx.tools ? 'host' : 'agent'
    const lookup = (candidate) => {
      try { return registry.get(candidate, exec.agent) !== undefined } catch { return false }
    }

    if (config.traceCalls === true) {
      appendLedger(ledgerPath, {
        ts: new Date().toISOString(),
        kind: 'inspected',
        rule: 'pre-execute',
        detail: toolName,
        tool: toolName,
        callId: exec?.callId,
        registry: registryKind,
        known: lookup(toolName),
      })
    }

    if (config.repair.toolName) {
      const { name: repairedName, repair } = repairToolName(toolName, lookup)
      if (repair) {
        exec.name = repairedName
        toolName = repairedName
        counters.repaired++
        record(repair, exec, toolName)
      }
    }

    let definition
    try { definition = registry.get(toolName, exec.agent) } catch { definition = undefined }
    const schema = definition?.parameters
    const original = exec.arguments
    if (original === null || typeof original !== 'object' || Array.isArray(original)) return
    if (schema === undefined) {
      if (config.traceCalls === true) {
        appendLedger(ledgerPath, {
          ts: new Date().toISOString(),
          kind: 'inspected',
          rule: 'no-schema',
          detail: toolName,
          tool: toolName,
          callId: exec?.callId,
          registry: registryKind,
        })
      }
      return
    }

    // DSH 用 deepFreeze 冻结了整棵 arguments 树。浅拷贝只复制了顶层，
    // 嵌套的数组/对象仍然是冻结的 —— 在严格模式下 `delete` 冻结对象会抛 TypeError，
    // 修复会被静默吞掉。所以必须整棵深拷贝后再改。
    const working = deepCopy(original)
    const { repairs } = repairArguments({
      toolName,
      args: working,
      schema,
      rules: {
        semantics: config.repair.semantics,
        escalation: config.repair.escalation,
        schema: config.repair.schema,
      },
    })
    if (repairs.length === 0) return

    // DSH 用 deepFreeze 冻结了原始 arguments；整体替换成新的（同样冻结的）对象，
    // 既能改形状，又保持「参数在执行期间不可变」的不变式。
    exec.arguments = deepFreeze(working)
    for (const repair of repairs) {
      counters.repaired++
      record(repair, exec, toolName)
    }
  }

  function record(repair, exec, toolName) {
    appendLedger(ledgerPath, {
      ts: new Date().toISOString(),
      kind: 'repaired',
      rule: repair.rule,
      detail: repair.detail,
      tool: toolName,
      callId: exec?.callId,
    })
  }

  // ── 2. 供应商失败后的额外恢复 ────────────────────────────────────────────
  // 内建 llm-retry 先跑；它放弃（预算用尽 / 失败码不匹配）时才会走到这里。
  const attempts = new Map()
  ctx.on('agent/request-error', async (payload, next) => {
    if (!config.enabled || !config.recovery.enabled) return next()
    const provider = payload?.provider ?? 'unknown'
    const turn = payload?.turn ?? 0
    const step = payload?.step ?? 0
    const key = `${provider}|${turn}|${step}`
    const used = attempts.get(key) ?? 0
    const plan = planRecovery({
      failure: payload?.failure,
      attempts: used,
      config: config.recovery,
    })
    if (plan === null) return next()

    attempts.set(key, used + 1)
    const signal = payload?.signal
    const finished = await delay(plan.delayMs, signal)
    if (!finished) return next()

    counters.recovered++
    appendLedger(ledgerPath, {
      ts: new Date().toISOString(),
      kind: 'recovered',
      rule: 'provider-retry',
      detail: `${provider} ${String(payload?.failure?.code ?? 'UNKNOWN')} attempt=${used + 1} delayMs=${plan.delayMs}`,
      turn,
      step,
    })
    log?.info?.('agent-guard: extra retry for %s after %s (%dms)', provider, payload?.failure?.code, plan.delayMs)
    return { kind: 'retry' }
  })

  ctx.on('dispose', () => {
    try { guardDisposer() } catch { /* 注销失败不影响退出 */ }
    log?.info?.('agent-guard: disposed (repaired=%d recovered=%d)', counters.repaired, counters.recovered)
  })
}
