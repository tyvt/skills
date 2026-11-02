import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createFeishuBridge, parseAnswers, parseFeishuContent } from '../lib/feishu-bridge.mjs'
import { updateFeishuState, recordFeishuRoute } from '../lib/feishu-state.mjs'
import { sendFeishuFile } from '../lib/feishu-files.mjs'
process.env.DSH_HOME = mkdtempSync(join(tmpdir(), 'dsh-feishu-bridge-test-'))
const config = { mode: 'app', appId: 'app', appSecret: 'secret', receiveId: 'ou_owner', receiveIdType: 'open_id', cwd: '/work' }
const originalFetch = globalThis.fetch
const sent = []
let uploaded = 0
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aNs8AAAAASUVORK5CYII=', 'base64')
globalThis.fetch = async (url, init) => {
  if (url.includes('tenant_access_token')) return Response.json({ code: 0, tenant_access_token: 'access', expire: 7200 })
  if (url.includes('/resources/')) return new Response(png, { headers: { 'Content-Type': 'image/png' } })
  if (url.endsWith('/im/v1/files')) { uploaded += 1; assert.ok(init.body instanceof FormData); return Response.json({ code: 0, data: { file_key: 'file-upload' } }) }
  const body = JSON.parse(init.body)
  sent.push(body)
  return Response.json({ code: 0, data: { message_id: `out-${sent.length}` } })
}
const agents = new Map()
const deliveries = []
let stopped = 0
let ownedDisposed = 0
const makeAgent = (id) => ({ id, session: { id, header: { cwd: '/work', agentPreset: 'standard' } },
  followup: (message) => deliveries.push({ id, message }), cancel: (cause) => { assert.equal(cause.kind, 'user'); stopped += 1 } })
