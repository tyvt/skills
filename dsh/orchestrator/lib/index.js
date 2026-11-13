/**
 * dsh-orchestrator
 *
 * 把 LangGraph 多模型工具编排器接入 DSH Web，暴露一个入口工具 `orchestrate`。
 * 模型侧只需给一个自然语言 request，插件转发给 Python 的 src/jsonbridge.py：
 *   - mode=full : 规划 → 分派工具 → 各工具用各自 magpie 模型池执行(主挂自动切备) → 汇总
 *   - mode=tool : 只调某个工具(如 planner/code_editor/file_reader/image_analyst)
 *   - mode=list : 列出工具与模型池
 *
 * 设计参考 dsh-mcp-gateway：零 @deepseek-ai/* 依赖，直接向 ctx.tools.register()
 * 交原始 ToolDefinition；子进程方式调用 Python，避免依赖 profile 的模块解析。
 *
 * @module dsh-orchestrator
 */

import { spawn } from 'node:child_process'
import { Config } from './config.js'
import { preflight } from '../../scripts/preflight-p0.mjs'

export { Config }

/** cordis 用 name 做日志分类与 patch 行 id。 */
export const name = 'orchestrator'

/** 需要工具注册表就位。 */
export const inject = ['tools']

const TOOL_NAME = 'orchestrate'
const ALLOWED_OPS = ['full', 'tool', 'list', 'plan_review']
const TOOL_NAMES = ['planner', 'code_editor', 'file_reader', 'image_analyst', 'pwsh']

/**
 * 用子进程跑 Python JSON 桥，stdin 吃 JSON，stdout 吐 JSON。
 * @param {object} config 已收敛的插件配置
 * @param {object} payload 发给 python 的请求对象
 * @param {AbortSignal} [signal]
 * @returns {Promise<object>} python 返回的 JSON 对象
 */
function hostSessionId(exec) {
  const found = [
    exec?.agent?.id,
    exec?.sessionId,
    exec?.session?.id,
    exec?.session?.sessionId,
  ].find((value) => typeof value === 'string' && value.trim())
  return found ? found.trim() : ''
}

const sessionQueues = new Map()

function enqueueSession(sessionId, task) {
  if (!sessionId) return task()
  const previous = sessionQueues.get(sessionId) || Promise.resolve()
  const current = previous.catch(() => undefined).then(task)
  sessionQueues.set(sessionId, current)
  const release = () => {
    if (sessionQueues.get(sessionId) === current) sessionQueues.delete(sessionId)
  }
  current.then(release, release)
  return current
}

/** 进度日志：优先用注入的 logger，否则回落到 console.error。带节流。 */
function progressLogger(config) {
  const provided = typeof config.logger === 'function' ? config.logger : null
  const sink = provided || ((line) => console.error(line))
  const throttleMs = config.progressThrottleMs > 0 ? config.progressThrottleMs : 500
  let lastAt = 0
  let suppressed = 0
  return {
    write(line) {
      const now = Date.now()
      if (now - lastAt < throttleMs) { suppressed += 1; return }
      lastAt = now
      const suffix = suppressed > 0 ? ` (+${suppressed} 行已省略)` : ''
      suppressed = 0
      try { sink(`[orchestrate] ${line}${suffix}`) } catch { /* 日志失败不影响主流程 */ }
    },
    /** 收尾时把节流期间被吞掉的行数补报一次，并强制冲刷。 */
    flush() {
      if (suppressed > 0) {
        const n = suppressed
        suppressed = 0
        try { sink(`[orchestrate] (+${n} 行已省略)`) } catch { /* ignore */ }
      }
    },
  }
}

