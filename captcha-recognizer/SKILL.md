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
node scripts/solve-captcha.mjs D:/path/captcha.png --json   # {"answer":"10","raw":"10","confidence":"high"}

# 抗噪（可选）：K 次采样取众数、放大提示、覆盖模型
node scripts/solve-captcha.mjs cap.jpg --vote=3 --upscale=2 --json

# stdin（base64，可带 data: 前缀）
echo "<base64...>" | node scripts/solve-captcha.mjs -
```

可选参数（默认无参数 = 单次识别，输出 answer，完全向后兼容）：
- `--vote=K`：K 次独立识别取众数（K≥1，默认 1）。K>1 时 temperature=0.3 增加采样多样性；平票按 confidence 等级优先。
- `--upscale=N`：与 vote 合并生效（`vote = max(vote, N)`），并在提示中强调放大图片细节。
- `--model=NAME`：覆盖 `CAPTCHA_VISION_MODEL`/默认值。

`--json` 输出：`answer`（答案）、`raw`（模型原始回显）、`confidence`（`high`=从算式自算 / `medium`=纯结果或文本 / `low`=离谱值，answer 可能为空）。

环境变量：
- `CAPTCHA_VISION_MODEL` 默认 `auto/deepseek-v4.1-flash`
- `CAPTCHA_GATEWAY_URL` 默认 `http://127.0.0.1:3425/v1/chat/completions`
- `MAGPIE_GATEWAY_KEY` 默认 `magpie`

退出码 0 成功；1 失败（stderr 有原因）。

## 用法二：配合 E2E 登录（推荐，最可靠）

在 Playwright spec 里，从页面上下文拿验证码（保证同源、同 uuid），落盘 → 调脚本识别 → 回填提交 → **判定结果，失败则换图重试**。这是闭环流程，单点识别再准也有偶发失败，必须靠流程兜底。

### 单轮步骤

1. **绑定本次 `/code` 响应**（用一次性 promise，避免多次 `/code` 覆盖 `codeBody`）：
   ```js
   const codeP = page.waitForResponse(r => r.url().includes('/code'))
   // 触发取码：通常 goto 登录页或点"换一张"即会请求 /code
   const codeBody = await (await codeP).json()   // { data: base64, uuid, captchaOnOff }
   ```
   若页面加载时就取码，需在 `goto` **之前**挂 `waitForResponse`；不要用全局 `page.on('response')` 赋值后延迟读——多次 `/code` 会让 uuid 与图片错配（常见坑:68）。
2. **落盘图片**：`fs.writeFileSync('cap.jpg', Buffer.from(String(codeBody.data).replace(/^data:image\/\w+;base64,/,''),'base64'))`
3. **识别**：`execFileSync('node', ['<skill>/scripts/solve-captcha.mjs','cap.jpg','--json'])` → `{ answer, raw, confidence }`。
   - `confidence=high`：从算式自算（最可信）；`medium`：纯结果/文本；`low`：离谱值（如 >9999），`answer` 可能为空。
   - 抗噪可选 `--vote=3`（K 次采样取众数，平票按 confidence 优先）与 `--upscale=2`（放大提示 + 采样）；默认无参数仍单次识别、输出 answer，完全向后兼容。
4. **回填并提交**：
   - 填用户名、密码、`input[placeholder="请输入验证码"]`。
   - **结算按钮用原生 DOM click**：`page.locator('.login-button').evaluate(el => el.click())`。
     普通 `click()` 常被底部浮层（`.el-login-footer`）拦截，`force:true` 也可能不触发 Vue handler。
5. **判定响应**（软失败 vs 硬失败）：
   - **硬失败**：识别脚本退出码 1（网关不可达 / 空答案），或登录请求异常/超时。
   - **软失败**：登录 POST 返回 `code != 200`、或响应含"验证码错误/验证码不正确"等字样——此时 answer 看似正常但识别错了（典型：`X-1?=` 被读成负数）。**必须走重试，不要原地反复提交。**

### 失败重试闭环（上限 2-3 次）

```
for attempt in 1..3:
    codeBody = await 取本次 /code（新 uuid + 新图）   # 关键：必须重新取码换图
    answer   = 识别(codeBody)
    if answer 为空/confidence=low: continue           # 识别层失败，换新图
    回填(answer) + 提交
    if 登录响应 code==200: 成功, break
    else: continue                                    # 软失败，换新图重试
if 三次都失败: 报错退出，人工介入
```

> 每次重试都要**重新取 `/code` 拿新 uuid + 新图**；绝不能拿旧图/旧 uuid 重填（同图大概率同错，uuid 可能已失效）。

> 说明：`/api/v3.0/code` 直连（服务端 fetch）常被返回 SPA 的 index.html，**必须在页面上下文（Playwright `page`）里取**，才能拿到 JSON。

`scripts/fetch-captcha.mjs` 是可选便捷脚本（`CAPTCHA_BASE` / `CAPTCHA_COOKIE`），仅在目标站点允许直接 fetch 时可用。

## 常见坑

- 算术题答案要**算出来**（`5+4=?`→`9`），不是回显 `5+4`。脚本对回显算式自行求值（confidence=high），不采信模型给的结果——这能纠正"认错数字再算对"（如 `8+9=105`→`17`）。
- 乘号 `×/*`、除号 `÷//` 都要处理；除法结果四舍五入。操作数可为负数（如 `3 + -1`）。
- uuid 必须与图片**同一次**下发；若页面重载会刷新验证码，导致 uuid/img 不一致 → 登录失败。识别与提交要在同一页面会话内完成。
- **软失败最隐蔽**：退出码 0、答案看似正常，但登录 `code != 200`。判定依据是**登录响应码/文案**，不是脚本退出码；命中就换新图重试。
- **结果自检**：算术结果通常落在小范围（脚本对 |值|>9999 判 low）。若 answer 明显离谱或为空，直接换图，别提交。
- 极端噪声图单次准确率约 53%；开 `--vote=5` 多数投票可回升到 ~73%。代价是 K 次网关调用，按场景权衡。
- 文本型验证码保留大小写。

## 验证

```bash
cd scripts
node solve-captcha.mjs D:/一些/验证码.jpg --json
```
