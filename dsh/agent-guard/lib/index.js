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
import { isWholeFileRead, planRecovery, repairArguments, repairToolName, shouldRejectDuplicateRead, decideExplorationDrift } from './rules.js'
import { policy } from '../../shared/p0-policy.mjs'
import { decideInterception } from './scope.js'
import { evaluateAsk } from './ask-guard.js'

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
  const counters = { repaired: 0, recovered: 0, rejected: 0 }

  log?.info?.(
    'agent-guard: active (repair=%s/%s/%s/%s recovery=%s maxExtraRetries=%d scope=%s roots=%d ledger=%s)',
    config.repair.toolName ? 'on' : 'off',
    config.repair.schema ? 'on' : 'off',
    config.repair.escalation ? 'on' : 'off',
    config.repair.semantics ? 'on' : 'off',
    config.recovery.enabled ? 'on' : 'off',
    config.recovery.maxExtraRetries,
    config.scope?.enabled ? 'on' : 'off',
    Array.isArray(config.scope?.roots) ? config.scope.roots.length : 0,
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

  // ── 1.5 重复整读检测（审计 P1-7 / C3）──────────────────────────────────────
  // 按 session 记录每个文件的读取记录：{ whole: 是否整读过, ranges: 读过的区间 }。
  // 同一文件本会话再次整读（无 offset/limit）直接拒绝，并在提示里带上「上次读到哪」的
  // 续读 offset（审计 C3：只拒绝不说上次范围，模型还得自己再定位）。
  const sessionReads = new Map()
  // ask-guard（P0-1）按 session 记录 ask 历史：{ asks: [{ phase, text }] }。
  const sessionAsks = new Map()
  // 探索漂移（explore-drift-guard-20261113 M1）按 session 记录形态信号。
  // LRU 上限防无界增长（审核 P1-3）：超出按最旧插入序淘汰整个会话状态。
  const sessionDrift = new Map()
  const DRIFT_MAX_SESSIONS = 200
  function getSessionDrift(exec) {
    const sessionId = exec?.agent?.session?.header?.id ?? 'anon'
    let state = sessionDrift.get(sessionId)
    if (state === undefined) {
      if (sessionDrift.size >= DRIFT_MAX_SESSIONS) {
        const oldest = sessionDrift.keys().next().value
        if (oldest !== undefined) sessionDrift.delete(oldest)
      }
      state = { fileLines: new Map(), grepSeq: 0, lastPattern: '', lastGlob: null }
      sessionDrift.set(sessionId, state)
    }
    return state
  }
  /** 子代理判定：header 带 parentSession（dsh-session/index.js:1051/1836）即派生会话。 */
  function isSubagentSession(exec) {
    const parent = exec?.agent?.session?.header?.parentSession
    return typeof parent === 'string' && parent.trim() !== ''
  }
  function getSessionReads(exec) {
    const sessionId = exec?.agent?.session?.header?.id ?? 'anon'
    let state = sessionReads.get(sessionId)
    if (state === undefined) {
      state = new Map()
      sessionReads.set(sessionId, state)
    }
    return state
  }
  function recordRead(exec) {
    const args = exec?.arguments
    const filePath = args?.file_path
    if (typeof filePath !== 'string' || filePath.trim() === '') return
    const state = getSessionReads(exec)
    let rec = state.get(filePath)
    if (rec === undefined) {
      rec = { whole: false, ranges: [] }
      state.set(filePath, rec)
    }
    const whole = isWholeFileRead(args) !== null
    if (whole) {
      rec.whole = true
      return
    }
    const offset = args?.offset != null && args.offset !== '' && Number.isFinite(Number(args.offset)) ? Number(args.offset) : policy.pagination.offsetBase
    const limit = Number.isFinite(Number(args?.limit)) ? Number(args.limit) : undefined
    rec.ranges.push({ offset, limit })
  }

  const guardDisposer = ctx.tools.guard((exec) => {
    try {
      // 检索范围拦截（bug6369：仓库根全量 grep 打穿 prefix cache，单步未命中 18k）。
      // 返回字符串 = 拒绝并把改法回给模型；必须赶在 repairExecution 之前。
      if (config.enabled && config.scope?.enabled) {
        const rejected = decideInterception({
          tool: exec?.name,
          args: exec?.arguments,
          roots: config.scope.roots,
        })
        if (rejected !== null) {
          counters.rejected++
          log?.warn?.('agent-guard: rejected %s: %s', exec?.name, rejected)
          return rejected
        }
      }
      // 重复整读拦截（P1-7 / C3）：与 scope 拦截同层，同样赶在 repairExecution 之前。
      if (config.enabled && exec?.name === 'read') {
        const state = getSessionReads(exec)
        const duplicate = shouldRejectDuplicateRead(state, exec?.arguments)
        if (duplicate !== null) {
          counters.rejected++
          log?.warn?.('agent-guard: rejected %s: %s', exec?.name, duplicate)
          return duplicate
        }
        recordRead(exec)
      }
      // 探索漂移拦截（explore-drift-guard-20261113 M1）：整读门槛/重复盲搜/未知根试错。
      // warn 模式只记 ledger 不阻断；block 模式拒绝并回改法。规则纯函数在 rules.js。
      if (config.enabled && config.exploration?.enabled) {
        const drift = getSessionDrift(exec)
        const tool = exec?.name
        const d = decideExplorationDrift(drift, tool, exec?.arguments, {
          isSubagent: isSubagentSession(exec),
          maxWholeReadLines: config.exploration.maxWholeReadLines,
          firstReadLimit: config.exploration.firstReadLimit,
          minRepeatPattern: config.exploration.minRepeatPattern,
          globRepeatWindowMs: config.exploration.globRepeatWindowMs,
        })
        // 状态回填（在 verdict 判定后、放行前）：
        if (tool === 'grep' || tool === 'glob') {
          const pattern = typeof exec?.arguments?.pattern === 'string' ? exec.arguments.pattern : ''
          if (pattern !== '') {
            if (pattern === drift.lastPattern) drift.grepSeq += 1
            else { drift.lastPattern = pattern; drift.grepSeq = 1 }
          }
          if (tool === 'glob' && (exec?.arguments?.path == null || exec?.arguments?.path === '')) {
            drift.lastGlob = { pattern, ts: Date.now() }
          }
        }
        if (d.injectLimit != null && exec?.arguments && typeof exec.arguments === 'object') {
          // 首读探针：注入 limit；同文件记入 wholeReads，第 2 次无范围整读会被拒。
          exec.arguments.limit = d.injectLimit
          if (!(drift.wholeReads instanceof Set)) drift.wholeReads = new Set()
          const fp = typeof exec.arguments.file_path === 'string' ? exec.arguments.file_path : ''
          if (fp !== '') drift.wholeReads.add(fp)
        }
        if (d.verdict === 'block' || d.injectLimit != null) {
          appendLedger(ledgerPath, {
            ts: new Date().toISOString(),
            kind: 'explore-drift',
            rule: d.verdict === 'block' ? 'drift-block' : 'first-read-inject',
            tool: exec?.name,
            session_id: exec?.agent?.session?.header?.id ?? 'anon',
            subagent: isSubagentSession(exec),
            mode: config.exploration.mode ?? 'warn',
            message: d.message ?? '',
          })
          if (d.verdict === 'block') {
            counters.rejected++
            log?.warn?.('agent-guard: explore-drift %s: %s', exec?.name, d.message)
            if ((config.exploration.mode ?? 'warn') === 'block') return d.message
            // warn：不阻断，但注入的 limit 已生效（首读探针）。
          }
        }
      }
      // 二次 ask 拦截（P0-1，.plan/p0-hooks-skills-20261113.md）：warn 只记 ledger 告警，
      // block 才拒绝。判定链在 ask-guard.js（纯函数，可单测）。
      if (config.enabled && config.askGuard?.enabled && exec?.name === 'ask_user_question') {
        const sessionId = exec?.agent?.session?.header?.id ?? 'anon'
        let askState = sessionAsks.get(sessionId)
        if (askState === undefined) {
          askState = { asks: [] }
          sessionAsks.set(sessionId, askState)
        }
        const d = evaluateAsk(askState, exec?.arguments, config.askGuard)
        appendLedger(ledgerPath, {
          ts: new Date().toISOString(),
          kind: 'ask-guard',
          rule: d.verdict,
          hit_word: d.hitWord,
          ask_seq_in_phase: d.askSeq,
          high_risk: d.highRisk,
          session_id: sessionId,
          mode: config.askGuard.mode ?? 'off',
          verdict: d.verdict,
          missing: d.missing,
        })
        if (d.verdict === 'block') {
          counters.rejected++
          log?.warn?.('agent-guard: %s', d.message)
          return d.message
        }
        if (d.verdict === 'warn') log?.warn?.('agent-guard: %s', d.message)
      }
      if (config.enabled) repairExecution(exec)
    } catch (error) {
      log?.warn?.('agent-guard: repair failed for %s: %o', exec?.name, error)
    }
    // 返回 undefined = 放行。修复是通过替换 exec.arguments 完成的。
    return undefined
  })

  ctx.on('tools/pre-execute', async (exec, next) => {
    try {
      if (config.enabled) repairExecution(exec)
    } catch (error) {
      log?.warn?.('agent-guard: repair failed for %s: %o', exec?.name, error)
    }
    const decision = await next()
    // ask-guard：用户跳过（空选择/自定义空答）= user_bypass，写回 ledger 供误伤率统计。
    if (config.enabled && config.askGuard?.enabled && exec?.name === 'ask_user_question') {
      try {
        const raw = JSON.stringify(decision ?? null) ?? ''
        const skipped = /"selected"\s*:\s*\[\]|"selected"\s*:\s*null|"custom"\s*:\s*""/.test(raw)
        if (skipped) {
          appendLedger(ledgerPath, {
            ts: new Date().toISOString(),
            kind: 'ask-guard-bypass',
            tool: exec?.name,
            session_id: exec?.agent?.session?.header?.id ?? 'anon',
            user_bypass: true,
            bypass_reason: 'empty-selection',
          })
        }
      } catch { /* bypass 探测失败不影响放行 */ }
    }
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
    log?.info?.('agent-guard: disposed (repaired=%d recovered=%d rejected=%d)', counters.repaired, counters.recovered, counters.rejected)
  })
}