function callPython(config, payload, signal) {
  return new Promise((resolve, reject) => {
    const args = ['-X', 'utf8', '-m', 'src.jsonbridge']
    const child = spawn(config.pythonExe, args, {
      cwd: config.projectDir,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    })

    const log = progressLogger(config)
    const op = (payload && payload.op) || 'full'
    const stallMs = config.stallMs > 0 ? config.stallMs : 0
    const startedAt = Date.now()
    const stderrTail = (n = 2000) => stderr.slice(-n)

    let stdout = ''
    let stderr = ''
    let settled = false
    let lastProgressAt = Date.now()
    let stallTimer = null
    let warnTimer = null
    const warnCapMs = config.warnCapMs > 0 ? config.warnCapMs : 0

    const stopStallTimer = () => {
      if (stallTimer) { clearTimeout(stallTimer); stallTimer = null }
    }
    const stopWarnTimer = () => {
      if (warnTimer) { clearTimeout(warnTimer); warnTimer = null }
    }
    const finish = (fn, value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      stopStallTimer()
      stopWarnTimer()
      signal?.removeEventListener?.('abort', onAbort)
      log.flush()
      fn(value)
    }

    const timer = setTimeout(() => {
      const elapsed = Math.round((Date.now() - startedAt) / 1000)
      const tail = stderrTail()
      child.kill()
      finish(reject, new Error(
        `[orchestrate/timeout] elapsed=${elapsed}s op=${op} | ` +
        `orchestrator: python 调用超时 (${config.timeoutMs}ms, 已运行 ${elapsed}s)` +
        (tail ? `\n最后 stderr 尾部:\n${tail}` : '\n(超时前无 stderr 输出)'),
      ))
    }, config.timeoutMs)

    // 软上限告警：到点只在日志输出 [orchestrate/warn]，不 kill、不改返回（纯旁路）。
    if (warnCapMs > 0 && warnCapMs < config.timeoutMs) {
      warnTimer = setTimeout(() => {
        if (settled) return
        const elapsed = Math.round((Date.now() - startedAt) / 1000)
        try { log.write(`[orchestrate/warn] elapsed=${elapsed}s op=${op} 已达告警线(${warnCapMs}ms)，建议拆小任务`) } catch { /* ignore */ }
      }, warnCapMs)
    }

    // 分段/停滞检测：超过 stallMs 没有任何新的 stdout/stderr 输出则判定卡住。
    const armStallTimer = () => {
      if (stallMs <= 0 || settled) return
      stopStallTimer()
      stallTimer = setTimeout(() => {
        if (settled) return
        const since = Math.round((Date.now() - lastProgressAt) / 1000)
        const tail = stderrTail()
        child.kill()
        finish(reject, new Error(
          `[orchestrate/stall] since=${since}s op=${op} | ` +
          `orchestrator: python 卡住 (${since}s 无输出, stallMs=${stallMs})，最后 stderr 尾部:\n` +
          (tail || '(无 stderr 输出)'),
        ))
      }, stallMs)
    }
    armStallTimer()

    const onAbort = () => {
      const tail = stderrTail()
      child.kill()
      finish(reject, new Error(
        'orchestrator: 调用被取消' + (tail ? `\n最后 stderr 尾部:\n${tail}` : ''),
      ))
    }
    signal?.addEventListener?.('abort', onAbort, { once: true })

    child.stdout.on('data', (d) => {
      stdout += d.toString('utf8')
      lastProgressAt = Date.now()
      armStallTimer()
    })
    child.stderr.on('data', (d) => {
      const chunk = d.toString('utf8')
      stderr = (stderr + chunk).slice(-8000)
      lastProgressAt = Date.now()
      armStallTimer()
      // 逐行实时透传为进度日志（保留末尾汇总用于报错）。
      const lines = chunk.split(/\r?\n/)
      for (const line of lines) {
        const trimmed = line.trimEnd()
        if (trimmed) log.write(trimmed)
      }
    })
    child.on('error', (err) => finish(reject, new Error(`orchestrator: 无法启动 python: ${err.message}`)))
    child.on('close', (code) => {
      const text = stdout.trim()
      if (text === '') {
        finish(reject, new Error(`orchestrator: python 无输出 (exit=${code})\n${stderrTail(800)}`))
        return
      }
      let parsed
      try {
        parsed = JSON.parse(text)
      } catch (e) {
        finish(reject, new Error(`orchestrator: 解析 python 输出失败: ${e.message}\n${text.slice(-800)}`))
        return
      }
      if (parsed && parsed.ok === false && !['execution', 'log_read'].includes(parsed.mode)) {
        finish(reject, new Error(bounded(parsed.error || 'orchestrator: 编排失败', 3200)))
        return
      }
      finish(resolve, parsed)
    })

    child.stdin.write(JSON.stringify(payload), 'utf8')
    child.stdin.end()
  })
}

