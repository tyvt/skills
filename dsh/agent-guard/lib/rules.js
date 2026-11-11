/**
 * dsh-agent-guard · 修复规则（纯函数，零依赖，可单测）
 *
 * 这一层只做「参数形状」的确定性修复：把模型大概率写错、但语义唯一可推断的
 * 参数形状纠正回工具契约要求的形状。凡是需要猜业务语义的地方一律不碰。
 *
 * 数据来源：2026-10-29 的 agent 调用失败审计（57 次工具失败 + 71 次供应商失败）。
 * 见 ~/.dsh/reports/agent-failures-latest.json。
 */

/** 模型偶尔把 JSON 片段拼进工具名（实测出现 `grep">`）。 */
const NAME_NOISE = /^[\s"'`<>]+|[\s"'`<>]+$/g

/**
 * 工具名别名：模型用了旧名 / 近似名，且目标工具确实是唯一合理的那个。
 * 只在「原名未注册 + 别名已注册」时改写，避免把真未知的工具名瞎猜成别的。
 * 来源：2026-11-09 实测 UNKNOWN_TOOL `schedule_update`（正确名 `schedule_edit`）。
 */
const TOOL_NAME_ALIASES = Object.freeze({
  schedule_update: 'schedule_edit',
})

/**
 * 参数名别名：字段名写错但语义唯一可推断。
 * 来源：2026-11-09 实测 `grep` 传了 `glob`（契约里是 `include`）；
 * 2026-11-10 实测 openviking search 传 `queries` 数组（契约是 `query` 字符串），
 * 错一次 INVALID_ARGUMENT 就白烧一步。
 */
const ARG_ALIASES = Object.freeze({
  grep: Object.freeze({ glob: 'include' }),
  mcp__openviking__search: Object.freeze({ queries: 'query' }),
})

/**
 * 搬运后的值归一化：web search 系工具用 `queries` 数组，openviking search 的
 * `query` 是字符串——单元素数组解包，多元素用空格连接，标量转字符串。
 */
function normalizeAliasValue(toolName, from, value) {
  if (toolName === 'mcp__openviking__search' && from === 'queries') {
    if (Array.isArray(value)) {
      return value.length === 1 ? String(value[0]) : value.map(String).join(' ')
    }
    return String(value)
  }
  return value
}

/** `update_goal` 只有 action=edit 才接受这两个字段。 */
const GOAL_EDIT_ONLY_FIELDS = ['objective', 'max_goal_rounds']

/** `update_goal` 只有 action=blocked 才接受这个字段。 */
const GOAL_BLOCK_ONLY_FIELDS = ['blocked_reason']

/** `todo_write` 的每一项只接受这两个字段。 */
const TODO_ITEM_FIELDS = new Set(['content', 'status'])

/** 可重试的供应商失败码。 */
export const RETRYABLE_CODES = new Set([
  'SERVER',
  'RATE_LIMIT',
  'TIMEOUT',
  'TRANSPORT',
  'EMPTY_RESPONSE',
  'OVERLOADED',
])

/**
 * 归一化工具名：去掉首尾噪声字符 → 查别名表，命中已注册工具就改写。
 * @param {string} name - 模型给出的工具名。
 * @param {(candidate: string) => boolean} isKnown - 判断名字是否已注册。
 * @returns {{ name: string, repair: object | null }}
 */
export function repairToolName(name, isKnown) {
  if (typeof name !== 'string') return { name, repair: null }
  if (isKnown(name)) return { name, repair: null }
  const trimmed = name.replace(NAME_NOISE, '')
  if (trimmed !== '' && trimmed !== name && isKnown(trimmed)) {
    return {
      name: trimmed,
      repair: { rule: 'tool-name-trim', detail: `normalized ${JSON.stringify(name)} -> ${JSON.stringify(trimmed)}` },
    }
  }
  const alias = TOOL_NAME_ALIASES[name]
  if (alias && isKnown(alias)) {
    return {
      name: alias,
      repair: { rule: 'tool-name-alias', detail: `mapped ${JSON.stringify(name)} -> ${JSON.stringify(alias)}` },
    }
  }
  return { name, repair: null }
}

/**
 * `update_goal` 的字段与 action 必须一致，否则整次调用被拒（INVALID_ARGS 家族
 * 里的 GOAL_TOOL_INVALID_UPDATE，实测单日 11 次，是当日第一大失败类别）。
 * @param {object} args - 原始参数（会被就地修改）。
 * @returns {object[]} 修复清单。
 */
export function repairGoalArgs(args) {
  const repairs = []
  if (args === null || typeof args !== 'object' || Array.isArray(args)) return repairs
  const action = args.action

  // 模型压根没传 action，却带了只有 edit 才接受的字段 —— 唯一合法的 action 就是 edit。
  // 推断 action='edit' 比静默丢弃这些字段更能保留意图。本分支只在 action 真缺失时触发，
  // 显式传了 action（含 complete / blocked）时不动，交给下面的剔除逻辑，保持与
  // 「当日 11 次 GOAL_TOOL_INVALID_UPDATE（action=complete 同时带 objective）」分支一致。
  if ((action === undefined || action === null) && GOAL_EDIT_ONLY_FIELDS.some((k) => k in args)) {
    args.action = 'edit'
    repairs.push({ rule: 'goal-edit-inferred', detail: 'inferred action=edit from edit-only fields' })
  }

  if (args.action !== 'edit') {
    for (const key of GOAL_EDIT_ONLY_FIELDS) {
      if (key in args) {
        delete args[key]
        repairs.push({ rule: 'goal-edit-only-field', detail: `dropped ${key} (action=${String(args.action)})` })
      }
    }
  }
  if (action !== 'blocked') {
    for (const key of GOAL_BLOCK_ONLY_FIELDS) {
      if (key in args) {
        delete args[key]
        repairs.push({ rule: 'goal-block-only-field', detail: `dropped ${key} (action=${String(action)})` })
      }
    }
  }
  return repairs
}

/**
 * `justification` 与 `sandbox_permissions` 必须成对出现，单独出现都会被拒
 * （ESCALATION_ARGS，实测单日 3 次）。
 * @param {object} args - 原始参数（会被就地修改）。
 * @param {object} schema - 工具的 JSON Schema。
 * @returns {object[]} 修复清单。
 */
export function repairEscalationArgs(args, schema) {
  const repairs = []
  if (args === null || typeof args !== 'object' || Array.isArray(args)) return repairs
  const properties = schema?.properties
  if (!properties || typeof properties !== 'object') return repairs
  const hasJustification = 'justification' in properties
  const hasPermissions = 'sandbox_permissions' in properties
  if (!hasJustification && !hasPermissions) return repairs

  const justification = args.justification
  const permissions = args.sandbox_permissions
  // 是否「落单」看的是**参数里有没有**，不是 schema 里声明没声明。
  const permissionsPresent = permissions !== undefined && permissions !== null

  if (hasJustification && justification !== undefined && !permissionsPresent) {
    delete args.justification
    repairs.push({ rule: 'orphan-justification', detail: 'dropped justification (no sandbox_permissions)' })
  } else if (
    hasJustification && hasPermissions && permissionsPresent
    && (typeof justification !== 'string' || justification.trim() === '')
  ) {
    args.justification = 'Retrying the operation with a wider sandbox permission as requested.'
    repairs.push({ rule: 'missing-justification', detail: 'synthesized justification for sandbox_permissions' })
  }
  return repairs
}

/**
 * `todo_write` 的每一项只接受 content/status，多余键会让整次调用被拒。
 * @param {object} args - 原始参数（会被就地修改）。
 * @returns {object[]} 修复清单。
 */
export function repairTodoArgs(args) {
  const repairs = []
  if (args === null || typeof args !== 'object' || Array.isArray(args)) return repairs
  const items = args.todos
  if (!Array.isArray(items)) return repairs
  for (const item of items) {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) continue
    for (const key of Object.keys(item)) {
      if (!TODO_ITEM_FIELDS.has(key)) {
        delete item[key]
        repairs.push({ rule: 'todo-item-extra-key', detail: `dropped todos[].${key}` })
      }
    }
  }
  return repairs
}

