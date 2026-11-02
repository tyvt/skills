import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { readFeishuState, updateFeishuState } from './feishu-state.mjs'
import { sendFeishuFile } from './feishu-files.mjs'
import { sendFeishu, appToken, updateCard } from './feishu.mjs'

// 卡片正文上限：超过就先补一条文字消息，再发精简卡，避免飞书拒收超长卡片。
const CARD_TEXT_LIMIT = 12000
// 单张卡片的按钮上限。
const MAX_CARD_BUTTONS = 5
// 提问等待作答的上限。
const QUESTION_TIMEOUT_MS = 30 * 60 * 1000
// 长连接未就绪时，最多等这么久再决定推正常卡还是降级卡。
const CONNECT_WAIT_MS = 5000
const CONNECT_POLL_MS = 50
// ask_user_question 默认 120 秒超时后，卡片仍可作答；迟回窗口给到 12 小时。
const LATE_WINDOW_MS = 12 * 60 * 60 * 1000
const LATE_NOTE = '（已超过 120 秒，仍可作答；提交后会作为迟回补进会话）'

export function parseAnswers(questions, input) {
  const parts = String(input).split(';').map((part) => part.trim())
  if (parts.length !== questions.length) throw new Error(`请按题目顺序回答 ${questions.length} 题，各题用英文分号分隔。`)
  return { answers: questions.map((question, index) => {
    const text = parts[index]
    if (!text) throw new Error('答案不能为空。')
    const options = question.options || []
    const tokens = text.split(/[,，\s]+/).filter(Boolean)
    const numeric = tokens.every((part) => /^\d+$/.test(part))
    if (options.length && numeric) {
      const indices = [...new Set(tokens.map(Number))]
      if (indices.some((n) => n < 1 || n > options.length)) throw new Error('选项编号超出范围。')
      if (!question.multiSelect && indices.length !== 1) throw new Error('该题只允许选择一项。')
      return { id: question.id, selected: indices.map((n) => options[n - 1].label) }
    }
    return { id: question.id, selected: [], custom: text }
  }) }
}

export function parseFeishuContent(message) {
  let content
  try { content = JSON.parse(message.content || '{}') } catch { throw new Error('消息内容不是有效 JSON。') }
  const type = message.message_type
  if (type === 'text') return { text: String(content.text || '').replace(/@_user_\d+/g, '').trim(), media: [] }
  if (type === 'post') {
    const post = content.content ? content : Object.values(content).find((value) => value?.content) || {}
    const text = [post.title || '']
    const media = []
    for (const row of post.content || []) {
      const line = []
      for (const item of row) {
        if (item.tag === 'img') media.push({ key: item.image_key, kind: 'image', name: 'image' })
        else if (item.text) line.push(item.text)
        else if (item.href) line.push(item.href)
      }
      text.push(line.join(''))
    }
    return { text: text.join('\n').trim(), media }
  }
  if (['image', 'file', 'audio', 'media', 'sticker'].includes(type)) {
    return { text: content.file_name || `收到飞书${type}消息`, media: [{ key: type === 'image' || type === 'sticker' ? content.image_key || content.file_key : content.file_key,
      kind: type === 'image' || type === 'sticker' ? 'image' : 'file', name: content.file_name || `${type}-${message.message_id}` }] }
  }
  if (type === 'interactive') return { text: `分享的飞书卡片内容：\n${JSON.stringify(content)}`, media: [] }
  if (type === 'location') return { text: `位置：${content.name || ''} ${content.address || ''} (${content.latitude}, ${content.longitude})`, media: [] }
  if (type === 'share_chat') return { text: `分享的群聊：${content.chat_id || ''}`, media: [] }
  if (type === 'share_user') return { text: `分享的联系人：${content.user_id || ''}`, media: [] }
  throw new Error(`当前消息类型 ${type} 无法直接读取，请转发为文字、图片或文件。`)
}

function imageType(bytes) {
  if (bytes.subarray(0, 4).equals(Buffer.from([137, 80, 78, 71]))) return 'image/png'
  if (bytes[0] === 255 && bytes[1] === 216) return 'image/jpeg'
  if (bytes.subarray(0, 3).toString() === 'GIF') return 'image/gif'
  if (bytes.subarray(8, 12).toString() === 'WEBP') return 'image/webp'
  throw new Error('不支持的图片格式。')
}