function renderUsage(usage) {
  if (!usage || typeof usage !== 'object') return ''
  const prompt = usage.prompt_tokens
  const completion = usage.completion_tokens
  if (prompt == null && completion == null) return ''
  return `[Tokens] Prompt: ${prompt ?? '-'}, Completion: ${completion ?? '-'}`
}

/** 把 plan_review 结果渲染成 markdown 友好文本，供主控/用户直接阅读。 */
function renderPlanReview(result) {
  const verdict = result.verdict === 'pass' ? '✅ PASS（审核通过）' : '❌ REJECT（打回修改）'
  const lines = [
    `## 计划审核结果：${verdict}`,
    `- 评分：${result.score ?? '-'}/100`,
    `- 审核模型：${result.model_used ?? 'FALLBACK-FAIL'}` +
      (result.clipped ? '（计划过长已截断审核）' : ''),
  ]
  const issuesRaw = Array.isArray(result.issues) ? result.issues : []
  // 兼容 {level,text} 与旧字符串两种格式；P0 置顶。
  const issues = issuesRaw
    .map((it) => (typeof it === 'object' && it !== null
      ? { level: String(it.level || 'P1').toUpperCase(), text: String(it.text || '') }
      : { level: 'P1', text: String(it || '') }))
    .filter((it) => it.text)
    .sort((a, b) => ({ P0: 0, P1: 1, P2: 2 }[a.level] ?? 1) - ({ P0: 0, P1: 1, P2: 2 }[b.level] ?? 1))
  const suggestions = Array.isArray(result.suggestions) ? result.suggestions.filter(Boolean) : []
  const p0Count = typeof result.p0_count === 'number'
    ? result.p0_count
    : issues.filter((it) => it.level === 'P0').length
  lines.push('', `- P0 阻断项：${p0Count} 个`)
  lines.push('', '### 问题（issues）')
  if (issues.length) issues.forEach((it, i) => lines.push(`${i + 1}. [${it.level}] ${it.text}`))
  else lines.push('（无）')
  lines.push('', '### 修改建议（suggestions）')
  if (suggestions.length) suggestions.forEach((s, i) => lines.push(`${i + 1}. ${s}`))
  else lines.push('（无）')
  if (result.verdict === 'pass') {
    lines.push('', '> 审核通过：人工确认后设置 status: approved / human_confirmed: true，并绑定本响应的 approved_sha256 与 approved_version。')
  } else {
    lines.push('', '> 审核未通过：仅需修 P0 项即可通过，P1/P2 可在实施中处理。修完重新送审。')
  }
  const usageLine = renderUsage(result.usage)
  if (usageLine) lines.push('', usageLine)
  return lines.join('\n')
}

/** 把编排结果渲染成给模型读的紧凑文本。 */
function bounded(text, cap) {
  const value = String(text ?? '');
  const mark = '\n[output truncated; use registered log_ref for narrow read]';
  return value.length <= cap ? value : value.slice(0, cap - mark.length) + mark;
}