/**
 * 把值收敛到 schema 声明的类型。只做无损且唯一的转换。
 * @param {object} prop - 属性 schema。
 * @param {unknown} value - 原始值。
 * @returns {unknown} 收敛后的值；无法安全转换时原样返回。
 */
function coerceValue(prop, value) {
  if (prop === null || typeof prop !== 'object') return value
  const declared = prop.type
  const types = typeof declared === 'string' ? [declared] : Array.isArray(declared) ? declared : []
  if (types.length === 0) return value

  if (typeof value === 'string') {
    if (types.includes('boolean')) {
      const lowered = value.trim().toLowerCase()
      if (lowered === 'true') return true
      if (lowered === 'false') return false
    }
    if (types.includes('number') || types.includes('integer')) {
      const trimmed = value.trim()
      if (trimmed !== '' && /^-?\d+(\.\d+)?$/.test(trimmed)) {
        const numeric = Number(trimmed)
        if (Number.isFinite(numeric)) return types.includes('integer') ? Math.trunc(numeric) : numeric
      }
    }
  }
  return value
}

/** JSON Schema 的保留关键字（用于区分「标准 schema」和「DSH 隐式属性表」）。 */
const SCHEMA_KEYWORDS = new Set([
  'type', 'properties', 'required', 'additionalProperties', 'items', 'enum', 'const',
  'description', 'title', 'default', 'format', 'oneOf', 'anyOf', 'allOf', '$ref',
  'minimum', 'maximum', 'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems',
  'uniqueItems', 'nullable', 'deprecated', 'readOnly', 'writeOnly', 'examples', '$schema',
])

