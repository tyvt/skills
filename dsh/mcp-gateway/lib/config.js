/**
 * 配置的运行时校验。
 *
 * 这里**故意不依赖** `@deepseek-ai/schemastery`：本插件装在 profile 之外，
 * 拿不到那个包（实测 `import` 会让整行加载失败、整个 profile 起不来）。
 *
 * cordis 认的是 Standard Schema 协议：对象上有 `~standard.validate()`，
 * 返回 `{ value }` 或 `{ issues }`（同步、不能返回 Promise）。所以手写一个
 * 只做类型收敛的小实现。
 *
 * @module dsh-mcp-gateway/config
 */

/** 一个 MCP server 的启动参数。 */
const SERVER_DEFAULTS = {
  /** 可执行文件；相对路径按 DSH_HOME 解析不划算，这里要求绝对路径或 PATH 里的名字。 */
  command: '',
  args: [],
  /** 列在工具描述里的用途提示，帮助模型判断该不该调。 */
  hint: '',
  /** 启动后握手超时。 */
  startupTimeoutMs: 20000,
}

/** 默认配置。 */
export const DEFAULTS = {
  /** serverName -> 启动参数。 */
  servers: {},
  /** 单次 tools/call 超时。 */
  toolCallTimeoutMs: 60000,
  /** 单次 tools/list 超时。 */
  listTimeoutMs: 15000,
}

function parseServer(name, raw) {
  if (raw === null || raw === undefined || typeof raw !== 'object' || Array.isArray(raw)) {
    return { issues: [{ message: `mcp-gateway: servers.${name} must be an object` }] }
  }
  const command = typeof raw.command === 'string' ? raw.command.trim() : ''
  if (command === '') {
    return { issues: [{ message: `mcp-gateway: servers.${name}.command is required` }] }
  }
  const args = Array.isArray(raw.args) ? raw.args.map((value) => String(value)) : []
  return {
    value: {
      command,
      args,
      hint: typeof raw.hint === 'string' ? raw.hint.trim() : '',
      startupTimeoutMs: positive(raw.startupTimeoutMs, SERVER_DEFAULTS.startupTimeoutMs),
    },
  }
}

function positive(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback
}

/**
 * 校验并补默认值。
 * @param input - 用户在 patch 里写的原始配置。
 * @returns Standard Schema 约定的结果对象。
 */
function validate(input) {
  const source = input === null || input === undefined ? {} : input
  if (typeof source !== 'object' || Array.isArray(source)) {
    return { issues: [{ message: 'mcp-gateway: config must be an object' }] }
  }
  const rawServers = source.servers
  if (rawServers === null || rawServers === undefined || typeof rawServers !== 'object' || Array.isArray(rawServers)) {
    return { issues: [{ message: 'mcp-gateway: servers must be an object of server definitions' }] }
  }
  const names = Object.keys(rawServers)
  if (names.length === 0) {
    return { issues: [{ message: 'mcp-gateway: servers is empty; declare at least one MCP server' }] }
  }
  const servers = {}
  for (const name of names) {
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(name)) {
      return { issues: [{ message: `mcp-gateway: server name "${name}" must match [A-Za-z0-9_-]{1,32}` }] }
    }
    const parsed = parseServer(name, rawServers[name])
    if (parsed.issues !== undefined) return parsed
    servers[name] = parsed.value
  }
  return {
    value: {
      servers,
      toolCallTimeoutMs: positive(source.toolCallTimeoutMs, DEFAULTS.toolCallTimeoutMs),
      listTimeoutMs: positive(source.listTimeoutMs, DEFAULTS.listTimeoutMs),
    },
  }
}

/** cordis 会读这个属性；`~standard` 这个名字是 Standard Schema 协议规定的。 */
export const Config = {
  '~standard': {
    version: 1,
    vendor: 'dsh-mcp-gateway',
    validate,
  },
}