function renderResult(result, verbose) {
  if (result.mode === 'execution' || result.mode === 'log_read') {
    const cap = result.mode === 'log_read' ? 3200 : result.ok ? 800 : 3200;
    const value = { ...result };
    let text = JSON.stringify(value);
    while (text.length > cap && value.content?.length) {
      value.content = value.content.slice(0, Math.max(0, value.content.length - (text.length - cap) - 32));
      value.truncated = true;
      text = JSON.stringify(value);
    }
    return text.length <= cap ? text : JSON.stringify({ mode: result.mode, ok: result.ok,
      exitCode: result.exitCode, logRef: result.logRef, error: 'metadata exceeds output budget' });
  }
  if (result.mode === 'plan_review') {
    const header = JSON.stringify({ plan_key: result.plan_key, approved_sha256: result.plan_sha256,
      approved_version: result.version, verdict: result.verdict });
    return bounded(header + '\n' + renderPlanReview({ ...result,
      issues: result.issues?.slice(0, 3), suggestions: result.suggestions?.slice(0, 3) }), 4000);
  }
  const usageLine = renderUsage(result.usage)
  if (result.mode === 'list') {
    const lines = [`编排器网关: ${result.gateway}`]
    for (const [tool, info] of Object.entries(result.tools)) {
      lines.push(`- ${tool}: ${info.description}`)
      lines.push(`    模型池: ${info.models.join(' -> ')}`)
    }
    return lines.join('\n')
  }
  if (result.mode === 'tool') {
    const lines = [
      `工具 ${result.tool} 执行完成 (model=${result.model_used ?? 'FALLBACK-FAIL'})`,
    ]
    if (verbose && Array.isArray(result.attempts)) {
      for (const a of result.attempts) {
        lines.push(`  - ${a.model} ok=${a.ok} ${a.elapsed}s ${a.error ? '| ' + a.error : ''}`)
      }
    }
    lines.push('', result.content)
    if (usageLine) lines.push('', usageLine)
    return lines.join('\n')
  }
  // full
  const lines = []
  if (verbose) {
    if (Array.isArray(result.trace) && result.trace.length) {
      lines.push('轨迹: ' + result.trace.join(' | '))
    }
    if (Array.isArray(result.plan)) {
      lines.push('计划:')
      result.plan.forEach((s, i) => lines.push(`  ${i + 1}. [${s.tool}] ${s.instruction}`))
    }
    if (Array.isArray(result.steps)) {
      lines.push('各步:')
      result.steps.forEach((s, i) =>
        lines.push(`  ${i + 1}. ${s.tool} model=${s.model_used} ok=${s.ok}`))
    }
    lines.push('')
  }
  lines.push(result.final || result.error || '(无结果)')
  if (usageLine) lines.push('', usageLine)
  return bounded(lines.join('\n'), 3200)
}

/**
 * 挂载 orchestrate 工具。
 * @param ctx cordis 上下文
 * @param config 已收敛的配置
 */