/**
 * 是否是普通对象（排除 null / 数组）。
 * @param {unknown} value - 待判定值。
 * @returns {boolean}
 */
function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 归一化一个 schema 节点：把 DSH 方言里的 `required: true`（属性级布尔标注）
 * 折算成对象级的 `required: [...]`。
 * @param {object} node - schema 节点。
 * @returns {object} 归一化后的节点。
 */
function normalizeNode(node) {
  if (!isPlainObject(node)) return node
  const out = { ...node }
  if (out.required === true) delete out.required
  if (isPlainObject(out.properties)) {
    const required = Array.isArray(out.required) ? [...out.required] : []
    const properties = {}
    for (const [key, value] of Object.entries(out.properties)) {
      properties[key] = normalizeNode(value)
      if (isPlainObject(value) && value.required === true) required.push(key)
    }
    out.properties = properties
    out.required = required
  }
  if (isPlainObject(out.items)) out.items = normalizeNode(out.items)
  return out
}

/**
 * 把工具的 `parameters` 归一化成标准 JSON Schema。
 *
 * DSH 有两种方言：
 * 1. **编译后的标准 JSON Schema** —— `defineTool` 构造的工具（pwsh / edit / update_goal …），
 *    形状是 `{ type:'object', properties:{…} }`；
 * 2. **隐式属性表** —— 直接 `ctx.tools.register()` 的工具（todo_write / mcp_gateway …），
 *    形状是 `{ todos: { type:'array', items:{…} } }`，顶层每个 key 就是属性名，
 *    必填性写成属性上的 `required: true` 布尔。
 *
 * 认错方言 = 拿不到属性表 = 修不了（实测 todo_write 就是方言 2）。
 * @param {object} schema - 工具的 parameters。
 * @returns {object | undefined} 标准 JSON Schema；认不出来时返回 undefined。
 */
export function normalizeSchema(schema) {
  if (!isPlainObject(schema)) return undefined
  // 方言 1：已经是标准 JSON Schema。
  if (isPlainObject(schema.properties)) return normalizeNode(schema)
  // 方言 2：隐式属性表。
  const entries = Object.entries(schema).filter(([key, value]) =>
    !SCHEMA_KEYWORDS.has(key) && isPlainObject(value))
  if (entries.length === 0) return undefined
  const properties = {}
  const required = []
  for (const [key, value] of entries) {
    properties[key] = normalizeNode(value)
    if (value.required === true) required.push(key)
  }
  // 顶层不额外收口：DSH 的校验器只在显式 `additionalProperties:false` 时才拦未声明键。
  return { type: 'object', properties, required }
}

/**
 * 递归按 schema 收敛一个节点。对象、数组元素都要走，否则
 * `todos[].id` 这种「元素级 additionalProperties:false」修不到。
 * @param {unknown} value - 当前节点的值（对象会被就地修改）。
 * @param {object} schema - 当前节点的 schema。
 * @param {string} path - 用于记账的可读路径。
 * @param {object[]} repairs - 修复清单（累加）。
 * @returns {unknown} 收敛后的值。
 */
