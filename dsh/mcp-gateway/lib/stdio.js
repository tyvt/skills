/**
 * 零依赖的 MCP stdio 客户端。
 *
 * 为什么不用 `@modelcontextprotocol/client`：本插件装在 profile 之外，
 * 依赖解析能不能拿到那个包取决于 app-boot 的 installation 解析器，实测不可靠；
 * 而 MCP 的 stdio 传输就是「一行一个 JSON-RPC 消息」，几十行就能写完，且
 * 握手/列工具/调用三条路径都已在 `dbx-mcp.exe` 上验证通过。
 *
 * 只实现网关需要的最小面：initialize / notifications/initialized /
 * tools/list / tools/call，外加超时、取消、stderr 诊断。
 *
 * @module dsh-mcp-gateway/stdio
 */

import { spawn } from 'node:child_process'

/** MCP 版本；服务端不接受时以它自己回的版本为准（我们只记录，不重试）。 */
const PROTOCOL_VERSION = '2024-11-05'
const CLIENT_INFO = { name: 'dsh-mcp-gateway', version: '0.1.0' }
/** stderr 只留尾部，避免把一条命令的噪声全存进内存。 */
const STDERR_LIMIT = 8192

/** 一条连接的生命周期错误，携带足够的诊断信息。 */
export class McpGatewayError extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = 'McpGatewayError'
  }
}

/**
 * 启动一个 MCP server 并完成握手。
 * @param name - serverName，只用于错误信息。
 * @param spec - { command, args, startupTimeoutMs }。
 * @returns 已握手的连接对象。
 */
export async function connect(name, spec) {
  const child = spawn(spec.command, spec.args, {
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
    // 不继承 DSH 自己的环境噪声，但保留 PATH / SystemRoot 等启动必需项。
    env: process.env,
  })

  let stderr = ''
  let buffer = ''
  let nextId = 1
  const pending = new Map()
  let closed = false
  let closeReason = ''

  const failAll = (reason) => {
    if (closed) return
    closed = true
    closeReason = reason
    for (const entry of pending.values()) {
      entry.reject(new McpGatewayError(`${name}: ${reason}${stderrTail(stderr)}`))
    }
    pending.clear()
  }

  child.on('error', (error) => failAll(`failed to start "${spec.command}": ${error.message}`))
  child.on('exit', (code, signal) => {
    failAll(`server exited (code=${code ?? 'null'}, signal=${signal ?? 'null'})`)
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', (chunk) => {
    stderr += chunk
    if (stderr.length > STDERR_LIMIT) stderr = stderr.slice(-STDERR_LIMIT)
  })
  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (chunk) => {
    buffer += chunk
    let index
    while ((index = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, index).trim()
      buffer = buffer.slice(index + 1)
      if (line === '') continue
      let message
      try {
        message = JSON.parse(line)
      } catch {
        // 非 JSON 行（启动横幅之类）忽略：MCP 客户端不该因为噪声崩掉。
        continue
      }
      if (message.id === undefined || message.id === null) continue // notification
      const entry = pending.get(message.id)
      if (entry === undefined) continue
      pending.delete(message.id)
      clearTimeout(entry.timer)
      if (message.error !== undefined) {
        const detail = typeof message.error?.message === 'string' ? message.error.message : JSON.stringify(message.error)
        entry.reject(new McpGatewayError(`${name}: ${detail}`))
      } else {
        entry.resolve(message.result)
      }
    }
  })

  const request = (method, params, timeoutMs, signal) =>
    new Promise((resolve, reject) => {
      if (closed) {
        reject(new McpGatewayError(`${name}: connection is closed (${closeReason})${stderrTail(stderr)}`))
        return
      }
      if (signal?.aborted === true) {
        reject(new McpGatewayError(`${name}: ${method} cancelled before dispatch`))
        return
      }
      const id = nextId++
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new McpGatewayError(`${name}: ${method} timed out after ${timeoutMs} ms${stderrTail(stderr)}`))
      }, timeoutMs)
      timer.unref?.()
      const onAbort = () => {
        if (!pending.has(id)) return
        pending.delete(id)
        clearTimeout(timer)
        reject(new McpGatewayError(`${name}: ${method} cancelled`))
      }
      signal?.addEventListener('abort', onAbort, { once: true })
      pending.set(id, {
        timer,
        resolve: (value) => {
          signal?.removeEventListener('abort', onAbort)
          resolve(value)
        },
        reject: (error) => {
          signal?.removeEventListener('abort', onAbort)
          reject(error)
        },
      })
      try {
        child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`)
      } catch (error) {
        pending.delete(id)
        clearTimeout(timer)
        reject(new McpGatewayError(`${name}: writing ${method} failed: ${error.message}${stderrTail(stderr)}`))
      }
    })

  const notify = (method, params) => {
    if (closed) return
    try {
      child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`)
    } catch {
      /* 通知失败由下一次 request 的 closed 检查兜住 */
    }
  }

  const handshake = await request(
    'initialize',
    { protocolVersion: PROTOCOL_VERSION, capabilities: {}, clientInfo: CLIENT_INFO },
    spec.startupTimeoutMs,
  ).catch((error) => {
    child.kill()
    throw error
  })
  notify('notifications/initialized', {})

  const connection = {
    name,
    serverInfo: handshake?.serverInfo ?? null,
    protocolVersion: typeof handshake?.protocolVersion === 'string' ? handshake.protocolVersion : PROTOCOL_VERSION,
    /** 列出全部上游工具（每次调用都重新取，容忍 server 端工具集变化）。 */
    async listTools(timeoutMs, signal) {
      const result = await request('tools/list', {}, timeoutMs, signal)
      const tools = Array.isArray(result?.tools) ? result.tools : []
      return tools
    },
    /** 调用一个上游工具，原样返回 MCP 结果对象。 */
    callTool(rawName, args, timeoutMs, signal) {
      return request('tools/call', { name: rawName, arguments: args ?? {} }, timeoutMs, signal)
    },
    /** 关闭子进程；幂等。 */
    dispose() {
      if (closed) return
      closed = true
      closeReason = 'disposed'
      for (const entry of pending.values()) {
        clearTimeout(entry.timer)
        entry.reject(new McpGatewayError(`${name}: connection disposed`))
      }
      pending.clear()
      try {
        child.stdin.end()
      } catch {
        /* 已经关了 */
      }
      child.kill()
    },
  }
  return connection
}

function stderrTail(stderr) {
  const text = stderr.trim()
  if (text === '') return ''
  return `\n--- stderr ---\n${text.slice(-2000)}`
}
