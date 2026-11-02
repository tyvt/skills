/**
 * 自测：不启动 DSH，直接加载网关，跑三条真实路径。
 *
 *   node selftest.mjs
 *
 * 1. 列 dbx 工具（省略 tool）
 * 2. 调 dbx 一个只读工具（list_connections）
 * 3. 未知 server / 未知 tool 的错误可读性
 * 4. 取消（已 abort 的 signal）
 *
 * 退出码 0 = 全绿。
 */

import { Config } from './lib/config.js'
import { apply } from './lib/index.js'

const RAW_CONFIG = {
  toolCallTimeoutMs: 60000,
  listTimeoutMs: 15000,
  servers: {
    dbx: {
      command: 'C:\\Users\\Administrator\\.dbx\\bin\\dbx-mcp.exe',
      args: [],
      hint: '禅道与业务数据库',
    },
  },
}

let failures = 0
function check(label, condition, detail) {
  if (condition) {
    console.log(`ok   ${label}`)
  } else {
    failures += 1
    console.log(`FAIL ${label}${detail === undefined ? '' : `: ${detail}`}`)
  }
}

// ---- 1. 配置校验 ----
const validated = Config['~standard'].validate(RAW_CONFIG)
check('Config 校验通过', validated.issues === undefined, JSON.stringify(validated.issues))
const config = validated.value

// 坏配置必须被拒
const empty = Config['~standard'].validate({ servers: {} })
check('空 servers 被拒', empty.issues !== undefined)
const noCommand = Config['~standard'].validate({ servers: { x: { args: [] } } })
check('缺 command 被拒', noCommand.issues !== undefined)

// ---- 2. 捕获注册的 ToolDefinition ----
let definition
const disposers = []
const ctx = {
  tools: {
    register(value) {
      definition = value
      return () => {}
    },
  },
  logger: { info() {}, warn() {}, error() {} },
  on(event, handler) {
    disposers.push({ event, handler })
    return () => {}
  },
}

apply(ctx, config)
check('注册了一个工具', definition !== undefined)
check('工具名是 mcp_gateway', definition?.name === 'mcp_gateway', definition?.name)
check('描述点名了 server', definition?.description?.includes('dbx') === true)
check(
  '描述声明能力不是缺失的',
  definition?.description?.includes('NOT missing') === true,
)
check('参数里 server 是必填', Array.isArray(definition?.parameters?.required) && definition.parameters.required.includes('server'))
const schemaChars = JSON.stringify(definition?.parameters ?? {}).length + (definition?.description?.length ?? 0)
console.log(`     入口工具 schema+描述 = ${schemaChars} 字符（旧 36 个 MCP 工具为 48,256）`)

const signal = new AbortController().signal
const exec = { signal }

// ---- 3. 省略 tool：列清单 ----
let listed = ''
try {
  listed = await definition.execute({ server: 'dbx' }, exec)
  check('列出 dbx 工具', listed.includes('dbx 有 25 个工具'), listed.slice(0, 120))
  check('清单含 execute_query', listed.includes('dbx_execute_query'))
  check('清单是紧凑渲染（不含 JSON schema）', !listed.includes('"properties"'))
} catch (error) {
  failures += 1
  console.log(`FAIL 列出 dbx 工具: ${error.message}`)
}

// ---- 4. 调用一个真实只读工具 ----
try {
  const output = await definition.execute(
    { server: 'dbx', tool: 'dbx_list_connections', arguments: {} },
    exec,
  )
  check('调用 dbx_list_connections 有输出', typeof output === 'string' && output.length > 0)
  console.log(`     返回前 120 字符: ${output.slice(0, 120).replace(/\s+/g, ' ')}`)
} catch (error) {
  failures += 1
  console.log(`FAIL 调用 dbx_list_connections: ${error.message}`)
}

// ---- 5. 错误路径可读 ----
try {
  await definition.execute({ server: 'nope' }, exec)
  failures += 1
  console.log('FAIL 未知 server 应抛错')
} catch (error) {
  check('未知 server 报错点名可选值', error.message.includes('configured servers: dbx'), error.message)
}

try {
  await definition.execute({ server: 'dbx', tool: 'dbx_not_a_tool', arguments: {} }, exec)
  failures += 1
  console.log('FAIL 未知 tool 应抛错')
} catch (error) {
  check('未知 tool 报错含上游原因', /not|unknown|invalid/i.test(error.message), error.message.slice(0, 160))
}

// ---- 6. 取消 ----
const aborted = new AbortController()
aborted.abort()
try {
  await definition.execute({ server: 'dbx' }, { signal: aborted.signal })
  failures += 1
  console.log('FAIL 已 abort 的 signal 应抛错')
} catch (error) {
  check('已 abort 的调用被取消', /cancel|abort/i.test(error.message), error.message)
}

// ---- 7. dispose ----
for (const entry of disposers) if (entry.event === 'dispose') entry.handler()
await new Promise((resolve) => setTimeout(resolve, 300))
check('dispose 已挂载', disposers.some((entry) => entry.event === 'dispose'))

console.log(failures === 0 ? '\nALL GREEN' : `\n${failures} FAILURE(S)`)
process.exit(failures === 0 ? 0 : 1)
