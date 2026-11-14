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
 *   CAPTCHA_VISION_MODEL  默认 auto/hy3（需支持图片输入）
 *   CAPTCHA_GATEWAY_URL   默认 http://127.0.0.1:3425/v1/chat/completions
 *   MAGPIE_GATEWAY_KEY    默认 magpie
 *
 * 退出码: 0 成功并打印答案; 1 失败。
 */
import fs from 'node:fs'
import process from 'node:process'

const GATEWAY = process.env.CAPTCHA_GATEWAY_URL || 'http://127.0.0.1:3425/v1/chat/completions'
const MODEL = process.env.CAPTCHA_VISION_MODEL || 'auto/hy3'
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
  // 去掉 markdown / 引号 / 等号等杂讯，优先取算式结果
  t = t.replace(/```/g, '').trim()
  // 若模型回显了题目如 "6+4=? 10"，取最后一个数字或最合理的
  const eqMatch = t.match(/(\d+)\s*([+\-*/×÷])\s*(\d+)/)
  if (eqMatch && !/^=\s*-?\d/.test(t)) {
    const a = +eqMatch[1], op = eqMatch[2], b = +eqMatch[3]
    let v = null
    if (op === '+' ) v = a + b
    else if (op === '-') v = a - b
    else if (op === '*' || op === '×') v = a * b
    else if (op === '/' || op === '÷') v = b !== 0 ? Math.round(a / b) : null
    if (v !== null) return String(v)
  }
  // 否则取第一个 token（字母数字）
  const token = (t.match(/[A-Za-z0-9]+/g) || [t])[0]
  return token
}

async function main() {
  const args = process.argv.slice(2)
  const wantJson = args.includes('--json')
  const arg = args.find((a) => a !== '--json') || '-'
  const { buf, ext } = readInput(arg)
  const b64 = buf.toString('base64')
  const url = `data:${mimeOf(ext)};base64,${b64}`

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: 'user', content: [ { type: 'text', text: PROMPT }, { type: 'image_url', image_url: { url } } ] }
    ],
    max_tokens: 30,
    temperature: 0
  })

  let res
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 45000)
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
  const answer = normalizeAnswer(raw)
  if (!answer) throw new Error('empty answer; raw=' + JSON.stringify(raw))
  if (wantJson) console.log(JSON.stringify({ answer, raw: raw.trim() }))
  else console.log(answer)
}

main().catch((e) => {
  console.error('[solve-captcha] ' + (e?.message || e))
  process.exit(1)
})
