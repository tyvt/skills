import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
// fetch fresh captcha from the suzhou platform code api, save image, print uuid
const base = process.env.CAPTCHA_BASE || 'http://58.210.252.230:9002'
async function main() {
  const res = await fetch(base + '/api/v3.0/code', {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Referer: base + '/',
      ...(process.env.CAPTCHA_COOKIE ? { Cookie: process.env.CAPTCHA_COOKIE } : {})
    }
  })
  const ct = res.headers.get('content-type') || ''
  if (!ct.includes('json')) {
    const txt = await res.text()
    throw new Error('code api returned non-JSON (' + ct + '): ' + txt.slice(0, 120))
  }
  const j = await res.json()
  const data = String(j.data).replace(/^data:image\/\w+;base64,/, '')
  const out = process.argv[2] || path.join(os.tmpdir(), 'fresh_captcha.jpg')
  fs.writeFileSync(out, Buffer.from(data, 'base64'))
  fs.writeFileSync(out.replace(/\.jpg$/, '_uuid.txt'), j.uuid || '')
  console.log('saved', out, 'uuid=' + (j.uuid || ''), 'captchaOnOff=' + j.captchaOnOff)
}
main().catch(e => { console.error(e.message); process.exit(1) })