const gui = makeAgent('gui-session-1234')
agents.set(gui.id, gui)
const handlers = new Map()
// 迟回通道桩：记录 answer() 调用，可切换返回值/异常，用来验证各类回执文案。
const questionAnswers = []
let answerMode = 'ok'
let userQuestionsAvailable = true
const userQuestions = {
  answer(agent, callId, payload) {
    questionAnswers.push({ agent, callId, payload })
    if (answerMode === 'false') return false
    if (answerMode === 'REPLY_QUEUED') throw Object.assign(new Error('a reply is already queued for this question'), { code: 'REPLY_QUEUED' })
    if (answerMode === 'CALLER_NOT_LIVE') throw Object.assign(new Error('human interaction requires the exact live calling agent'), { code: 'CALLER_NOT_LIVE' })
    return true
  },
}
const ctx = {
  get(name) {
    if (name === 'userQuestions') return userQuestionsAvailable ? userQuestions : undefined
    if (name === 'agents') return { get: (id) => agents.get(id), roots: () => [...agents.values()],
      create: async ({ sessionId, setup }) => { const agent = makeAgent(sessionId); const result = await setup?.({}, agent); assert.equal(result, undefined, 'setup 不应返回预设卸载句柄'); agents.set(sessionId, agent); return { agent, dispose: async () => { ownedDisposed += 1; agents.delete(sessionId) } } },
      resume: async ({ resumeSessionId, setup }) => { const agent = makeAgent(resumeSessionId); const result = await setup?.({}, agent); assert.equal(result, undefined, 'resume setup 不应返回预设卸载句柄'); agents.set(resumeSessionId, agent); return { agent, dispose: async () => { ownedDisposed += 1; agents.delete(resumeSessionId) } } },
    }
    if (name === 'agentPresets') return { resolve: async () => ({ id: 'standard' }), mount: async () => () => {} }
    if (name === 'agentDefaultModel') return { currentSelection: () => ({ provider: 'fake', model: 'fake' }) }
    if (name === 'attachments') return { saveImages: async (images) => { assert.equal(images[0].mediaType, 'image/png'); return [{ id: 'image' }] }, saveFile: async ({ data }) => { assert.ok(data.length); return { id: 'file' } } }
  },
  on(name, handler) { handlers.set(name, handler); return () => handlers.delete(name) },
}
// 日志要能被断言：每条 bus.log 都记账，用来验证“失败/边界可诊断”。
const logs = []
const bus = { log(level, message, detail) { logs.push({ level, message, detail }) } }
const bridge = createFeishuBridge({ ctx, bus, config, createUserMessage: (input) => input })
bridge.setConnected(true)
let count = 0
const inbound = (text, extra = {}, sender = 'ou_owner') => ({ sender: { sender_id: { open_id: sender } }, message: { message_id: `in-${++count}`, chat_type: 'p2p', message_type: 'text', content: JSON.stringify({ text }), ...extra } })
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// 卡片是异步投递的，多让几拍事件循环再断言。
const flush = async (rounds = 8) => { for (let i = 0; i < rounds; i += 1) await new Promise((resolve) => setImmediate(resolve)) }
const cardsSince = (mark) => sent.slice(mark).filter((item) => item.msg_type === 'interactive').map((item) => JSON.parse(item.content))
const textsSince = (mark) => sent.slice(mark).filter((item) => item.msg_type === 'text').map((item) => JSON.parse(item.content).text)
const lastText = () => textsSince(0).at(-1) || ''
const hasLog = (level, fragment) => logs.some((entry) => entry.level === level && entry.message.includes(fragment))
function lastCard() { return JSON.parse(sent.filter((item) => item.msg_type === 'interactive').at(-1).content) }
try {
  assert.deepEqual(parseAnswers([{ id: 'q', multiSelect: true, options: [{ label: 'A' }, { label: 'B' }] }], '1,2'), { answers: [{ id: 'q', selected: ['A', 'B'] }] })
  assert.throws(() => parseAnswers([{ id: 'q', options: [{ label: 'A' }] }], '2'), /范围/)
  assert.throws(() => parseAnswers([{ id: 'q', options: [{ label: 'A' }, { label: 'B' }] }], '1,2'), /一项/)
  assert.equal(parseFeishuContent({ message_type: 'post', content: JSON.stringify({ title: 'title', content: [[{ tag: 'text', text: 'hello' }, { tag: 'img', image_key: 'image' }]] }) }).media.length, 1)
  assert.equal(parseFeishuContent({ message_type: 'media', content: JSON.stringify({ image_key: 'thumbnail', file_key: 'video' }) }).media[0].key, 'video')
  assert.match(parseFeishuContent({ message_type: 'interactive', content: JSON.stringify({ title: 'card' }) }).text, /card/)
  assert.throws(() => parseFeishuContent({ message_type: 'unknown' }), /无法直接读取/)
  await bridge.handleMessage(inbound('不可信消息', {}, 'ou_other'))
  assert.equal(deliveries.length, 0)
  await bridge.handleMessage(inbound('hello', { chat_type: 'group' }))
  assert.equal(deliveries.length, 0)
  const message = inbound('hello')
  await bridge.handleMessage(message)
  await bridge.handleMessage(message)
  assert.equal(deliveries.length, 1, '重复消息只提交一次')
  assert.equal(deliveries[0].message.source.kind, 'user')
  recordFeishuRoute('gui-notice', gui.id)
  await bridge.handleMessage(inbound('继续原会话', { parent_id: 'gui-notice' }))
  assert.equal(deliveries.at(-1).id, gui.id)
  await bridge.handleMessage(inbound('/stop'))
  assert.equal(stopped, 1)
  await bridge.handleMessage(inbound('图像', { message_type: 'image', content: JSON.stringify({ image_key: 'img' }) }))
  assert.equal(deliveries.at(-1).message.content[1].type, 'image')
  await bridge.handleMessage(inbound('文件', { message_type: 'file', content: JSON.stringify({ file_key: 'file', file_name: 'x.txt' }) }))
  assert.equal(deliveries.at(-1).message.content[1].type, 'file')

  // ---------- 单题：仍然只发 1 张卡，按钮落到子ID ----------
  let guiResolve
  const question = bridge.offer('question', { agent: gui, questions: [{ id: 'q1', question: '选哪个', options: [{ label: 'A' }, { label: 'B' }] }] }, () => new Promise((resolve) => { guiResolve = resolve }))
  await flush()
  assert.ok(guiResolve, 'GUI 必须立刻拿到提问')
  assert.equal(cardsSince(0).length, 1, '单题只发 1 张卡')
  const singleSub = bridge.pendingList().find((item) => item.id.includes('-'))
  assert.ok(singleSub, 'pendingList 必须暴露子题')
  assert.deepEqual(bridge.pendingList().map((item) => item.kind), ['question', 'question'])
  assert.equal(bridge.pendingList()[0].sessionId, gui.id)
  updateFeishuState((state) => { state.selectedSessionId = deliveries[0].id })
  await bridge.handleMessage(inbound('继续另一个会话'))
  assert.equal(deliveries.at(-1).id, deliveries[0].id)
  assert.equal(bridge.pending(), 1, '其他会话的文字不能替当前提问作答')
  const value = lastCard().elements.find((element) => element.tag === 'action').actions[1].value
  assert.equal(value.pending_id, singleSub.id, '按钮必须指向子ID')
  assert.deepEqual(bridge.handleAction({ operator: { open_id: 'ou_other' }, action: { value } }), {}, '未授权必须 ACK（不能回 toast，否则手机端报「操作失败」）')
  assert.ok(hasLog('error', '非绑定账号'), '未授权操作者必须记日志')
  assert.equal(bridge.pending(), 1)
  bridge.handleAction({ operator: { open_id: 'ou_owner' }, action: { value } })
  assert.deepEqual(await question, { answers: [{ id: 'q1', selected: ['B'] }] })
  assert.match(lastText(), /全部 1 题已记录，正在继续。/)
  guiResolve({ answers: [] })
  assert.equal(bridge.pending(), 0)
  assert.equal(bridge.pendingList().length, 0, '结算后不能残留子题')
  assert.deepEqual(bridge.handleAction({ operator: { open_id: 'ou_owner' }, action: { value } }), {}, '已结算的 pending 再次点击必须 ACK')
  assert.ok(hasLog('info', '未知或已失效的 pending_id'), '已失效的 pending 应记日志')

  // ---------- 普通（未超时）模式也要把答案经 userQuestions.answer 补进会话（闭合网页卡片 + 让 agent 收到答案） ----------
  answerMode = 'ok'
  userQuestionsAvailable = true
  const normalCallId = 'call-normal-1'
  const normalMark = sent.length
  const normalQuestion = bridge.offer('question', {
    agent: gui,
    wait: { callId: normalCallId, timed: true },
    questions: [{ id: 'n1', question: '普通模式答案能否回流', options: [{ label: '能' }, { label: '不能' }] }],
  }, () => new Promise(() => {}))
  await flush()
  assert.equal(cardsSince(normalMark).length, 1, '普通模式（带 callId）也要发卡')
  const normalParent = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
  await bridge.handleMessage(inbound(`${normalParent} 1`))
  await flush()
  const normalRecord = questionAnswers.find((record) => record.callId === normalCallId)
  assert.ok(normalRecord, '普通模式答案必须调用 userQuestions.answer 并带上 callId')
  assert.deepEqual(normalRecord.payload, { answers: [{ id: 'n1', selected: ['能'] }] }, '补交的答案批次必须还原选项标签')
  assert.deepEqual(await normalQuestion, { answers: [{ id: 'n1', selected: ['能'] }] }, '普通模式内部 promise 也要结算')
  assert.equal(bridge.pending(), 0, '普通模式补交后待办清理')

  // ---------- 多题：一题一卡 + 逐题结算 + 顺序还原 ----------
  const multiQuestions = [
    { id: 'm1', question: '部署环境', options: [{ label: '预发' }, { label: '生产' }] },
    { id: 'm2', question: '回滚方案', detail: '写清触发条件', options: [{ label: '自动' }, { label: '手动' }] },
    { id: 'm3', question: '通知哪些人', multiSelect: true, options: [{ label: '值班' }, { label: '产品' }, { label: '测试' }] },
  ]
  const multiMark = sent.length
  const multi = bridge.offer('question', { agent: gui, questions: multiQuestions }, () => new Promise(() => {}))
  await flush()
  const multiCards = cardsSince(multiMark)
  assert.equal(multiCards.length, 3, 'N>1 必须拆成 N 张卡，不能合并成一张')
  const parentId = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
  assert.deepEqual(multiCards.map((card) => card.header?.title?.content), [
    `第 1/3 题 · ${parentId}-1`, `第 2/3 题 · ${parentId}-2`, `第 3/3 题 · ${parentId}-3`,
  ])
  assert.deepEqual(bridge.pendingList().map((item) => item.id), [parentId, `${parentId}-1`, `${parentId}-2`, `${parentId}-3`])
  assert.deepEqual(multiCards[0].elements.find((element) => element.tag === 'action').actions.map((action) => action.value), [
    { pending_id: `${parentId}-1`, input: '1' }, { pending_id: `${parentId}-1`, input: '2' },
  ])
  assert.match(multiCards[0].elements[0].text.content, /也可直接填写文字答案/, '卡片底部必须提示自定义文字作答')
  assert.equal(multiCards[2].elements.some((element) => element.tag === 'action'), false, '多选不渲染按钮')
  assert.match(multiCards[2].elements[0].text.content, new RegExp(`回复 ${parentId}-3 1,3`))
  // 先点第 2 题：立刻回执，父请求不能结算
  const clickMark = sent.length
  const click = multiCards[1].elements.find((element) => element.tag === 'action').actions[1].value
  const clickReceipt = bridge.handleAction({ token: 'upd-multi', operator: { open_id: 'ou_owner' }, action: { value: click } })
  assert.deepEqual(clickReceipt, {}, '点击必须 ACK 回调（HTTP 200），不能回 toast/card（否则手机端报「操作失败」）')
  await flush()
  const clickUpdate = sent.find((body) => body.token === 'upd-multi')
  assert.ok(clickUpdate, '必须调用 interactive/v1/card/update 就地替换卡片')
  assert.ok(clickUpdate.card.open_ids?.includes('ou_owner'), 'Card 1.0 更新必须带 open_ids（否则 300090）')
  assert.equal(clickUpdate.card.elements.some((element) => element.tag === 'action'), false, '替换卡必须去掉按钮')
  assert.match(clickUpdate.card.elements[0].text.content, /已提交：手动/)
  await flush()
  assert.match(textsSince(clickMark).at(-1), /第 2\/3 题已记录，还差 2 题/)
  assert.equal(bridge.pending(), 1, '还有 2 题未答，父请求不能结算')
  // 答案解析失败必须回执 + 记日志，且不能吞掉这一题
  const badMark = sent.length
  await bridge.handleMessage(inbound(`${parentId}-1 9`))
  assert.match(textsSince(badMark).at(-1), /作答无法识别/)
  assert.ok(hasLog('error', '飞书作答解析失败'))
  assert.equal(bridge.pendingList().length, 3, '解析失败不能扣掉子题（父请求 + 未答的 2 题）')
  // 再按子ID补第 1 题、第 3 题
  const firstMark = sent.length
  await bridge.handleMessage(inbound(`${parentId}-1 2`))
  assert.match(textsSince(firstMark).at(-1), /第 1\/3 题已记录，还差 1 题/)
  const lastMark = sent.length
  await bridge.handleMessage(inbound(`${parentId}-3 1,3`))
  assert.match(textsSince(lastMark).at(-1), /全部 3 题已记录，正在继续。/)
  assert.deepEqual((await multi).answers, [
    { id: 'm1', selected: ['生产'] },
    { id: 'm2', selected: ['手动'] },
    { id: 'm3', selected: ['值班', '测试'] },
  ], '最终答案必须与原 questions 顺序一致')
  assert.equal(bridge.pending(), 0)
  assert.equal(bridge.pendingList().length, 0)
  // 未知/已失效 ID：给提示 + 留日志，不静默
  assert.deepEqual(bridge.handleAction({ operator: { open_id: 'ou_owner' }, action: { value: { pending_id: `${parentId}-1`, input: '1' } } }), {}, '已失效 pending 必须 ACK')
  assert.ok(hasLog('info', '未知或已失效的 pending_id'))
  const unknownMark = sent.length
  await bridge.handleMessage(inbound('Qdeadbeef-9 1'))
  assert.match(textsSince(unknownMark).at(-1), /已结束或失效/)
  assert.ok(hasLog('info', '子题 ID 未知或已失效'))
  // 父ID + 分号批量作答（兼容旧写法）
  const batchQuestions = [{ id: 'b1', question: '甲', options: [{ label: 'A' }, { label: 'B' }] }, { id: 'b2', question: '乙', options: [{ label: 'C' }, { label: 'D' }, { label: 'E' }] }]
  const batchMark = sent.length
  const batch = bridge.offer('question', { agent: gui, questions: batchQuestions }, () => new Promise(() => {}))
  await flush()
  assert.equal(cardsSince(batchMark).length, 2)
  const batchParent = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
  const batchAnswerMark = sent.length
  await bridge.handleMessage(inbound(`${batchParent} 2;3`))
  assert.match(textsSince(batchAnswerMark).at(-1), /全部 2 题已记录/)
  assert.deepEqual((await batch).answers, [{ id: 'b1', selected: ['B'] }, { id: 'b2', selected: ['E'] }])
  assert.equal(bridge.pendingList().length, 0)

  // ---------- 子代理（非根 agent）的提问也要能推卡 ----------
  const child = makeAgent('child-session-5678')
  assert.equal(agents.has(child.id), false, '这个 agent 不在 roots() 里')
  const childMark = sent.length
  const childQuestion = bridge.offer('question', { agent: child, questions: [{ id: 'c1', question: '子代理提问', options: [{ label: '好' }, { label: '不好' }] }] }, () => new Promise(() => {}))
  await flush()
  assert.equal(cardsSince(childMark).length, 1, '子代理提问也要发卡')
  const childSub = bridge.pendingList().find((item) => item.sessionId === child.id && item.id.includes('-')).id
  const childReceipt = bridge.handleAction({ token: 'upd-child', operator: { open_id: 'ou_owner' }, action: { value: { pending_id: childSub, input: '1' } } })
  assert.deepEqual(childReceipt, {}, '点击必须 ACK 回调（HTTP 200）')
  await flush()
  const childUpdate = sent.find((body) => body.token === 'upd-child')
  assert.ok(childUpdate, '必须调用 interactive/v1/card/update 就地替换卡片')
  assert.ok(childUpdate.card.open_ids?.includes('ou_owner'), 'Card 1.0 更新必须带 open_ids（否则 300090）')
  assert.equal(childUpdate.card.elements.some((element) => element.tag === 'action'), false, '替换卡必须去掉按钮')
  assert.match(childUpdate.card.elements[0].text.content, /已提交：好/)
  assert.deepEqual(await childQuestion, { answers: [{ id: 'c1', selected: ['好'] }] })
  assert.equal(await bridge.offer('question', {}, () => 'no-agent'), 'no-agent', '缺 agent 时退回网页')
  assert.ok(hasLog('info', '缺少 agent 或 session.id'))

  // ---------- 长连接未就绪：先等 5 秒，恢复就推正常卡 ----------
  bridge.setConnected(false)
  const recoverMark = sent.length
  const recovered = bridge.offer('question', { agent: gui, questions: [{ id: 'w1', question: '等待恢复', options: [{ label: '继续' }] }] }, () => new Promise(() => {}))
  setTimeout(() => bridge.setConnected(true), 200)
  await sleep(800)
  assert.equal(cardsSince(recoverMark).length, 1, '连接恢复后必须发出正常卡')
  assert.equal(cardsSince(recoverMark)[0].header, undefined, '单题卡保持原样式（无标题）')
  const recoveredSub = bridge.pendingList().find((item) => item.id.includes('-')).id
  await bridge.handleMessage(inbound(`${recoveredSub} 1`))
  assert.deepEqual(await recovered, { answers: [{ id: 'w1', selected: ['继续'] }] })

  // ---------- 长连接始终未就绪：等满 5 秒后发降级卡，绝不发纯文字 ----------
  bridge.setConnected(false)
  const degradeMark = sent.length
  const degradeStart = Date.now()
  const degraded = bridge.offer('question', { agent: gui, questions: [{ id: 'd1', question: '没连接时怎么办', options: [{ label: '网页答' }] }] }, () => new Promise(() => {}))
  await sleep(5400)
  const degradeElapsed = Date.now() - degradeStart
  const degradedCards = cardsSince(degradeMark)
  assert.equal(degradedCards.length, 1, '未连接时必须发 1 张降级卡')
  assert.match(degradedCards[0].header.title.content, /暂时无法作答，请在网页作答/)
  assert.match(degradedCards[0].elements[0].text.content, /暂时无法作答，请在网页作答/)
  assert.equal(degradedCards[0].elements.some((element) => element.tag === 'action'), false, '降级卡不能带按钮')
  assert.equal(textsSince(degradeMark).length, 0, '未连接时绝不发纯文字')
  assert.ok(degradeElapsed >= 5000, `必须等满 5000ms 才降级，实际 ${degradeElapsed}ms`)
  assert.ok(hasLog('error', '改发降级卡片'))
  const degradeSub = bridge.pendingList().find((item) => item.id.includes('-')).id
  await bridge.handleMessage(inbound(`${degradeSub} 1`))
  assert.deepEqual(await degraded, { answers: [{ id: 'd1', selected: ['网页答'] }] }, '降级后文字作答仍要生效')
  questionAnswers.length = 0 // 普通模式已补交若干条 userQuestions.answer，迟回断言要求从这里开始计 0

  // ---------- 120 秒超时（ASK_TIMED_OUT）：卡片继续可用，答案走迟回 steer 补进会话 ----------
  bridge.setConnected(true)
  const lateController = new AbortController()
  const lateMark = sent.length
  const late = bridge.offer('question', {
    agent: gui,
    signal: lateController.signal,
    wait: { callId: 'call-late-1', timed: true },
    questions: [
      { id: 'l1', question: '超时后第一题', options: [{ label: '甲' }, { label: '乙' }] },
      { id: 'l2', question: '超时后第二题', options: [{ label: '丙' }, { label: '丁' }] },
    ],
  }, () => new Promise(() => {}))
  await flush()
  assert.equal(cardsSince(lateMark).length, 2)
  const lateParent = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
  const lateResendMark = sent.length
  lateController.abort({ code: 'ASK_TIMED_OUT', message: 'ask_user_question timed out before the user answered' })
  await flush()
  assert.equal(bridge.pending(), 1, '超时不能摘除待办')
  assert.deepEqual(bridge.pendingList().map((item) => item.id), [lateParent, `${lateParent}-1`, `${lateParent}-2`])
  assert.ok(hasLog('info', '转入迟回模式'), '超时转迟回必须记日志')
  const lateCards = cardsSince(lateResendMark)
  assert.equal(lateCards.length, 2, '超时后要给未答子题重发卡片')
  assert.match(lateCards[0].elements[0].text.content, /已超过 120 秒，仍可作答；提交后会作为迟回补进会话/)
  assert.equal(lateCards[0].elements.some((element) => element.tag === 'action'), true, '迟回卡片仍要能点')
  // 还没答完不能提交迟回
  assert.equal(questionAnswers.length, 0)
  bridge.handleAction({ operator: { open_id: 'ou_owner' }, action: { value: { pending_id: `${lateParent}-1`, input: '2' } } })
  await flush()
  assert.equal(questionAnswers.length, 0, '还有题没答，不能调 answer()')
  assert.match(lastText(), /第 1\/2 题已记录，还差 1 题/)
  // 答完最后一题：answer() 恰好一次，callId 与完整批次都要对
  const lateSubmitMark = sent.length
  await bridge.handleMessage(inbound(`${lateParent}-2 1`))
  await flush()
  assert.equal(questionAnswers.length, 1, '答完最后一题必须提交一次迟回')
  assert.equal(questionAnswers[0].callId, 'call-late-1')
  assert.equal(questionAnswers[0].agent, gui)
  assert.deepEqual(questionAnswers[0].payload.answers, [
    { id: 'l1', selected: ['乙'] },
    { id: 'l2', selected: ['丙'] },
  ], '迟回批次必须按原题序、每题各一次')
  assert.match(textsSince(lateSubmitMark).at(-1), /已作为迟回提交，会在下一步被采纳/)
  assert.ok(hasLog('info', '飞书迟回答案已提交'))
  assert.equal(bridge.pending(), 0, '迟回提交后待办清理')
  assert.equal(bridge.pendingList().length, 0)

  // 迟回失败三种回执：REPLY_QUEUED / CALLER_NOT_LIVE / 返回 false
  for (const [mode, fragment] of [
    ['REPLY_QUEUED', /已有一条回复在排队，稍后自动生效/],
    ['CALLER_NOT_LIVE', /该会话已结束或已移交，请在网页作答/],
    ['false', /该问题已关闭，无法迟回/],
  ]) {
    answerMode = mode
    const controller = new AbortController()
    bridge.offer('question', { agent: gui, signal: controller.signal, wait: { callId: `call-${mode}`, timed: true }, questions: [{ id: 'x1', question: '迟回失败', options: [{ label: 'A' }] }] }, () => new Promise(() => {}))
    await flush()
    const parent = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
    controller.abort({ code: 'ASK_TIMED_OUT' })
    await flush()
    const mark = sent.length
    await bridge.handleMessage(inbound(`${parent}-1 1`))
    await flush()
    assert.match(textsSince(mark).at(-1), fragment, `${mode} 的回执文案`)
    assert.ok(hasLog('error', '飞书迟回'), `${mode} 必须记日志`)
    assert.equal(bridge.pending(), 0, `${mode} 之后待办清理`)
  }
  answerMode = 'ok'

  // 迟回通道缺失：明确回执 + error 日志
  userQuestionsAvailable = false
  const offlineController = new AbortController()
  bridge.offer('question', { agent: gui, signal: offlineController.signal, wait: { callId: 'call-offline', timed: true }, questions: [{ id: 'o1', question: '无通道', options: [{ label: 'A' }] }] }, () => new Promise(() => {}))
  await flush()
  const offlineParent = bridge.pendingList().find((item) => item.kind === 'question' && !item.id.includes('-')).id
  offlineController.abort({ code: 'ASK_TIMED_OUT' })
  await flush()
  const offlineMark = sent.length
  await bridge.handleMessage(inbound(`${offlineParent}-1 1`))
  await flush()
  assert.match(textsSince(offlineMark).at(-1), /迟回通道不可用，请在网页作答/)
  assert.ok(hasLog('error', '飞书迟回通道不可用'))
  assert.equal(bridge.pending(), 0)
  userQuestionsAvailable = true

  // 普通 abort（用户取消，reason 无 code）仍是清理 + 现有「已取消」语义，不进入迟回
  const cancelController = new AbortController()
  const cancelledQuestion = bridge.offer('question', { agent: gui, signal: cancelController.signal, wait: { callId: 'call-cancel', timed: true }, questions: [{ id: 'z1', question: '会被取消', options: [{ label: 'A' }] }] }, () => new Promise(() => {}))
  const cancelRejected = assert.rejects(cancelledQuestion, /取消/)
  await flush()
  cancelController.abort(new Error('user cancelled'))
  await cancelRejected
  assert.equal(bridge.pending(), 0, '普通 abort 立即清理')
  assert.equal(questionAnswers.some((call) => call.callId === 'call-cancel'), false, '普通 abort 不能走迟回')

  // ---------- 审批行为保持不变 ----------
  bridge.setConnected(true)
  const approval = bridge.offer('approval', { agent: gui, toolName: 'deploy', reason: '发布' }, () => new Promise(() => {}))
  await flush()
  const approveValue = lastCard().elements.find((element) => element.tag === 'action').actions[0].value
  await bridge.handleMessage(inbound(`${approveValue.pending_id} 1`))
  assert.equal(await approval, 'allowed-once')
  const uiFirst = bridge.offer('approval', { agent: gui, toolName: 'write' }, () => Promise.resolve('rejected'))
  assert.equal(await uiFirst, 'rejected')
  const controller = new AbortController()
  const cancelled = bridge.offer('question', { agent: gui, signal: controller.signal, questions: [{ id: 'free', question: '文字' }] }, () => new Promise(() => {}))
  const rejected = assert.rejects(cancelled, /取消/)
  controller.abort()
  await rejected
  assert.equal(bridge.pending(), 0)
  const file = join(process.env.DSH_HOME, 'result.txt')
  writeFileSync(file, '交付物')
  await sendFeishuFile(file, config, gui.id)
  assert.equal(uploaded, 1)
  assert.equal(sent.at(-1).msg_type, 'file')
  const before = deliveries.length
  await bridge.handleMessage(inbound('/unknown'))
  assert.equal(deliveries.length, before)
  bridge.setConnected(false)
  assert.equal(await bridge.offer('approval', { agent: gui }, () => 'gui-only'), 'gui-only')
  assert.ok(hasLog('info', '审批只在网页作答'))
  await bridge.dispose()
  assert.ok(agents.has(gui.id), '卸载不能关闭借用的 GUI 会话')
  assert.equal(ownedDisposed, 1)
  console.log('双向飞书回归通过：账号和私聊限制、去重、原会话引用、普通聊天、图片文件、单题单卡、多题多卡、逐题结算、答案顺序、未知ID提示、子代理提问、未连接等待与降级卡、超时迟回提交、迟回失败回执、普通取消、审批、GUI 竞态、取消、文件交付和卸载。')
} finally { await bridge.dispose(); globalThis.fetch = originalFetch }