export function createFeishuBridge({ ctx, bus, config, createUserMessage: suppliedFactory }) {
  // 父请求：approval 一条，question 一条（含 N 个子题）。
  const pending = new Map()
  // 子题：子ID（<父ID>-<i>）→ 子条目。卡片按钮和文字作答都查这里。
  const pendingQuestions = new Map()
  const inFlight = new Set()
  const handles = new Map()
  let ws
  let connected = false
  let disposed = false
  let serial = Promise.resolve()
  let factory = suppliedFactory
  const send = (text, metadata) => sendFeishu(text, config, metadata)
  const idOf = (agent) => String(agent.id || agent.session.id)
  const registry = () => ctx.get('agents')
  const roots = () => registry()?.roots() || []
  // 放宽：子代理 / teammate 的提问也要能推卡。只要求有 agent 和 session.id。
  const eligible = (req) => Boolean(req?.agent?.session?.id)
  const authorized = (event) => config.receiveIdType === 'open_id' && event.sender?.sender_id?.open_id === config.receiveId && event.message?.chat_type === 'p2p'
  // 日志本身不能反过来打断作答流程。
  const log = (level, message, detail) => {
    try { bus.log(level, message, detail) } catch { /* 日志失败不能影响主流程 */ }
  }
  const describeError = (error) => String(error?.message || error)
  const findEntry = (id) => [...pending.values()].find((entry) => entry.id.toLowerCase() === String(id).toLowerCase())
  const findSub = (id) => [...pendingQuestions.values()].find((sub) => sub.id.toLowerCase() === String(id).toLowerCase())
  const pendingList = () => [
    ...[...pending.values()].map((entry) => ({ id: entry.id, kind: entry.kind, sessionId: entry.sessionId })),
    ...[...pendingQuestions.values()].map((sub) => ({ id: sub.id, kind: sub.kind, sessionId: sub.sessionId })),
  ]

  // 长连接没就绪时最多等 limit 毫秒；期间一旦就绪立刻返回，避免白等。
  function waitForConnected(limit = CONNECT_WAIT_MS) {
    if (connected && !disposed) return Promise.resolve(true)
    const deadline = Date.now() + limit
    return new Promise((resolve) => {
      const tick = () => {
        if (disposed) return resolve(false)
        if (connected) return resolve(true)
        if (Date.now() >= deadline) return resolve(false)
        setTimeout(tick, CONNECT_POLL_MS)
      }
      setTimeout(tick, CONNECT_POLL_MS)
    })
  }

  function questionLines(sub, total) {
    const question = sub.question || {}
    const options = question.options || []
    const lines = [`【需要你回答 ${sub.id}】`]
    lines.push(total > 1 ? `第 ${sub.index + 1}/${total} 题：${question.question || ''}` : `1. ${question.question || ''}`)
    if (question.detail) lines.push(String(question.detail))
    options.forEach((option, n) => lines.push(`  ${n + 1}. ${option.label}${option.description ? `：${option.description}` : ''}`))
    if (question.multiSelect && options.length) lines.push(`多选：回复 ${sub.id} 1,3 这样的编号（逗号分隔）。`)
    // 每张卡底部统一提示：编号之外还能直接写自定义文字。
    lines.push(`回复 ${sub.id} 加答案：选项用编号，多选用逗号；也可直接填写文字答案。`)
    lines.push(`会话 ${sub.sessionId}`)
    return lines
  }

  function questionChoices(sub) {
    const options = sub.question?.options || []
    // 多选必须靠文字编号（逗号分隔），不渲染按钮。
    if (!options.length || sub.question?.multiSelect) return []
    return options.slice(0, MAX_CARD_BUTTONS).map((option) => ({ label: option.label, pendingId: sub.id }))
  }

  // 飞书卡片的 markdown 模块不渲染表格，这里把正文里的 Markdown 表格块解析成
  // 飞书 JSON 2.0 原生 table 组件（单元格用 lark_md，可渲染加粗/链接/行内代码）。
  // 要求飞书客户端 >= V7.4；普通文本仍走 markdown 模块。
  const TABLE_SEP_RE = /^\s*\|?[\s:\-|]+\|?\s*$/

  function isTableSeparator(line) {
    return TABLE_SEP_RE.test(line) && line.includes('-')
  }

  function splitTableRow(line) {
    let s = String(line).trim()
    if (s.startsWith('|')) s = s.slice(1)
    if (s.endsWith('|')) s = s.slice(0, -1)
    return s.split('|').map((cell) => cell.trim())
  }

  // 从 lines[i]（分隔线）回溯识别一个 Markdown 表格，返回 { headCells, rows, endIdx } 或 null。
  function detectMarkdownTable(lines, i) {
    if (i < 1) return null
    const header = lines[i - 1]
    if (!header.includes('|')) return null
    if (!isTableSeparator(lines[i])) return null
    const headCells = splitTableRow(header)
    const sepCells = splitTableRow(lines[i])
    if (headCells.length < 1 || headCells.length !== sepCells.length) return null
    const rows = []
    let j = i + 1
    while (j < lines.length && lines[j].includes('|')) {
      const cells = splitTableRow(lines[j])
      if (cells.length !== headCells.length) break
      rows.push(cells)
      j += 1
    }
    if (!rows.length) return null
    return { headCells, rows, endIdx: j }
  }

  // 飞书 1.0 卡片没有原生表格组件（2.0 表格在 im 接口下字段不稳定、且需客户端 ≥ V7.4），
  // 飞书交互卡 2.0 原生表格：columns 用 {name,width}，rows 按列名做 key，单元格为 {text:{tag,content}}。
  // 要求客户端 ≥ V7.4，旧客户端整张卡会降级成「请升级至最新版本客户端」提示（见 assembleCard 的 2.0 包裹逻辑）。
  function tableCellTag(content) {
    return /\*\*|`|\[.+?\]\(/.test(content) ? 'lark_md' : 'plain_text'
  }
  function buildTableElement({ headCells, rows }) {
    const columns = headCells.map((cell) => ({ name: String(cell).trim(), width: 'auto' }))
    const dataRows = rows.map((cells) => {
      const row = {}
      headCells.forEach((h, idx) => {
        const value = String(cells[idx] ?? '').trim()
        row[h.trim()] = { text: { tag: tableCellTag(value), content: value } }
      })
      return row
    })
    return { tag: 'table', columns, rows: dataRows }
  }

  // 把正文拆成「lark_md 文本段」与「代码块表格」交错的元素数组。
  function buildCardElements(text) {
    const lines = String(text).split('\n')
    const elements = []
    const flush = (from, to) => {
      const seg = lines.slice(from, to).join('\n').trim()
      if (!seg) return
      // 飞书 lark_md 不支持 # 标题语法，把 Markdown 标题降级为加粗，所有客户端都能稳定显示。
      const md = seg.replace(/^(#{1,6})\s+(.+?)\s*$/gm, '**$2**')
      elements.push({ tag: 'div', text: { tag: 'lark_md', content: md } })
    }
    let start = 0
    let i = 0
    while (i < lines.length) {
      if (isTableSeparator(lines[i])) {
        const tbl = detectMarkdownTable(lines, i)
        if (tbl) {
          flush(start, i - 1)
          elements.push(buildTableElement(tbl))
          i = tbl.endIdx
          start = i
          continue
        }
      }
      i += 1
    }
    flush(start, lines.length)
    return elements
  }

  // 组装最终卡片：含表格时升级为 Card JSON 2.0（schema+body 包裹），否则保持 1.0（根级 elements）。
  // 2.0 表格需客户端 ≥ V7.4，旧客户端整张卡会降级为「请升级至最新版本客户端」提示。
  function assembleCard(elements, title) {
    const card = { config: { wide_screen_mode: true } }
    if (title) card.header = { title: { tag: 'plain_text', content: String(title).slice(0, 120) } }
    if (elements.some((el) => el.tag === 'table')) {
      card.schema = '2.0'
      card.body = { elements }
    } else {
      card.elements = elements
    }
    return card
  }

  function buildActions(choices, kind) {
    if (!choices.length) return null
    return {
      tag: 'action',
      actions: choices.slice(0, MAX_CARD_BUTTONS).map((choice, index) => ({
        tag: 'button',
        text: { tag: 'plain_text', content: String(choice.label).slice(0, 60) },
        type: kind === 'approval' && index === 0 ? 'primary' : 'default',
        value: { pending_id: choice.pendingId, input: String(index + 1) },
      })),
    }
  }

  async function sendCard(entry, { title, lines, choices = [], kind, sub } = {}) {
    const body = lines.filter(Boolean)
    const fullText = body.join('\n')
    // 记下本次卡片正文/标题，点击后 handleAction 用它就地回传「已提交」替换卡（让 PC 卡片收起、手机端不再报「操作失败」）。
    const store = sub || entry
    if (store) { store.__cardText = fullText; store.__cardTitle = title }
    const action = buildActions(choices, kind)
    let elements = buildCardElements(fullText)
    const textLen = elements
      .filter((el) => el.tag === 'div')
      .reduce((sum, el) => sum + (el.text?.content?.length || 0), 0)
    if (textLen > CARD_TEXT_LIMIT) {
      // 超长：先补一条文字消息发完整内容，卡片正文精简，避免飞书拒收超长卡片。
      elements = buildCardElements(`${body[0]}\n完整内容已在前面的文字消息中发送。\n${body.at(-1)}`)
      await send(fullText, { sessionId: entry.sessionId })
    }
    if (action) elements.push(action)
    const card = assembleCard(elements, title)
    await send(fullText, { sessionId: entry.sessionId, card })
  }

  // 点击回执：用一张「已提交」卡片就地替换原交互卡。
  // 旧版交互卡 card.action.trigger 回调只回 toast 时，PC 卡片不会收起、手机端会报「操作失败」；
  // 回传替换卡片可让两端都把按钮去掉并就地显示提交结果（SDK 会把返回值编码进长连接回包）。
  function buildConfirmCard(target, selectedLabel) {
    const text = String(target?.__cardText || '').slice(0, CARD_TEXT_LIMIT)
    const title = target?.__cardTitle
    const note = `✅ 已提交${selectedLabel ? `：${selectedLabel}` : ''}`
    const content = text ? `${text}\n\n${note}` : note
    const elements = buildCardElements(content)
    return assembleCard(elements, title)
  }

  async function deliverApproval(entry) {
    // 先让出一拍：调用方（网页提问）不该等卡片发完。
    await Promise.resolve()
    if (!pending.has(entry.id)) { log('info', '飞书审批卡已失效，跳过发送', { id: entry.id }); return }
    const req = entry.req
    const lines = [`【需要审批 ${entry.id}】`, `工具：${req.toolName || ''}`, req.reason || req.displayReason?.zh || '',
      `回复 ${entry.id} 1 放行一次；${entry.id} 2 拒绝。`, `会话 ${entry.sessionId}`]
    try {
      await sendCard(entry, { lines, choices: [{ label: '放行一次', pendingId: entry.id }, { label: '拒绝', pendingId: entry.id }], kind: 'approval' })
      log('info', '飞书交互卡已发送', { kind: 'approval', id: entry.id, sessionId: entry.sessionId })
    } catch (error) {
      log('error', '飞书审批卡发送失败，网页仍可作答', { id: entry.id, sessionId: entry.sessionId, error: describeError(error) })
    }
  }

  async function sendUnavailableCard(entry) {
    const total = entry.subs.length
    const lines = [`【暂时无法作答 ${entry.id}】`, '飞书长连接当前未就绪，这张卡片暂时无法作答，请在网页作答。']
    entry.subs.forEach((sub) => {
      const options = sub.question?.options || []
      lines.push(`${total > 1 ? `第 ${sub.index + 1}/${total} 题（${sub.id}）：` : ''}${sub.question?.question || ''}`)
      if (sub.question?.detail) lines.push(String(sub.question.detail))
      options.forEach((option, n) => lines.push(`  ${n + 1}. ${option.label}`))
    })
    lines.push(`连接恢复后仍可文字作答：回复 ${entry.subs.map((sub) => sub.id).join(' 或 ')} 加答案。`)
    lines.push(`会话 ${entry.sessionId}`)
    await sendCard(entry, { title: '暂时无法作答，请在网页作答', lines, choices: [], kind: 'question' })
  }

  async function deliverQuestions(entry) {
    const total = entry.subs.length
    const ready = await waitForConnected()
    if (!pending.has(entry.id)) { log('info', '飞书提问已结束，跳过卡片发送', { id: entry.id }); return }
    if (!ready) {
      log('error', '飞书长连接未就绪，改发降级卡片', { id: entry.id, sessionId: entry.sessionId, waitedMs: CONNECT_WAIT_MS, total })
      try {
        await sendUnavailableCard(entry)
        log('info', '飞书降级卡片已发送', { id: entry.id, sessionId: entry.sessionId })
      } catch (error) {
        log('error', '飞书降级卡片发送失败，网页仍可作答', { id: entry.id, sessionId: entry.sessionId, error: describeError(error) })
      }
      return
    }
    // 一题一卡：逐张发送，单张失败只记日志，不影响其余题目和网页作答。
    for (const sub of entry.subs) {
      if (!pendingQuestions.has(sub.id)) { log('info', '飞书子题已结束，跳过卡片发送', { id: sub.id }); continue }
      await pushQuestionCard(entry, sub)
    }
  }

  // 单张提问卡：note 用于迟回重发时在正文首行加提示。
  async function pushQuestionCard(entry, sub, note) {
    const total = entry.subs.length
    try {
      await sendCard(entry, {
        title: total > 1 ? `第 ${sub.index + 1}/${total} 题 · ${sub.id}` : undefined,
        lines: note ? [note, ...questionLines(sub, total)] : questionLines(sub, total),
        choices: questionChoices(sub), kind: 'question', sub,
      })
      log('info', '飞书交互卡已发送', { kind: 'question', id: sub.id, index: sub.index + 1, total, sessionId: entry.sessionId, late: Boolean(note) })
    } catch (error) {
      log('error', '飞书提问卡发送失败，网页仍可作答', { id: sub.id, index: sub.index + 1, total, sessionId: entry.sessionId, late: Boolean(note), error: describeError(error) })
    }
  }

  // 迟回模式：给尚未作答的子题重发卡片，卡片仍可点击/文字作答。
  async function resendLateCards(entry) {
    const total = entry.subs.length
    for (const sub of entry.subs) {
      if (sub.answered || !pendingQuestions.has(sub.id)) continue
      await pushQuestionCard(entry, sub, LATE_NOTE)
    }
    log('info', '飞书迟回卡片已重发', { id: entry.id, total, sessionId: entry.sessionId })
  }

  // 迟回提交：通过 host 的 userQuestions.answer() 把完整答案批次补进会话。
  // 把完整答案批次通过 host 的 userQuestions.answer() 补进会话：既让 agent 收到答案，也通过
  // user-question-reply 闭合网页 ask_user_question 面板。普通（未超时）模式与迟回模式共用。
  // 返回分类结果，由调用方决定是否回执文案。service.answer 可能抛 DELEGATED_CALLER / CALLER_NOT_LIVE
  // / REPLY_QUEUED / BAD_ANSWER，或返回 false（问题已关闭）。
  async function routeAnswerToHost(entry, answers) {
    const callId = entry.callId
    const service = ctx.get('userQuestions')
    if (!service || typeof service.answer !== 'function') return { outcome: 'no-service' }
    const batch = answers.map((item) => (item?.custom === undefined
      ? { id: item?.id, selected: item?.selected ?? [] }
      : { id: item.id, selected: item.selected ?? [], custom: item.custom }))
    try {
      const accepted = await service.answer(entry.agent, callId, { answers: batch })
      return { outcome: accepted === false ? 'closed' : 'accepted' }
    } catch (error) {
      const code = String(error?.code || '')
      const outcome = code === 'REPLY_QUEUED' ? 'queued'
        : code === 'CALLER_NOT_LIVE' || code === 'DELEGATED_CALLER' ? 'not-live'
        : code === 'BAD_ANSWER' ? 'bad-answer'
        : 'error'
      return { outcome, code, error }
    }
  }

  async function submitLate(entry, answers) {
    const result = await routeAnswerToHost(entry, answers)
    const base = { id: entry.id, callId: entry.callId, sessionId: entry.sessionId }
    switch (result.outcome) {
      case 'accepted':
        log('info', '飞书迟回答案已提交', base)
        await send('已作为迟回提交，会在下一步被采纳。', { sessionId: entry.sessionId })
        return
      case 'no-service':
        log('error', '飞书迟回通道不可用，请在网页作答', base)
        await send('迟回通道不可用，请在网页作答。', { sessionId: entry.sessionId })
        return
      case 'closed':
        log('error', '飞书迟回提交被拒绝：问题已关闭', base)
        await send('该问题已关闭，无法迟回。', { sessionId: entry.sessionId })
        return
      case 'queued':
        log('error', '飞书迟回提交失败：已有回复排队', { ...base, code: result.code })
        await send('已有一条回复在排队，稍后自动生效。', { sessionId: entry.sessionId })
        return
      case 'not-live':
        log('error', '飞书迟回提交失败：会话已结束或已移交', { ...base, code: result.code })
        await send('该会话已结束或已移交，请在网页作答。', { sessionId: entry.sessionId })
        return
      case 'bad-answer':
        log('error', '飞书迟回答案批次不合法', { ...base, code: result.code })
        await send('迟回答案格式不合法，请在网页作答。', { sessionId: entry.sessionId })
        return
      default:
        log('error', '飞书迟回提交失败', { ...base, code: result.code, error: describeError(result.error) })
        await send(`迟回提交失败：${describeError(result.error)}`, { sessionId: entry.sessionId })
    }
  }

  // 超时（ASK_TIMED_OUT）而不是取消：保留待办，转入迟回模式。
  function enterLateMode(entry) {
    const req = entry.req
    entry.late = true
    entry.callId = String(req.wait.callId)
    entry.agent = req.agent
    clearTimeout(entry.timer)
    entry.timer = setTimeout(() => {
      const unanswered = entry.subs.filter((sub) => !sub.answered).map((sub) => sub.id)
      log('error', '飞书迟回窗口结束，仍未答完，已清理', { id: entry.id, callId: entry.callId, sessionId: entry.sessionId, unanswered })
      entry.settle(undefined, new Error('飞书提问迟回窗口已结束。'))
    }, LATE_WINDOW_MS)
    entry.timer.unref?.()
    log('info', '飞书提问已超时，转入迟回模式（卡片仍可作答）', {
      id: entry.id, callId: entry.callId, sessionId: entry.sessionId,
      total: entry.subs.length, unanswered: entry.subs.filter((sub) => !sub.answered).map((sub) => sub.id),
    })
    void resendLateCards(entry).catch((error) => log('error', '飞书迟回卡片重发失败', { id: entry.id, callId: entry.callId, error: describeError(error) }))
  }

  function offer(kind, req, next) {
    const sessionId = req?.agent?.session?.id ? String(req.agent.session.id) : undefined
    log('info', '飞书交互请求检查', { kind, connected, hasAgent: Boolean(req?.agent), sessionId, eligible: eligible(req) })
    if (disposed) { log('info', '飞书通道已卸载，交互只在网页作答', { kind, sessionId }); return next() }
    if (!eligible(req)) { log('info', '飞书交互请求缺少 agent 或 session.id，只在网页作答', { kind, hasAgent: Boolean(req?.agent) }); return next() }
    // 审批保持原行为：长连接没就绪就不推卡，直接交给网页。
    if (kind === 'approval' && !connected) { log('info', '飞书长连接未就绪，审批只在网页作答', { kind, sessionId }); return next() }
    const id = `${kind === 'approval' ? 'A' : 'Q'}${randomUUID().slice(0, 8)}`
    let finish
    let fail
    const answer = new Promise((resolve, reject) => { finish = resolve; fail = reject })
    const entry = { id, kind, req, sessionId, finish, fail, agent: req.agent, wait: req.wait }
    // 普通（未超时）模式下也要补进 host 会话，需要 callId；迟回模式在 enterLateMode 里再赋值一次。
    entry.callId = req.wait?.callId ? String(req.wait.callId) : undefined
    if (kind === 'question') {
      const questions = Array.isArray(req.questions) ? req.questions : []
      entry.questions = questions
      entry.answers = new Array(questions.length)
      // 子ID 规则：<父ID>-<i>，i 从 1 开始。
      entry.subs = questions.map((question, index) => ({ id: `${id}-${index + 1}`, index, kind: 'question', sessionId, question, parent: entry, answered: false }))
    } else entry.subs = []
    const cleanup = () => {
      pending.delete(id)
      clearTimeout(entry.timer)
      for (const sub of entry.subs) pendingQuestions.delete(sub.id)
      req.signal?.removeEventListener('abort', abort)
    }
    entry.settle = (value, error) => {
      if (!pending.has(id)) return false
      cleanup()
      // 迟回模式：原 promise 早已被 host 废弃，答案改走 userQuestions.answer() 补进会话。
      if (entry.late) {
        if (entry.answeredByFeishu && value?.answers?.length) {
          void submitLate(entry, value.answers).catch((failure) => log('error', '飞书迟回提交异常', { id, callId: entry.callId, sessionId, error: describeError(failure) }))
        } else {
          log('info', '飞书迟回模式结束，未提交答案', { id, callId: entry.callId, sessionId })
        }
        return true
      }
      // 普通（未超时）模式：host 的 ask 瀑布被 noAnswerer 拒绝，飞书答案没有回流到 agent，
      // 网页 ask_user_question 面板也不会闭合。这里补一句 userQuestions.answer() 把答案 steer 进会话：
      // 既让 agent 收到答案，也通过 user-question-reply 闭合网页卡片。
      // 子代理（非根 agent）的 userQuestions.answer 会被 DELEGATED_CALLER 拒绝，因此保持原结算行为。
      const agentsService = ctx.get('agents')
      const isRoot = Boolean(agentsService && typeof agentsService.roots === 'function' && agentsService.roots().includes(entry.agent))
      if (kind === 'question' && isRoot && value?.answers?.length) {
        // 必须先经 host 的 userQuestions.answer() 把答案 steer 进会话并闭合网页面板，
        // 再 finish(value) 收尾 ask 瀑布。若反过来（先 finish），host 的 askTimed 收尾会
        // 让该问题离开 “continued” 状态，answer() 找不到该问题而返回 false —— 面板永不闭合。
        void routeAnswerToHost(entry, value.answers)
          .then((result) => {
            if (result.outcome === 'closed') {
              log('info', '飞书作答但网页已关闭该问题', { id, callId: entry.callId, sessionId })
              void send('该问题已在网页作答或关闭。', { sessionId: entry.sessionId })
            } else if (result.outcome !== 'accepted') {
              log('error', '飞书作答补交失败', { id, callId: entry.callId, sessionId, outcome: result.outcome, code: result.code })
              void send('作答已记录，但同步到网页失败，稍后可能重复处理。', { sessionId: entry.sessionId })
            }
            finish(value)
          })
          .catch((failure) => {
            log('error', '飞书作答补交异常', { id, callId: entry.callId, sessionId, error: describeError(failure) })
            finish(value)
          })
        return true
      }
      error ? fail(error) : finish(value)
      return true
    }
    const abort = () => {
      // 只有 host 的 120 秒超时（ASK_TIMED_OUT）才进入迟回模式；用户取消/turn 中止照旧清理。
      const timedOut = req.signal?.reason?.code === 'ASK_TIMED_OUT'
      const canLate = timedOut && kind === 'question' && req.wait?.timed === true && Boolean(req.wait?.callId) && Boolean(req.agent)
      if (canLate && pending.has(id)) {
        log('info', '飞书提问超时但仍可迟回', { kind, id, callId: String(req.wait.callId), sessionId })
        enterLateMode(entry)
        return
      }
      log('info', '飞书交互已取消', { kind, id, sessionId, reason: String(req.signal?.reason?.code ?? req.signal?.reason?.name ?? '') })
      entry.settle(kind === 'approval' ? 'cancelled' : undefined, kind === 'question' ? new Error('提问已取消。') : undefined)
    }
    pending.set(id, entry)
    for (const sub of entry.subs) pendingQuestions.set(sub.id, sub)
    entry.timer = setTimeout(() => {
      log('error', '飞书交互等待超时，已自动结束', { kind, id, sessionId, unanswered: entry.subs.filter((sub) => !sub.answered).map((sub) => sub.id) })
      entry.settle(kind === 'approval' ? 'unavailable' : undefined, kind === 'question' ? new Error('飞书提问已超时。') : undefined)
    }, QUESTION_TIMEOUT_MS)
    entry.timer.unref?.()
    req.signal?.addEventListener('abort', abort, { once: true })
    if (req.signal?.aborted) abort()
    // 网页通道先走：卡片发送失败或长连接未就绪都不能扣住请求。
    Promise.resolve().then(next).then((value) => entry.settle(value), () => {})
    void (kind === 'approval' ? deliverApproval(entry) : deliverQuestions(entry)).catch((error) => {
      log('error', '飞书交互卡投递异常，网页仍可作答', { kind, id, sessionId, error: describeError(error) })
    })
    return answer
  }

  // 子题作答：解析 → 记入对应下标 → 立刻回执；N 题全答完才结算父请求。
  async function answerSub(sub, input) {
    const parent = sub.parent
    const total = parent.subs.length
    if (!pendingQuestions.has(sub.id)) {
      log('info', '飞书子题已结束，忽略作答', { id: sub.id })
      await send('这道题已经答过了，或已失效。', { sessionId: sub.sessionId })
      return
    }
    let parsed
    try {
      parsed = parseAnswers([sub.question || {}], input)
    } catch (error) {
      log('error', '飞书作答解析失败', { id: sub.id, index: sub.index + 1, total, input: String(input ?? '').slice(0, 200), error: error.message })
      await send(`第 ${sub.index + 1}/${total} 题作答无法识别：${error.message}`, { sessionId: sub.sessionId })
      return
    }
    sub.answered = true
    pendingQuestions.delete(sub.id)
    parent.answers[sub.index] = parsed.answers[0]
    const remaining = parent.subs.filter((item) => !item.answered)
    let accepted = false
    if (remaining.length === 0) {
      parent.answeredByFeishu = true
      accepted = parent.settle({ answers: parent.answers.slice() })
    }
    log('info', '飞书子题已记录', { id: sub.id, index: sub.index + 1, total, remaining: remaining.length, settled: accepted, late: Boolean(parent.late), sessionId: sub.sessionId })
    if (remaining.length > 0) {
      await send(`第 ${sub.index + 1}/${total} 题已记录，还差 ${remaining.length} 题。`, { sessionId: sub.sessionId })
      return
    }
    // 迟回模式下 submitLate 会回自己的回执文案。
    if (parent.late) return
    await send(accepted ? `全部 ${total} 题已记录，正在继续。` : '这张交互卡已被处理。', { sessionId: sub.sessionId })
  }

  // 用父 ID 作答：审批走原有逻辑；单题落到唯一子题；多题走 parseAnswers 一次答完。
  async function answerByParentId(entry, input) {
    const text = String(input ?? '').trim()
    if (entry.kind === 'approval') {
      const result = ['1', '允许', '放行一次'].includes(text) ? 'allowed-once' : ['2', '拒绝'].includes(text) ? 'rejected' : undefined
      if (result === undefined) {
        log('error', '飞书审批作答无法识别', { id: entry.id, input: text.slice(0, 100) })
        await send(`请回复 ${entry.id} 1 或 ${entry.id} 2。`, { sessionId: entry.sessionId })
        return true
      }
      const accepted = entry.settle(result)
      if (!accepted) {
        log('info', '飞书审批卡已被处理', { id: entry.id, sessionId: entry.sessionId })
        await send('这张交互卡已被处理。', { sessionId: entry.sessionId })
        return true
      }
      log('info', '飞书交互回答已采用', { kind: 'approval', id: entry.id, sessionId: entry.sessionId })
      await send('已收到，正在继续。', { sessionId: entry.sessionId })
      return true
    }
    const total = entry.subs.length
    if (total <= 1) {
      const sub = entry.subs[0]
      if (!sub) { await send('这张交互卡已结束或失效。', { sessionId: entry.sessionId }); return true }
      await answerSub(sub, text)
      return true
    }
    let parsed
    try {
      parsed = parseAnswers(entry.questions, input)
    } catch (error) {
      log('error', '飞书作答解析失败', { id: entry.id, total, input: text.slice(0, 200), error: error.message })
      await send(`本次共 ${total} 题，需要一次性作答：${error.message}`, { sessionId: entry.sessionId })
      return true
    }
    entry.subs.forEach((sub, index) => {
      sub.answered = true
      pendingQuestions.delete(sub.id)
      entry.answers[index] = parsed.answers[index]
    })
    entry.answeredByFeishu = true
    const accepted = entry.settle({ answers: parsed.answers.slice() })
    log('info', '飞书全部子题已一次性作答', { id: entry.id, total, settled: accepted, late: Boolean(entry.late), sessionId: entry.sessionId })
    if (entry.late) return true
    await send(accepted ? `全部 ${total} 题已记录，正在继续。` : '这张交互卡已被处理。', { sessionId: entry.sessionId })
    return true
  }

  async function answerText(text, routedSessionId) {
    const trimmed = String(text ?? '').trim()
    const subMatch = /^([AQ][a-f\d]{8}-\d+)\s+([\s\S]+)$/i.exec(trimmed)
    if (subMatch) {
      const sub = findSub(subMatch[1])
      if (!sub) {
        const base = subMatch[1].replace(/-\d+$/, '')
        log('info', '飞书作答：子题 ID 未知或已失效', { pendingId: subMatch[1], basePending: base, baseAlive: Boolean(findEntry(base)) })
        await send(findEntry(base) ? '这道题已经答过了，或已失效。' : '这张交互卡已结束或失效，请勿重复作答。')
        return true
      }
      await answerSub(sub, subMatch[2])
      return true
    }
    const parentMatch = /^([AQ][a-f\d]{8})\s+([\s\S]+)$/i.exec(trimmed)
    if (parentMatch) {
      const entry = findEntry(parentMatch[1])
      if (!entry) {
        log('info', '飞书作答：父卡 ID 未知或已失效', { pendingId: parentMatch[1] })
        await send('这张交互卡已结束或失效，请勿重复作答。')
        return true
      }
      return answerByParentId(entry, parentMatch[2])
    }
    // 裸文字：当且仅当只剩一题待答，且来自同一会话。
    if (pendingQuestions.size !== 1) return false
    const only = [...pendingQuestions.values()][0]
    if (routedSessionId && routedSessionId !== only.sessionId) return false
    await answerSub(only, trimmed)
    return true
  }

  async function messageFactory() {
    if (!factory) {
      const require = createRequire(process.argv[1])
      factory = (await import(pathToFileURL(require.resolve('@deepseek-ai/dsh-llm')).href)).createUserMessage
    }
    return factory
  }

  async function sessionFor(sessionId) {
    const current = sessionId && registry()?.get(sessionId)
    if (current) return current
    if (handles.has(sessionId)) return handles.get(sessionId).agent
    const presets = ctx.get('agentPresets')
    const selection = ctx.get('agentDefaultModel')?.currentSelection()
    if (!selection) throw new Error('DSH 默认模型尚未就绪。')
    let handle
    if (sessionId) {
      try {
        handle = await registry().resume({ resumeSessionId: sessionId, agentOptions: selection,
          setup: presets ? async (agentCtx, agent) => { await presets.mount(agentCtx, agent.session.header.agentPreset) } : undefined })
      } catch (error) {
        // 选中的会话可能已被删除或归档。此时不能让入站消息直接失败，改开新会话继续。
        if (!/not found|不存在/i.test(String(error?.message || ''))) throw error
        bus.log('info', '飞书选中的会话已失效，改开新会话', { sessionId })
        sessionId = undefined
      }
    }
    if (!handle) {
      sessionId = `feishu-${randomUUID()}`
      const preset = await presets?.resolve()
      handle = await registry().create({ sessionId, agentOptions: selection,
        meta: { cwd: config.cwd || process.cwd(), ...(preset ? { agentPreset: preset.id } : {}) },
        setup: preset ? async (agentCtx) => { await presets.mount(agentCtx, preset.id) } : undefined })
    }
    handles.set(sessionId, handle)
    updateFeishuState((state) => { state.selectedSessionId = sessionId })
    return handle.agent
  }

  async function prepareMedia(message, media) {
    const parts = []
    for (const item of media) {
      if (!item.key) throw new Error('消息未提供可下载的资源标识。')
      const token = await appToken(config)
      const response = await fetch(`https://open.feishu.cn/open-apis/im/v1/messages/${encodeURIComponent(message.message_id)}/resources/${encodeURIComponent(item.key)}?type=${item.kind === 'image' ? 'image' : 'file'}`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
      })
      if (!response.ok) throw new Error(`附件下载失败 HTTP ${response.status}，请检查消息资源权限。`)
      const limit = 50 * 1024 * 1024
      if (Number(response.headers.get('content-length')) > limit) { await response.body?.cancel(); throw new Error('附件超过 50MB 限制。') }
      const chunks = []
      let size = 0
      for await (const chunk of response.body) {
        size += chunk.length
        if (size > limit) throw new Error('附件超过 50MB 限制。')
        chunks.push(chunk)
      }
      const data = Buffer.concat(chunks)
      const store = ctx.get('attachments')
      if (!store) throw new Error('当前 DSH 未提供附件存储。')
      if (item.kind === 'image') parts.push({ type: 'image', attachment: (await store.saveImages([{ data, mediaType: imageType(data) }]))[0] })
      else parts.push({ type: 'file', attachment: await store.saveFile({ data, name: item.name }) })
    }
    return parts
  }

  async function dispatch(event) {
    const message = event.message
    const parsed = parseFeishuContent(message)
    const text = parsed.text
    if (text === '/help') {
      await send('直接发文字、富文本、图片或文件即可对话。\n/sessions 查看会话\n/use 会话ID 切换会话\n/new 新对话\n/stop 停止当前会话\n/pending 查看待办\n回复通知消息可继续对应会话。\n语音/视频可作为附件接收，内容理解取决于模型能力。')
      return
    }
    if (text === '/pending') { await send(pendingList().map((item) => `${item.id} ${item.kind} ${item.sessionId}`).join('\n') || '没有待处理的交互。'); return }
    if (text === '/sessions') { await send(roots().slice(-20).map((agent) => `${idOf(agent)}\n${agent.session.header.cwd || ''}`).join('\n\n') || '当前没有运行中的会话。'); return }
    if (text.startsWith('/use ')) {
      const typed = text.slice(5).trim()
      const matches = roots().filter((agent) => idOf(agent) === typed || idOf(agent).endsWith(typed))
      if (matches.length !== 1) { await send('无法唯一定位会话，请用 /sessions 查看完整 ID。'); return }
      updateFeishuState((state) => { state.selectedSessionId = idOf(matches[0]) })
      await send(`已切换到 ${idOf(matches[0])}`)
      return
    }
    if (text === '/new') { await sessionFor(); await send('已创建新的飞书会话。'); return }
    if (text === '/stop') {
      const selected = readFeishuState().selectedSessionId
      const agent = selected && registry()?.get(selected)
      if (agent) { agent.cancel({ kind: 'user' }); await send('已请求停止当前会话。') } else await send('当前没有选中的运行会话。')
      return
    }
    if (text.startsWith('/')) { await send('未知命令，请发送 /help 查看支持的操作。'); return }
    const state = readFeishuState()
    const quotedSession = state.routes?.[message.parent_id] || state.routes?.[message.root_id]
    const sessionId = quotedSession || state.selectedSessionId
    if (!parsed.media.length && await answerText(text, sessionId)) return
    const agent = await sessionFor(sessionId)
    const parts = await prepareMedia(message, parsed.media)
    const createUserMessage = await messageFactory()
    agent.followup(createUserMessage({ content: [{ type: 'text', text: text || '请处理附件。' }, ...parts], source: { kind: 'user' } }))
    updateFeishuState((current) => { current.selectedSessionId = String(agent.session.id) })
    bus.log('info', '飞书入站消息已提交到 DSH', { type: message.message_type, sessionId: String(agent.session.id) })
    // 立刻回执：一轮可能要跑几分钟，不回执用户会以为消息没送到。
    void send('已收到，正在处理…', { sessionId: String(agent.session.id) }).catch(() => {})
  }

  async function handleMessage(event) {
    if (disposed || !authorized(event)) return false
    const id = event.message?.message_id
    if (!id || inFlight.has(id) || (readFeishuState().seen || []).includes(id)) return false
    inFlight.add(id)
    bus.log('info', '已接收飞书消息事件', { type: event.message.message_type })
    // Decisions bypass ordinary-message ordering, so a waiting turn cannot block its own answer.
    const work = async () => {
      try {
        await dispatch(event)
        updateFeishuState((state) => { state.seen = [...(state.seen || []), id].slice(-1000) })
        return true
      } catch (error) {
        bus.log('error', '飞书消息处理失败', error.message)
        await send(`消息未完成处理：${error.message}`).catch(() => {})
        return false
      } finally { inFlight.delete(id) }
    }
    let rawText = ''
    try { rawText = JSON.parse(event.message.content || '{}').text || '' } catch { /* dispatch reports invalid payload */ }
    // 子ID（Qxxx-1）也要走快车道，否则排队中的消息会压住作答。
    const urgent = /^([AQ][a-f\d]{8}(-\d+)?\s|\/stop$|\/pending$)/i.test(rawText) || (event.message.message_type === 'text' && pendingQuestions.size === 1)
    if (urgent) return work()
    const result = serial.then(work, work)
    serial = result.then(() => undefined, () => undefined)
    return result
  }

  const offFiles = ctx.on('session/event', (session, event) => {
    if (disposed || event.type !== 'deliverables/presented') return
    void (async () => {
      for (const file of event.data?.files || []) {
        try {
          await sendFeishuFile(file.path, config, String(session.id))
          bus.log('info', '交付文件已发送到飞书', { sessionId: String(session.id) })
        } catch (error) {
          await send(`交付文件未能发送：${error.message}`, { sessionId: String(session.id) })
        }
      }
    })().catch(() => bus.log('error', '飞书文件交付失败'))
  })
  const offQuestion = ctx.on('user-questions/request', (req, next) => offer('question', req, next), { prepend: true })
  const offApproval = ctx.on('approval/request', (req, next) => offer('approval', req, next), { prepend: true })
  return {
    ready: () => connected && !disposed,
    pending: () => pending.size,
    pendingList,
    handleMessage,
    handleAction(event) {
      if (disposed) {
        log('error', '飞书卡片回调：通道已卸载', { pendingId: String(event.action?.value?.pending_id || '').slice(0, 60) })
        return {}
      }
      if (event.operator?.open_id !== config.receiveId) {
        log('error', '飞书卡片回调被拒绝：非绑定账号', { operator: String(event.operator?.open_id || '').slice(0, 40) })
        // 旧版交互卡（Card 1.0）回调只认 ACK，回 toast 会让手机端报「操作失败」，直接 ACK。
        return {}
      }
      bus.log('info', '已接收飞书卡片回调')
      const value = event.action?.value || {}
      const pendingId = String(value.pending_id || '')
      const sub = pendingId ? findSub(pendingId) : undefined
      const entry = sub ? sub.parent : pendingId ? findEntry(pendingId) : undefined
      if (!sub && !entry) {
        log('info', '飞书卡片回调：未知或已失效的 pending_id', { pendingId: pendingId.slice(0, 60) })
        return {}
      }
      const input = String(value.input || '')
      let selectedLabel
      if (sub?.question?.options?.length && /^\d+$/.test(input)) {
        selectedLabel = sub.question.options[Number(input) - 1]?.label
      } else if (entry?.kind === 'approval') {
        selectedLabel = input === '1' ? '放行一次' : input === '2' ? '拒绝' : undefined
      } else if (input) {
        selectedLabel = input
      }
      void answerText(`${sub ? sub.id : entry.id} ${input}`).catch((error) => {
        log('error', '飞书卡片作答处理失败', { pendingId, error: describeError(error) })
      })
      // 旧版交互卡（Card 1.0）的 card.action.trigger 回调只认 ACK：回包里的 card/toast 字段会被忽略，
      // 手机端因此报「操作失败」。正确做法：返回 {}（HTTP 200 ACK），再拿事件里的 token
      // 调 interactive/v1/card/update 把原卡片就地替换成「已提交」卡片（Card 1.0 必须带 open_ids，否则 300090）。
      const updateToken = event.token ?? event.raw?.token
      if (updateToken) {
        void updateCard(updateToken, { ...buildConfirmCard(sub || entry, selectedLabel), open_ids: [event.operator.open_id] }, config)
          .catch((error) => log('error', '飞书卡片就地更新失败', { pendingId: sub?.id || entry?.id, error: describeError(error) }))
      } else {
        log('warn', '飞书卡片回调缺少 token，无法就地更新 PC 卡片', { pendingId: sub?.id || entry?.id })
      }
      return {}
    },
    offer,
    setConnected(value) { connected = value },
    async start() {
      // 迟回通道（120 秒超时后仍可作答）依赖 host 的 userQuestions 服务；启动时探一次，方便事后排障。
      const lateService = ctx.get?.('userQuestions')
      bus.log('info', '飞书迟回通道探测', {
        hasUserQuestions: lateService !== undefined,
        canLateAnswer: typeof lateService?.answer === 'function',
      })
      const sdk = await import('@larksuiteoapi/node-sdk')
      const dispatcher = new sdk.EventDispatcher({}).register({
        'im.message.receive_v1': (event) => { void handleMessage(event); return {} },
        'card.action.trigger': (event) => this.handleAction(event),
      })
      ws = new sdk.WSClient({ appId: config.appId, appSecret: config.appSecret,
        loggerLevel: sdk.LoggerLevel.error,
        logger: { error: (...args) => bus.log('error', '飞书长连接', args.filter((arg) => typeof arg === 'string').join(' ').replace(/wss?:\/\/\S+/g, '[connection]').slice(0, 300)), warn() {}, info() {}, debug() {}, trace() {} },
        onReady: () => { connected = true; bus.log('info', '飞书双向长连接已就绪（消息和卡片回调）') },
        onReconnecting: () => { connected = false },
        onReconnected: () => { connected = true; bus.log('info', '飞书长连接已重连') },
        onError: () => { connected = false; bus.log('error', '飞书长连接失败，请检查事件订阅长连接配置') },
      })
      await ws.start({ eventDispatcher: dispatcher })
    },
    async dispose() {
      disposed = true
      connected = false
      ws?.close({ force: true })
      offQuestion(); offApproval(); offFiles()
      for (const entry of [...pending.values()]) entry.settle(entry.kind === 'approval' ? 'cancelled' : undefined, entry.kind === 'question' ? new Error('飞书通道已重载。') : undefined)
      pendingQuestions.clear()
      // Borrowed GUI agents are never disposed by this channel.
      for (const handle of handles.values()) await handle.dispose()
      handles.clear()
    },
  }
}
