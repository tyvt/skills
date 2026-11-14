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

## 评测与优化（2026-11-14）
- 2026-11-14 实测根因：默认模型 `auto/hy3` 早在 2026-11-09 被确认不支持图像识别（已剔除全部视觉基准），却为 solve-captcha.mjs 第21行默认模型，SKILL.md 亦误写"hy3 支持识图"
- 本地 magpie 网关实测：正常噪声 24 张 `auto/hy3`=70.8%（17/24）、`auto/deepseek-v4.1-flash`=100%（24/24）；极端噪声 30 张两者均降至约 53-57%，叠加多数投票(K=5)可回升至 73.3%
- 优化杠杆：P0 换默认模型为 `auto/deepseek-v4.1-flash`（零成本 70.8%→100%）；P1 多数投票(K=3)+合法性校验+可选 2-3×上采样；P2 识别失败刷新验证码重试+多模型 fallback
- 评估报告存于 `D:epository\skills\.tmp_cap\captcha-evaluation.md`，纯评估未改代码，落地改代码需走计划→送审→确认流程

<!-- MEMORY_FIELDS
{
  "category": "DSH技能",
  "name": "captcha-recognizer",
  "source_extraction_id": "c439850a573546f29b3f2658258f1979",
  "version": 2,
  "memory_type": "entities"
}
-->