function repairNode(value, schema, path, repairs) {
  if (schema === null || typeof schema !== 'object') return value

  // ── 数组：逐个元素按 items 收敛 ──
  if (Array.isArray(value)) {
    const items = schema.items
    if (items === null || typeof items !== 'object') return value
    for (let index = 0; index < value.length; index++) {
      value[index] = repairNode(value[index], items, `${path}[${index}].`, repairs)
    }
    return value
  }

  // ── 对象 ──
  if (value === null || typeof value !== 'object') return value
  const hasProperties = schema.properties !== null && typeof schema.properties === 'object'
  if (!hasProperties && schema.additionalProperties !== false) return value
  const properties = hasProperties ? schema.properties : {}
  const required = new Set(Array.isArray(schema.required) ? schema.required : [])

  if (schema.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!Object.hasOwn(properties, key)) {
        delete value[key]
        repairs.push({ rule: 'drop-undeclared-arg', detail: `dropped ${path}${key}` })
      }
    }
  }

  for (const key of Object.keys(value)) {
    const prop = properties[key]
    if (prop === undefined) continue
    const before = value[key]
    const coerced = coerceValue(prop, before)
    if (coerced !== before) {
      value[key] = coerced
      repairs.push({ rule: 'coerce-arg-type', detail: `${path}${key}: ${typeof before} -> ${typeof coerced}` })
    }
    value[key] = repairNode(value[key], prop, `${path}${key}.`, repairs)
  }

  for (const key of Object.keys(value)) {
    const current = value[key]
    if ((current === null || current === undefined) && !required.has(key)) {
      delete value[key]
      repairs.push({ rule: 'drop-null-arg', detail: `dropped ${path}${key}` })
    }
  }
  return value
}

/**
 * 按工具 JSON Schema 做通用收敛（递归）：
 * 1. `additionalProperties: false` 时丢掉未声明字段（含数组元素里的）；
 * 2. 把 `"true"` / `"42"` 这类字符串收敛成声明类型；
 * 3. 非必填字段上的 null/undefined 直接丢掉。
 * @param {object} args - 原始参数（会被就地修改）。
 * @param {object} schema - 工具的 JSON Schema（两种方言都行）。
 * @returns {object[]} 修复清单。
 */
export function repairAgainstSchema(args, schema) {
  const repairs = []
  if (args === null || typeof args !== 'object' || Array.isArray(args)) return repairs
  const normalized = normalizeSchema(schema)
  if (normalized === undefined) return repairs
  repairNode(args, normalized, '', repairs)
  return repairs
}

/** 所有规则默认开启。 */
export const ALL_RULES = Object.freeze({
  semantics: true,
  escalation: true,
  schema: true,
})

/**
 * 参数名别名修复：把写错的字段名搬到契约字段名，保留原来的值。
 * 只在「错字段存在 + 目标字段不存在」时改，避免覆盖模型显式给出的意图。
 * @param {string} toolName - 工具名。
 * @param {object} args - 原始参数（会被就地修改）。
 * @returns {object[]} 修复清单。
 */
export function repairArgAliases(toolName, args) {
  const repairs = []
  const map = ARG_ALIASES[toolName]
  if (!map || args === null || typeof args !== 'object' || Array.isArray(args)) return repairs
  for (const [from, to] of Object.entries(map)) {
    if (!Object.hasOwn(args, from)) continue
    if (Object.hasOwn(args, to)) continue
    args[to] = normalizeAliasValue(toolName, from, args[from])
    delete args[from]
    repairs.push({ rule: 'arg-alias', detail: `${toolName}.${from} -> ${to}` })
  }
  return repairs
}

/**
 * PowerShell 的 `@{...}` 修复（审计 P1，bug6401/bug6402 亲历）。
 *
 * 在 PowerShell 里 `@{u}` / `@{...}` 是哈希字面量，双引号内会被展开，
 * `git rev-parse @{u}` 会被当成哈希 → ParserError / hash literal 报错，
 * 白烧一两步。确定性修复：把命令里**未被引号包裹**的 `@{...}` 用单引号包起来
 * （git 的 refspec 正需要单引号，如 `git rev-parse '@{u}'`）。只在 tool === 'pwsh'
 * 且命令含 `@{` 时触发，且只包未加引号的片段，避免破坏已经是 `'@{u}'` 的写法。
 *
 * @param {string} toolName - 工具名。
 * @param {object} args - 原始参数（会被就地修改）。
 * @returns {object[]} 修复清单。
 */
