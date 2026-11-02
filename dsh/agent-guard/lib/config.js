/**
 * dsh-agent-guard 配置校验。
 *
 * 与 dsh-mcp-gateway 同样的约束：**不 import `@deepseek-ai/*`**。本插件装在
 * profile 之外，import 那些包会让整行加载失败、整个 profile 起不来。
 * cordis 认的是 Standard Schema 协议：对象上有 `~standard.validate()`，
 * 同步返回 `{ value }` 或 `{ issues }`。
 *
 * @module dsh-agent-guard/config
 */

/** 默认配置。 */
export const DEFAULTS = {
  /** 关闭后插件完全不介入，只做记账。 */
  enabled: true,
  /** 工具参数修复。 */
  repair: {
    /** 归一化工具名（模型把 JSON 片段拼进 name）。 */
    toolName: true,
    /** 按工具 JSON Schema 收敛参数（类型、未声明字段、null）。 */
    schema: true,
    /** justification / sandbox_permissions 成对修复。 */
    escalation: true,
    /** update_goal / todo_write 的字段与 action 一致性。 */
    semantics: true,
  },
  /** 供应商失败后的额外恢复（内建 llm-retry 预算之外的补偿）。 */
  recovery: {
    /** 关闭后不再额外重试。 */
    enabled: true,
    /** 单轮内最多额外重试几次。 */
    maxExtraRetries: 3,
    /** 额度型 429（RATE_LIMIT）最多额外重试几次。 */
    rateLimitMaxExtraRetries: 1,
    /** 首次退避时长。 */
    initialDelayMs: 1500,
    /** 退避上限。 */
    maxDelayMs: 20000,
    /** 抖动比例，0.2 表示 ±20%。 */
    jitterRatio: 0.2,
    /** provider 要求等待超过这个时长就不重试（避免会话被挂住几小时）。 */
    maxWaitMs: 120000,
  },
  /** 记账文件（相对 DSH_HOME）。 */
  ledgerPath: 'reports/agent-guard-ledger.jsonl',
  /** 打开后每次工具调用都记一条 inspected，用来验证钩子真的挂上了。 */
  traceCalls: false,
}

function bool(value, fallback) {
  return typeof value === 'boolean' ? value : fallback
}

function nonNegativeInt(value, fallback) {
  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric >= 0 ? Math.floor(numeric) : fallback
}

function positiveInt(value, fallback) {
  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback
}

function ratio(value, fallback) {
  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric >= 0 && numeric <= 1 ? numeric : fallback
}

function text(value, fallback) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback
}

/**
 * 校验并补默认值。
 * @param {unknown} input - 用户在 patch 里写的原始配置。
 * @returns {{ value: object } | { issues: object[] }}
 */
export function validate(input) {
  const source = input === null || input === undefined ? {} : input
  if (typeof source !== 'object' || Array.isArray(source)) {
    return { issues: [{ message: 'agent-guard: config must be an object' }] }
  }
  const repair = source.repair ?? {}
  const recovery = source.recovery ?? {}
  if (typeof repair !== 'object' || Array.isArray(repair)) {
    return { issues: [{ message: 'agent-guard: repair must be an object' }] }
  }
  if (typeof recovery !== 'object' || Array.isArray(recovery)) {
    return { issues: [{ message: 'agent-guard: recovery must be an object' }] }
  }
  return {
    value: {
      enabled: bool(source.enabled, DEFAULTS.enabled),
      repair: {
        toolName: bool(repair.toolName, DEFAULTS.repair.toolName),
        schema: bool(repair.schema, DEFAULTS.repair.schema),
        escalation: bool(repair.escalation, DEFAULTS.repair.escalation),
        semantics: bool(repair.semantics, DEFAULTS.repair.semantics),
      },
      recovery: {
        enabled: bool(recovery.enabled, DEFAULTS.recovery.enabled),
        maxExtraRetries: nonNegativeInt(recovery.maxExtraRetries, DEFAULTS.recovery.maxExtraRetries),
        rateLimitMaxExtraRetries: nonNegativeInt(recovery.rateLimitMaxExtraRetries, DEFAULTS.recovery.rateLimitMaxExtraRetries),
        initialDelayMs: positiveInt(recovery.initialDelayMs, DEFAULTS.recovery.initialDelayMs),
        maxDelayMs: positiveInt(recovery.maxDelayMs, DEFAULTS.recovery.maxDelayMs),
        jitterRatio: ratio(recovery.jitterRatio, DEFAULTS.recovery.jitterRatio),
        maxWaitMs: positiveInt(recovery.maxWaitMs, DEFAULTS.recovery.maxWaitMs),
      },
      ledgerPath: text(source.ledgerPath, DEFAULTS.ledgerPath),
      traceCalls: bool(source.traceCalls, DEFAULTS.traceCalls),
    },
  }
}

/** cordis 会读这个属性；`~standard` 是 Standard Schema 协议规定的名字。 */
export const Config = {
  '~standard': {
    version: 1,
    vendor: 'dsh-agent-guard',
    validate,
  },
}