export function apply(ctx, config) {
  const description = [
    'Run a multi-model tool orchestration on the local LangGraph orchestrator.',
    'op="full" (default): use workdir + execution {program,args} for a deterministic known command without model calls; otherwise decompose request with model pools. Execution requires absolute workdir. Use log_ref for quota-limited log reads.',
    'op="tool": run a single named tool on its pool.',
    'op="list": list configured tools and their model pools.',
    'op="plan_review": submit a Markdown plan (arg `plan`) for strict review by the plan_reviewer model pool (current: workbuddy/deepseek-v4.1-flash); returns verdict pass|reject, score, issues, suggestions. Any edit/write must be preceded by an approved AND human-confirmed plan in .plan/; use plan_review, then ask_user_question for final confirmation.',
    `op="tool" requires tool ∈ {${TOOL_NAMES.join(', ')}}.`,
    'Use this when a task benefits from multiple specialized models or from failover across backup models.',
  ].join(' ')

  ctx.tools.register({
    name: TOOL_NAME,
    description,
    parameters: {
      type: 'object',
      properties: {
        request: {
          type: 'string',
          description: 'The natural-language task/prompt for the orchestrator. Required for op=full and op=tool.',
        },
        op: {
          type: 'string',
          enum: ALLOWED_OPS,
          description: 'full (default) | tool | list | plan_review',
        },
        tool: {
          type: 'string',
          enum: TOOL_NAMES,
          description: 'When op=tool, which tool to run.',
        },
        plan: {
          type: 'string',
          description: 'When op=plan_review, the full Markdown plan text to review.',
        },
        context: {
          type: 'string',
          description: 'When op=plan_review, optional task/background context (falls back to request).',
        },
        workdir: { type: 'string', description: 'Explicit absolute working directory; required for every full request. For plan_review, identifies the repository containing .plan.' },
        execution: {
          type: 'object', description: 'Deterministic full fast path: program + argument array; no shell or model calls.',
          properties: {
            program: { type: 'string', enum: ['npm', 'pnpm', 'bun', 'python', 'git', 'node'] },
            args: { type: 'array', items: { type: 'string' } },
            timeout: { type: 'number' },
          }, required: ['program', 'args'], additionalProperties: false,
        },
        preflight: { type: 'object', description: 'Optional declared test environment; checked before execution.',
          properties: { testUrl: { type: 'string' }, expectedOrigin: { type: 'string' },
            environment: { type: 'string' } }, additionalProperties: false },
        log_ref: { type: 'string', description: 'Registered log reference for quota-limited narrow read.' },
        offset: { type: 'integer', minimum: 0 },
        limit: { type: 'integer', minimum: 1, maximum: 2000 },
        plan_path: { type: 'string', description: 'Plan path within workdir/.plan.' },
        base_sha: { type: 'string' },
        base_version: { type: 'integer', minimum: 1 },
        delta: { type: 'array', items: { type: 'object', properties: {
          old: { type: 'string' }, new: { type: 'string' },
        }, required: ['old', 'new'], additionalProperties: false } },

      },
      // 不强制 request：plan_review 可用 plan+context 独立调用；各 op 在 execute 内自行校验必填项。
      additionalProperties: false,
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args, exec) {
      const op = args.op || 'full'
      exec.signal?.throwIfAborted?.()

      if (op === 'list') {
        const result = await callPython(config, { op: 'list' }, exec.signal)
        return renderResult(result, config.verbose)
      }
      if (op === 'tool') {
        if (!args.tool) throw new Error('orchestrate: op=tool 需要 tool 参数')
        if (!args.request) throw new Error('orchestrate: op=tool 需要 request 参数')
        const sessionId = hostSessionId(exec)
        const result = await callPython(
          config,
          { op: 'tool', tool: args.tool, request: args.request, session_id: sessionId },
          exec.signal,
        )
        return renderResult(result, config.verbose)
      }
      if (op === 'plan_review') {
        if ((!args.plan || !String(args.plan).trim()) && !args.delta?.length) {
          throw new Error('orchestrate: op=plan_review 需要 plan 参数（Markdown 计划正文）')
        }
        const sessionId = hostSessionId(exec)
        const result = await callPython(
          config,
          {
            op: 'plan_review',
            plan: args.plan,
            context: args.context || args.request || '',
            workdir: args.workdir, plan_path: args.plan_path,
            base_sha: args.base_sha, base_version: args.base_version, delta: args.delta,
            session_id: sessionId,
          },
          exec.signal,
        )
        return renderResult(result, config.verbose)
      }
      // full: environment precheck precedes child execution.
      if (args.execution) {
        const { program, args: argv = [] } = args.execution;
        const packageScript = ['npm', 'pnpm', 'bun'].includes(program) && argv[0] === 'run' ? argv[1] : undefined;
        const checked = preflight({ ...args.preflight, workdir: args.workdir, packageScript });
        if (!checked.ok) return JSON.stringify({ mode: 'execution', ok: false, code: checked.errors[0], errors: checked.errors });
      }
      const sessionId = hostSessionId(exec)
      const result = await enqueueSession(sessionId, () => callPython(config, {
        op: 'full',
        request: args.request,
        workdir: args.workdir, execution: args.execution,
        log_ref: args.log_ref, offset: args.offset, limit: args.limit,
        session_id: sessionId,
      }, exec.signal))
      return renderResult(result, config.verbose)
    },
    presentCall: (args) => ({
      card: 'generic',
      title: args.op === 'list' ? 'Orchestrator: list tools' : 'Orchestrator run',
      kind: 'other',
      rawInput: args,
    }),
  })
}