export function repairPwshAtBrace(toolName, args) {
  const repairs = []
  if (toolName !== 'pwsh') return repairs
  const command = args?.command
  if (typeof command !== 'string' || !command.includes('@{')) return repairs
  // 匹配未被单/双引号包裹的 @{...}。命令里已由模型加了引号的不会命中。
  const pattern = /(^|[^\w'"])(@\{[^}]*\})/g
  const next = command.replace(pattern, (m, lead, brace) => `${lead}'${brace}'`)
  if (next !== command) {
    args.command = next
    repairs.push({ rule: 'pwsh-at-brace', detail: 'quoted @{...} for PowerShell (git refspec needs single quotes)' })
  }
  return repairs
}

/**
 * 统一入口：按工具名分派到各条规则，再跑通用 schema 收敛。
 * @param {object} input - 输入。
 * @param {string} input.toolName - 工具名。
 * @param {object} input.args - 原始参数。
 * @param {object} [input.schema] - 工具的 JSON Schema。
 * @param {object} [input.rules] - 规则开关。
 * @returns {{ args: object, repairs: object[] }}
 */
export function repairArguments({ toolName, args, schema, rules = ALL_RULES }) {
  const repairs = []
  if (args === null || typeof args !== 'object' || Array.isArray(args)) {
    return { args, repairs }
  }
  if (rules.semantics === true) {
    if (toolName === 'update_goal') repairs.push(...repairGoalArgs(args))
    if (toolName === 'todo_write') repairs.push(...repairTodoArgs(args))
    repairs.push(...repairArgAliases(toolName, args))
    repairs.push(...repairPwshAtBrace(toolName, args))
  }
  if (rules.escalation === true) repairs.push(...repairEscalationArgs(args, schema))
  if (rules.schema === true) repairs.push(...repairAgainstSchema(args, schema))
  return { args, repairs }
}

/**
 * 规划一次供应商失败后的额外恢复。
 *
 * 内置的 llm-retry 策略是「每会话每 provider 5 次」。预算用完以后
 * provider 的 503/429 会直接变成致命错误、整轮报废。实测单日 38 轮因此终结。
 * 这里在预算之外再给一小段带退避的恢复机会，并且对「额度型 429」保持克制
 * （provider 要求等待超过上限时不再重试，避免把会话挂几个小时）。
 *
 * @param {object} input - 输入。
 * @param {object} input.failure - 失败对象（至少有 code / message）。
 * @param {number} input.attempts - 本轮已经用掉的额外恢复次数。
 * @param {object} input.config - 恢复配置。
 * @param {number} [input.random] - 0..1 的随机数，用于抖动。
 * @returns {{ delayMs: number } | null} 需要恢复时返回等待时长，否则 null。
 */
export function planRecovery({ failure, attempts, config, random = Math.random }) {
  const code = String(failure?.code ?? '').toUpperCase()
  if (!RETRYABLE_CODES.has(code)) return null
  if (attempts >= config.maxExtraRetries) return null

  const providerWaitMs = Number(failure?.providerRetryAfterMs)
  const hasProviderWait = Number.isFinite(providerWaitMs) && providerWaitMs > 0
  if (hasProviderWait && providerWaitMs > config.maxWaitMs) return null
  if (code === 'RATE_LIMIT' && !hasProviderWait && config.rateLimitMaxExtraRetries < config.maxExtraRetries) {
    if (attempts >= config.rateLimitMaxExtraRetries) return null
  }

  const attempt = attempts + 1
  const exponential = Math.min(config.initialDelayMs * 2 ** (attempt - 1), config.maxDelayMs)
  const jitter = 1 - config.jitterRatio + 2 * config.jitterRatio * random()
  let delayMs = Math.min(exponential * jitter, config.maxDelayMs)
  if (hasProviderWait) delayMs = Math.min(providerWaitMs, config.maxDelayMs)
  return { delayMs: Math.max(0, Math.round(delayMs)) }
}
