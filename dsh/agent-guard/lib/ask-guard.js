/**
 * dsh-agent-guard · ask-guard（P0-1：计划确认轮一次问清可预见待定项）
 *
 * 判定链（.plan/p0-hooks-skills-20261113.md 必改1/2/4 伪代码）：
 *   mode==off → 放行
 *   本会话 ask 次数 <2 → 放行
 *   phase(本次) != phase(首 ask) → 放行（跨阶段不拦）
 *   命中高危词表 → 记 ledger(high_risk)，放行（有意设计：高危确认不能被自动化卡死）
 *   missing = 可预见项词表 − 之前已问过的词 −（用户回答已提及项，见下）
 *   本次 ask 命中 missing（在补问上一轮漏问的可预见项）→ 触发（warn 提示 / block 拦截）
 *
 * 即看「上一轮漏了什么」，不看「这一轮问了什么」。合法二次 ask（问新问题，
 * 文本不含 missing 词）天然放行——必改4 用例靠这一点钉住。
 *
 * 边界：guard 只能看到 questions 文本，看不到用户回答；「用户回答已提及项」
 * 无法在此实现，但 warn 只在「本次问句命中 missing 词」时触发，用户新引入的
 * 问题不含这些词，不会误伤。误伤率以 ledger 的 user_bypass 字段统计兜底。
 */

/** 可预见待定项词表（命中 = 应在上一轮一次问清的项）。 */
export const FORESEEABLE_WORDS = Object.freeze(['提交方式', '推送', '是否重建', '重建', '部署', '是否合并', '合并'])

/** 高危词表：命中永不拦截，仅记 ledger。优先级高于可预见词表（部署/发布、推送/强推、合并/生产 重叠词先走这里）。 */
export const HIGH_RISK_WORDS = Object.freeze(['删除', '强推', '发布', '生产', '权限', '费用', '回滚线上', 'force-push'])

/** phase 信号：ask 的 header 字段（同 header = 同阶段）；无 header 视为同一默认阶段。 */
function phaseOf(question) {
  const h = question?.header
  return typeof h === 'string' && h.trim() !== '' ? h.trim() : '__default__'
}

function hitWords(text, words) {
  const hits = []
  if (typeof text !== 'string') return hits
  for (const w of words) if (text.includes(w)) hits.push(w)
  return hits
}

/** questions 里所有文本（含 description）拼成一棵字符串，用于词表匹配。 */
function questionText(args) {
  const parts = []
  const walk = (v) => {
    if (typeof v === 'string') parts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v !== null && typeof v === 'object') Object.values(v).forEach(walk)
  }
  walk(args)
  return parts.join('\n')
}

/**
 * 纯函数判定。
 * @param {object} state - 会话级 ask 状态（{ asks: [{ phase, text }] }），由宿主按 session 持有。
 * @param {object} args - ask_user_question 的 arguments。
 * @param {object} cfg - askGuard 配置（{ mode: 'off'|'warn'|'block' }）。
 * @returns {{ verdict: 'allow'|'warn'|'block', hitWord: string|null, missing: string[], askSeq: number, highRisk: boolean, message?: string }}
 */
export function evaluateAsk(state, args, cfg) {
  const mode = cfg?.mode ?? 'off'
  const text = questionText(args)
  const phase = phaseOf(args?.questions?.[0])

  if (mode === 'off') return { verdict: 'allow', hitWord: null, missing: [], askSeq: state.asks.length + 1, highRisk: false }

  const askSeq = state.asks.length + 1
  const highRisk = hitWords(text, HIGH_RISK_WORDS).length > 0

  // 计数起点 = 本会话第一次 ask，无条件成立（必改2）；<2 次无 prev 可比，放行并记录。
  if (state.asks.length === 0) {
    state.asks.push({ phase, text })
    return { verdict: 'allow', hitWord: null, missing: [], askSeq, highRisk }
  }

  // phase 边界：header 不同 → 跨阶段不拦（首 ask 无 header 时用默认阶段，不硬卡）。
  const first = state.asks[0]
  const prev = [...state.asks].reverse().find((a) => a.phase === phase)
  if (phase !== first.phase && prev === undefined) {
    state.asks.push({ phase, text })
    return { verdict: 'allow', hitWord: null, missing: [], askSeq, highRisk }
  }

  if (highRisk) {
    state.asks.push({ phase, text })
    return { verdict: 'allow', hitWord: null, missing: [], askSeq, highRisk: true }
  }

  // missing = 可预见项词表 − 同 phase 此前问句已覆盖项。
  const covered = prev ? hitWords(prev.text, FORESEEABLE_WORDS) : []
  const missing = FORESEEABLE_WORDS.filter((w) => !covered.includes(w))
  const hitsNow = hitWords(text, FORESEEABLE_WORDS).filter((w) => missing.includes(w))

  state.asks.push({ phase, text })

  if (hitsNow.length === 0) {
    return { verdict: 'allow', hitWord: null, missing, askSeq, highRisk: false }
  }

  const message =
    `ask-guard: 上一轮 ask 漏了可预见待定项 ${hitsNow.join('/')}，本次在补问。` +
    '计划确认轮必须把可预见待定项（提交方式/推送/是否重建）一次问清。'
  return mode === 'block'
    ? { verdict: 'block', hitWord: hitsNow[0], missing, askSeq, highRisk: false, message }
    : { verdict: 'warn', hitWord: hitsNow[0], missing, askSeq, highRisk: false, message }
}
