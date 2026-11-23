#!/usr/bin/env node
/**
 * captcha OCR helper — 识别图片验证码（算术型 / 文本型）。
 *
 * 用法:
 *   node solve-captcha.mjs <图片路径|->           # 从文件或 stdin(base64 或原始二进制经管道)读取
 *   node solve-captcha.mjs <图片路径> --json      # 输出 {"answer":"4","raw":"4"}
 *   echo <base64> | node solve-captcha.mjs -       # stdin 传 base64（可带 data: 前缀）
 *
 * 环境变量:
 *   CAPTCHA_VISION_MODEL  默认 auto/deepseek-v4.1-flash（需支持图片输入；勿用 auto/hy3，hy3 不支持识图）
 *   CAPTCHA_GATEWAY_URL   默认 http://127.0.0.1:3425/v1/chat/completions
 *   MAGPIE_GATEWAY_KEY    默认 magpie
 *
 *   --vote=K         K 次独立识别取众数（默认 1；>1 时 temperature=0.3 增加多样性）
 *   --upscale=N      与 vote 合并生效，N 次采样并在提示中强调放大细节（默认 1）
 *   --model=NAME     覆盖默认识图模型
 * 退出码: 0 成功并打印答案; 1 失败。
 */
import fs from 'node:fs'
import process from 'node:process'

const GATEWAY = process.env.CAPTCHA_GATEWAY_URL || 'http://127.0.0.1:3425/v1/chat/completions'
const MODEL = process.env.CAPTCHA_VISION_MODEL || 'auto/deepseek-v4.1-flash'
const KEY = process.env.MAGPIE_GATEWAY_KEY || 'magpie'

const PROMPT = `你是验证码识别器。图片是登录验证码，通常是算术题（如 "5+4=?"、"12-3=?"、"6*7=?"）或纯字母数字。
- 如果是算术题：先算出结果，只输出最终数字（例如 6+4=? 就输出 10）。
- 如果含乘号请用 *，除号用 /，加 +，减 -；只要最终数值结果，不要等号、不要题目、不要空格、不要解释。
- 如果是纯字母数字验证码：原样输出这些字符（区分大小写）。
只输出答案本身。`

function readInput(arg) {
  if (arg && arg !== '-') {
    const buf = fs.readFileSync(arg)
    return { buf, ext: (arg.match(/\.(\w+)$/) || [, 'jpg'])[1].toLowerCase() }
  }
  // stdin
  const chunks = []
  const fd = 0
  const tmp = fs.readFileSync(fd)
  // 可能是 base64 文本，也可能二进制
  const asText = tmp.toString('utf8').trim()
  if (/^data:image\//.test(asText) || /^[A-Za-z0-9+/=\s]+$/.test(asText) && asText.length > 64) {
    const b64 = asText.replace(/^data:image\/\w+;base64,/, '').replace(/\s+/g, '')
    return { buf: Buffer.from(b64, 'base64'), ext: 'jpg' }
  }
  return { buf: tmp, ext: 'jpg' }
}

function mimeOf(ext) {
  if (ext === 'png') return 'image/png'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'gif') return 'image/gif'
  return 'image/jpeg'
}

