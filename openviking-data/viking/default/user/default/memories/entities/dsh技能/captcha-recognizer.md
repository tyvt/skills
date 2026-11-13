# captcha-recognizer 验证码识别技能
一个放置在 D:\repository\skills\captcha-recognizer 的 DSH 技能，用于识别登录验证码并自动计算算术结果。

## 功能
- 调用本地 magpie 视觉网关识别图片验证码（算术题自动算结果，文本题原样输出）
- 支持 `+ - * / × ÷` 算术，区分大小写文本
- 支持文件输入与 stdin base64 输入，`--json` 输出
- 结构：SKILL.md + scripts/solve-captcha.mjs（核心 OCR）+ scripts/fetch-captcha.mjs（可选取码）

## 接入方式
- 通过 junction 链 `C:\Users\Administrator\.dsh\skills\captcha-recognizer` → `D:\repository\skills\captcha-recognizer` 接入 DSH Web，无需重启实时生效
- 依赖 magpie 视觉网关 `127.0.0.1:3425/v1/chat/completions`，模型 `auto/hy3`，key=`magpie`

## 关键注意事项
- `/api/v3.0/code` 仅在 Playwright 页面上下文取到 JSON，服务端直连会返回 SPA 的 index.html
- 取码 uuid 必须同一会话复用
- 提交按钮需用原生 DOM click（`.login-button` 会被底部浮层拦截）

<!-- MEMORY_FIELDS
{
  "category": "DSH技能",
  "name": "captcha-recognizer",
  "source_extraction_id": "10cf9a4ad7c64ff3865e579565280499",
  "version": 1,
  "memory_type": "entities"
}
-->