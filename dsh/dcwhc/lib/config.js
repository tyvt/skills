/**
 * 配置的运行时校验。
 *
 * 这里**故意不依赖** `@deepseek-ai/schemastery`：本插件安装在 profile 之外，
 * 拿不到那个包，写 `import` 会让整行在加载时失败、整个 profile 起不来。
 *
 * cordis 认的是 Standard Schema 协议，也就是对象上有 `~standard.validate()`
 * 返回 `{ value }` 或 `{ issues }`（同步、不能返回 Promise）。所以这里手写一个
 * 只做类型收敛的小实现：够用、零依赖、加载不会炸。
 *
 * @module dsh-channel-wechat-companion/config
 */

/** 默认配置。改这里等于改所有新装用户的初始值。 */
export const DEFAULTS = {
  /** 推到哪个微信用户；空字符串 = 推给扫码登录的账号。 */
  peers: '',
  /** completed / error / aborted 的逗号分隔列表。 */
  notify: 'completed,error',
  /** 正文最大字符数；0 表示不截断。 */
  maxChars: 1200,
  /** 是否把审批卡、提问卡转发到微信。 */
  cards: true,
  /**
   * 同一目标两次推送的最小间隔（毫秒）。
   *
   * 默认 3000 是实测得出的：微信侧对同一 bot 的连续发送很敏感，更短的间隔在
   * 连发几轮之后会换来长时间的 `-2 prepare failed`，而且期间完全发不出去。
   */
  minIntervalMs: 3000,
}

/** 每个字段怎么把任意输入收敛成合法值，外加一句人话的错误。 */
const FIELDS = {
  peers: {
    parse(value) {
      if (typeof value === 'string') return value
      if (Array.isArray(value)) return value.join(',')
      return String(value ?? '')
    },
  },
  notify: {
    parse(value) {
      if (Array.isArray(value)) return value.join(',')
      return String(value ?? '')
    },
  },
  maxChars: {
    parse(value, fallback) {
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 ? Math.floor(number) : fallback
    },
  },
  cards: {
    parse(value, fallback) {
      if (value === true || value === false) return value
      const text = String(value ?? '').trim().toLowerCase()
      if (text === 'true' || text === '1' || text === 'yes') return true
      if (text === 'false' || text === '0' || text === 'no') return false
      return fallback
    },
  },
  minIntervalMs: {
    parse(value, fallback) {
      const number = Number(value)
      return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback
    },
  },
}

/**
 * 校验并补默认值。
 * @param input - 用户在 patch 里写的原始配置。
 * @returns Standard Schema 约定的结果对象。
 */
function validate(input) {
  const source = input === null || input === undefined ? {} : input
  if (typeof source !== 'object' || Array.isArray(source)) {
    return { issues: [{ message: 'channel-wechat-companion: config must be an object' }] }
  }
  const value = {}
  for (const [key, defaults] of Object.entries(DEFAULTS)) {
    const field = FIELDS[key]
    const raw = source[key]
    value[key] = raw === undefined || raw === null ? defaults : field.parse(raw, defaults)
  }
  return { value }
}

/** cordis 会读这个属性；`~standard` 这个名字是 Standard Schema 协议规定的。 */
export const Config = {
  '~standard': {
    version: 1,
    vendor: 'dsh-channel-wechat-companion',
    validate,
  },
}