function normalizeAnswer(text) {
  let t = String(text || '').trim()
  t = t.replace(/`/g, '').trim()
  // 算式：允许负数操作数；算术由脚本自行计算，不采信模型给出的结果
  // （消除"认错数字再算对"如 8+9->105，以及 X-1?= 被读成负数的历史弱点）
  const eqMatch = t.match(/(-?\d+)\s*([+\-*/×÷])\s*(-?\d+)/)
  if (eqMatch) {
    const a = Number(eqMatch[1]), op = eqMatch[2], b = Number(eqMatch[3])
    let v = null
    if (op === '+') v = a + b
    else if (op === '-') v = a - b
    else if (op === '*' || op === '×') v = a * b
    else if (op === '/' || op === '÷') v = b !== 0 ? Math.round(a / b) : null
    if (v !== null && Number.isFinite(v)) return { answer: String(v), confidence: 'high', raw: t }
  }
  // 模型只给出结果数字（未回显算式）：范围自检，|值|>9999 视为离谱值
  const numMatch = t.match(/^=?\s*(-?\d+(?:\.\d+)?)$/)
  if (numMatch) {
    const v = Number(numMatch[1])
    if (Number.isInteger(v) && Math.abs(v) <= 9999) return { answer: String(v), confidence: 'medium', raw: t }
    return { answer: '', confidence: 'low', raw: t }
  }
  // 文本型：取首个 token，保留大小写
  const token = (t.match(/[A-Za-z0-9]+/) || [t])[0]
  return token ? { answer: token, confidence: 'medium', raw: t }
               : { answer: '', confidence: 'low', raw: t }
}

async function recognizeOnce({ url, model, vote, upscale }) {
  const extra = upscale > 1 ? ' 请放大图片细节，仔细辨认每个字符。' : ''
  const body = JSON.stringify({
    model,
    messages: [
      { role: 'user', content: [ { type: 'text', text: PROMPT + extra }, { type: 'image_url', image_url: { url } } ] }
    ],
    max_tokens: 30,
    temperature: vote > 1 ? 0.3 : 0
  })
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 45000)
  let res
  try {
    res = await fetch(GATEWAY, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body,
      signal: controller.signal
    })
  } finally {
    clearTimeout(timer)
  }
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`gateway HTTP ${res.status}: ${txt.slice(0, 300)}`)
  }
  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content ?? ''
  return normalizeAnswer(raw)
}

function parseArgs(args) {
  const wantJson = args.includes('--json')
  const getOpt = (name, def) => {
    const hit = args.find((a) => a.startsWith(name + '='))
    return hit ? hit.slice(name.length + 1) : def
  }
  const vote = Math.max(1, parseInt(getOpt('--vote', '1'), 10) || 1)
  const upscale = Math.max(1, parseInt(getOpt('--upscale', '1'), 10) || 1)
  const model = getOpt('--model', MODEL)
  const arg = args.find((a) => a !== '--json' && !a.startsWith('--')) || '-'
  return { wantJson, vote: Math.max(vote, upscale), upscale, model, arg }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const { buf, ext } = readInput(opts.arg)
  const url = `data:${mimeOf(ext)};base64,${buf.toString('base64')}`

  const results = []
  for (let i = 0; i < opts.vote; i++) {
    results.push(await recognizeOnce({ url, model: opts.model, vote: opts.vote, upscale: opts.upscale }))
  }

  // 众数取答案；平票时按 confidence 等级（high > medium > low）优先
  const rank = { high: 0, medium: 1, low: 2 }
  const groups = new Map()
  for (const r of results) {
    if (!r.answer) continue
    if (!groups.has(r.answer)) groups.set(r.answer, [])
    groups.get(r.answer).push(r)
  }
  let best = null
  for (const [answer, rs] of groups) {
    const conf = rs.reduce((acc, r) => rank[r.confidence] < rank[acc] ? r.confidence : acc, 'low')
    if (!best || rs.length > best.n || (rs.length === best.n && rank[conf] < rank[best.confidence])) {
      best = { answer, n: rs.length, confidence: conf }
    }
  }
  if (!best) throw new Error('empty answer; raw=' + JSON.stringify(results.map((r) => r.raw)))
  const confidence = opts.vote > 1 ? `${best.n}/${opts.vote}` : best.confidence
  if (opts.wantJson) console.log(JSON.stringify({ answer: best.answer, raw: results[0].raw.trim(), confidence }))
  else console.log(best.answer)
}

export { normalizeAnswer, parseArgs }

// 作为 CLI 执行时才跑 main；被 import 时仅导出纯函数供测试
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((e) => {
    console.error('[solve-captcha] ' + (e?.message || e))
    process.exit(1)
  })
}
