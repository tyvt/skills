/**
 * dsh-mcp-gateway
 *
 * 把「一堆常驻 MCP 工具」换成**一个**入口工具。
 *
 * 背景（实测数据，见 token-audit/portal-2d1bdfb2.md）：
 * - `mcp__dbx__*` 25 个 + `mcp__context-mode__*` 11 个，schema 合计 48,256 字符
 *   ≈ 13,049 token，**每个请求都重发**；
 * - 门户项目 15 个会话 955 步里，这些工具被调用 **0 次**。
 *
 * 为什么不做「默认关、需要时开」：
 * - 环境变量开关只影响 `dsh web` 启动那一刻，agent 看不见也改不了；
 * - `plugin_manager` 在 standard/ptc/minimal 三个 preset 里都是 disabled，
 *   agent 没有能力开；
 * - `deferLoading` 只有在模型 route 声明了 `compat.supportsMidConvoToolChanges`
 *   之类能力时才生效，magpie 的 openai-completions 模型没有 `compat`，
 *   `deferLoading` 会被剥掉当普通工具发出去。
 *
 * 所以这里让**工具表里始终有一个很小的入口**，它的 description 自己说明
 * 「是什么、什么时候用、怎么用」。工具集恒定 → 前缀缓存不被打断。
 *
 * 本插件零依赖：不 import `@deepseek-ai/*`（profile 外解析不到），
 * 直接向 `ctx.tools.register()` 交原始 ToolDefinition。
 *
 * @module dsh-mcp-gateway
 */

import { Config } from './config.js'
import { connect } from './stdio.js'

export { Config }

/** cordis 用 name 做日志分类与 patch 行 id。 */
export const name = 'mcp-gateway'

/** 需要工具注册表就位。 */
export const inject = ['tools']

const TOOL_NAME = 'mcp_gateway'

/** serverName -> { promise, conn }，进程级复用；握手失败不缓存，下次重试。 */
const connections = new Map()

function getConnection(serverName, spec, log) {
  const cached = connections.get(serverName)
  if (cached !== undefined) return cached.promise
  const promise = connect(serverName, spec).then(
    (conn) => {
      log?.info?.('mcp-gateway: connected %s (%s)', serverName, conn.serverInfo?.name ?? 'unknown')
      return conn
    },
    (error) => {
      connections.delete(serverName)
      throw error
    },
  )
  connections.set(serverName, { promise })
  return promise
}

/** 把 MCP 的 content[] 投影成模型可读文本。 */
function projectContent(result) {
  const blocks = Array.isArray(result?.content) ? result.content : []
  const parts = []
  for (const block of blocks) {
    if (block?.type === 'text' && typeof block.text === 'string') {
      parts.push(block.text)
      continue
    }
    if (block?.type === 'image') {
      const mime = typeof block.mimeType === 'string' ? block.mimeType : 'image'
      const bytes = typeof block.data === 'string' ? Math.floor((block.data.length * 3) / 4) : 0
      parts.push(`[image omitted by mcp_gateway: ${mime}, ~${bytes} bytes]`)
      continue
    }
    if (block?.type === 'resource' && typeof block.resource?.text === 'string') {
      parts.push(block.resource.text)
      continue
    }
    parts.push(JSON.stringify(block))
  }
  if (parts.length === 0 && result?.structuredContent !== undefined) {
    parts.push(JSON.stringify(result.structuredContent))
  }
  return parts.join('\n').trim()
}

/** 工具清单的紧凑渲染：名字 + 首行描述，避免把上游 schema 全量灌回来。 */
function renderToolList(serverName, tools) {
  const lines = [`${serverName} 有 ${tools.length} 个工具（省略 tool 参数即本清单）：`]
  for (const tool of tools) {
    const description = typeof tool?.description === 'string' ? tool.description : ''
    const firstLine = description.split('\n')[0].trim()
    const clipped = firstLine.length > 160 ? `${firstLine.slice(0, 157)}...` : firstLine
    lines.push(`- ${tool?.name ?? '(unnamed)'}: ${clipped}`)
  }
  lines.push('')
  lines.push('要调用其中某个，传 tool=<名字> 和 arguments=<参数对象>。')
  return lines.join('\n')
}

/**
 * 挂载网关工具。
 * @param ctx - cordis 上下文。
 * @param config - 已由 {@link Config} 收敛过的配置。
 */
export function apply(ctx, config) {
  const serverNames = Object.keys(config.servers)
  const hints = serverNames
    .map((serverName) => {
      const hint = config.servers[serverName].hint
      return hint === '' ? `\`${serverName}\`` : `\`${serverName}\` — ${hint}`
    })
    .join('；')

  const description = [
    'Call a tool on an on-demand MCP server. Omit `tool` to list that server\'s tools first, then call again with `tool` and `arguments`.',
    `Available servers: ${hints}.`,
    'These capabilities are NOT missing: call this tool before concluding you cannot reach a database, inspect a schema, or search earlier sessions. The individual upstream tools are intentionally not listed in the tool catalog.',
  ].join(' ')

  ctx.tools.register({
    name: TOOL_NAME,
    description,
    parameters: {
      type: 'object',
      properties: {
        server: {
          type: 'string',
          enum: serverNames,
          description: 'Which MCP server to use. Omit nothing else first: this is required.',
        },
        tool: {
          type: 'string',
          description: 'Upstream tool name. Omit to list that server\'s tools.',
        },
        arguments: {
          type: 'object',
          additionalProperties: true,
          description: 'Arguments object for the upstream tool; defaults to {}.',
        },
      },
      required: ['server'],
      additionalProperties: false,
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args, exec) {
      const serverName = args.server
      const spec = config.servers[serverName]
      if (spec === undefined) {
        throw new Error(
          `mcp_gateway: unknown server "${serverName}"; configured servers: ${serverNames.join(', ')}`,
        )
      }
      exec.signal?.throwIfAborted?.()
      const conn = await getConnection(serverName, spec, ctx.logger)
      exec.signal?.throwIfAborted?.()

      if (args.tool === undefined || args.tool === '') {
        const tools = await conn.listTools(config.listTimeoutMs, exec.signal)
        return renderToolList(serverName, tools)
      }

      const rawArguments = args.arguments === undefined || args.arguments === null ? {} : args.arguments
      if (typeof rawArguments !== 'object' || Array.isArray(rawArguments)) {
        throw new Error('mcp_gateway: arguments must be an object')
      }
      const result = await conn.callTool(args.tool, rawArguments, config.toolCallTimeoutMs, exec.signal)
      const text = projectContent(result)
      if (result?.isError === true) {
        throw new Error(`${serverName}/${args.tool} reported an error:\n${text}`)
      }
      return text === '' ? '(no output)' : text
    },
  })

  ctx.on('dispose', () => {
    for (const entry of connections.values()) {
      entry.promise.then((conn) => conn.dispose(), () => {})
    }
    connections.clear()
  })
}
