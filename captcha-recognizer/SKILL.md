---
name: captcha-recognizer
description: 识别图片验证码（算术型如 5+4=?、字母数字文本型）并用于自动化登录。当 E2E/脚本登录遇到图片验证码（ZU/苏州商品房平台 /api/v3.0/code 返回 base64 图片、captchaOnOff=true）时使用。提供 node 脚本经本地 magpie 视觉模型 OCR，返回算术结果或文本。
---

# 验证码识别 Captcha Recognizer

把图片验证码（**算术型** `5+4=?`、`12-3=?`、`6×7=?`，或**字母数字文本型**）识别出答案，供 Playwright/E2E、脚本自动登录使用。

核心能力：`scripts/solve-captcha.mjs` —— 调本地 **magpie 视觉网关** (`http://127.0.0.1:3425/v1/chat/completions`，模型 `auto/deepseek-v4.1-flash`) 做 OCR，算术题自动算结果。

## 何时用

- 登录页有图片验证码，脚本/E2E 需要自动填。
- 已知目标：苏州市房地产综合服务平台（商品房）`/api/v3.0/code` 返回 `{ code, data: base64图片, captchaOnOff:true, uuid }`，验证码为算术图 `a+b=?`，需填运算结果 + `uuid`。
- 其它带算术/文本图片验证码的站点同样适用。

## 前置

- magpie 视觉网关可用：`127.0.0.1:3425` 上有支持图片输入的模型（`auto/deepseek-v4.1-flash`；**勿用 `auto/hy3`，hy3 不支持识图**）。
- key：`MAGPIE_GATEWAY_KEY`（本地默认值 `magpie`，脚本已内置回退）。
- Node ≥ 18（用内置 fetch）。

## 用法一：直接识别一张验证码图片

```bash
# 文件
node scripts/solve-captcha.mjs D:/path/captcha.jpg          # 打印答案，如 10
node scripts/solve-captcha.mjs D:/path/captcha.png --json   # {"answer":"10","raw":"10"}

# stdin（base64，可带 data: 前缀）
echo "<base64...>" | node scripts/solve-captcha.mjs -
```

环境变量：
- `CAPTCHA_VISION_MODEL` 默认 `auto/deepseek-v4.1-flash`
- `CAPTCHA_GATEWAY_URL` 默认 `http://127.0.0.1:3425/v1/chat/completions`
- `MAGPIE_GATEWAY_KEY` 默认 `magpie`

退出码 0 成功；1 失败（stderr 有原因）。

## 用法二：配合 E2E 登录（推荐，最可靠）

在 Playwright spec 里，从页面上下文拿验证码（保证同源、同 uuid），落盘 → 调脚本识别 → 回填提交。关键点（已验证）：

1. **抓 `/code` 响应**得到本次 `uuid` 与 base64 图片：
   ```js
   let codeBody = null
   page.on('response', async (r) => { if (r.url().includes('/code')) { try { codeBody = await r.json() } catch {} } })
   ```
2. **落盘图片**：`fs.writeFileSync('cap.jpg', Buffer.from(String(codeBody.data).replace(/^data:image\/\w+;base64,/,''),'base64'))`
3. **识别**：`execFileSync('node', ['<skill>/scripts/solve-captcha.mjs','cap.jpg'])` 得答案。
   （若走人工/agent 视觉：直接读该图片也可，但脚本无需人工。）
4. **回填并提交**：
   - 填用户名、密码、`input[placeholder="请输入验证码"]`。
   - **结算按钮用原生 DOM click**：`page.locator('.login-button').evaluate(el => el.click())`。
     普通 `click()` 常被底部浮层（`.el-login-footer`）拦截，`force:true` 也可能不触发 Vue handler。
   - 等登录 POST 返回 `code:200`。

> 说明：`/api/v3.0/code` 直连（服务端 fetch）常被返回 SPA 的 index.html，**必须在页面上下文（Playwright `page`）里取**，才能拿到 JSON。

`scripts/fetch-captcha.mjs` 是可选便捷脚本（`CAPTCHA_BASE` / `CAPTCHA_COOKIE`），仅在目标站点允许直接 fetch 时可用。

## 常见坑

- 算术题答案要**算出来**（`5+4=?`→`9`），不是回显 `5+4`。脚本会优先解析算式求值。
- 乘号 `×/*`、除号 `÷//` 都要处理；除法结果四舍五入。
- uuid 必须与图片**同一次**下发；若页面重载会刷新验证码，导致 uuid/img 不一致 → 登录失败。识别与提交要在同一页面会话内完成。
- 文本型验证码保留大小写。

## 验证

```bash
cd scripts
node solve-captcha.mjs D:/一些/验证码.jpg --json
```
