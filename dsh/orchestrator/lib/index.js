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

export { Config }

/** cordis 用 name 做日志分类与 patch 行 id。 */
export const name = 'orchestrator'

/** 需要工具注册表就位。 */
export const inject = ['tools']

const TOOL_NAME = 'orchestrate'
const ALLOWED_OPS = ['full', 'tool', 'list']
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

function callPython(config, payload, signal) {
  return new Promise((resolve, reject) => {
    const args = ['-X', 'utf8', '-m', 'src.jsonbridge']
    const child = spawn(config.pythonExe, args, {
      cwd: config.projectDir,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    })

    let stdout = ''
    let stderr = ''
    let settled = false
    const finish = (fn, value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      fn(value)
    }

    const timer = setTimeout(() => {
      child.kill()
      finish(reject, new Error(`orchestrator: python 调用超时 (${config.timeoutMs}ms)`))
    }, config.timeoutMs)

    const onAbort = () => {
      child.kill()
      finish(reject, new Error('orchestrator: 调用被取消'))
    }
    signal?.addEventListener?.('abort', onAbort, { once: true })

    child.stdout.on('data', (d) => { stdout += d.toString('utf8') })
    child.stderr.on('data', (d) => { stderr += d.toString('utf8') })
    child.on('error', (err) => finish(reject, new Error(`orchestrator: 无法启动 python: ${err.message}`)))
    child.on('close', (code) => {
      signal?.removeEventListener?.('abort', onAbort)
      const text = stdout.trim()
      if (text === '') {
        finish(reject, new Error(`orchestrator: python 无输出 (exit=${code})\n${stderr.slice(-800)}`))
        return
      }
      let parsed
      try {
        parsed = JSON.parse(text)
      } catch (e) {
        finish(reject, new Error(`orchestrator: 解析 python 输出失败: ${e.message}\n${text.slice(-800)}`))
        return
      }
      if (parsed && parsed.ok === false) {
        finish(reject, new Error(parsed.error || 'orchestrator: 编排失败'))
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

/** 把编排结果渲染成给模型读的紧凑文本。 */
function renderResult(result, verbose) {
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
  lines.push(result.final || '(无结果)')
  if (usageLine) lines.push('', usageLine)
  return lines.join('\n')
}

/**
 * 挂载 orchestrate 工具。
 * @param ctx cordis 上下文
 * @param config 已收敛的配置
 */
export function apply(ctx, config) {
  const description = [
    'Run a multi-model tool orchestration on the local LangGraph orchestrator.',
    'op="full" (default): decompose the request, dispatch to tools, and run each tool on its own magpie model pool with automatic failover, then summarize.',
    'op="tool": run a single named tool on its pool.',
    'op="list": list configured tools and their model pools.',
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
          description: 'full (default) | tool | list',
        },
        tool: {
          type: 'string',
          enum: TOOL_NAMES,
          description: 'When op=tool, which tool to run.',
        },
      },
      required: ['request'],
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
        const sessionId = hostSessionId(exec)
        const result = await callPython(
          config,
          { op: 'tool', tool: args.tool, request: args.request, session_id: sessionId },
          exec.signal,
        )
        return renderResult(result, config.verbose)
      }
      // full
      const sessionId = hostSessionId(exec)
      const result = await enqueueSession(sessionId, () => callPython(config, {
        op: 'full',
        request: args.request,
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
