# 登录图形验证码E2E识别不可靠
zhi2-web-admin 登录 E2E 用 Tesseract+规则纠错识别扭曲算式图常失败，测试环境应返回 answer 或降难度。
## 问题现象
- login.spec.js 用 OCR 识别 /code 返回的 GIF 算式验证码自动登录，常 skip「OCR 未识别到有效验证码」或识别结果为 yee/CW 等无数字串。
- 验证码为纯数字运算图，但扭曲/噪声下 Tesseract 多轮 PSM+sharp 预处理仍常看不出算式。
- 登录页若过早识别会在图片未渲染时拿到空图。
## 识别逻辑细节
- `parseCaptchaText` 预处理先做通用替换：`O→0, L/I→1, S→5, Z→2, B→8, g/q→9` 等。
- 用 `raw.replace(/[^0-9+\-*/=?A-Za-z]/g, '')` 过滤非字母数字运算符，再尝试提取「一位数字 运算符 一位数字」。
- 像 `yee`、`CW` 去掉非数字运算符后变空串或纯字母，故返回空。
- 针对已知模式（`ELC`, `ENS`, `ETN`, `NA` 等）做字母→数字映射（如 `E→8`、`L→*`、`C→1`，`ENS→8-5`）再试，但仍可能因无数字失败。

## 解决方案
- 测试环境优先让 /code 增加 answer 字段或专用 /test/code，E2E 有 answer 则直填并跳过 OCR。
- 也可让测试环境后端将 /code 返回固定值（如 1234）或弱化校验，而非前端 OCR 识别，避免实现复杂且偏离 E2E 用户流程目标。
- 或测试环境换无扭曲简单算式图；OCR 仅作无 answer 时的兜底，且必须 wait 验证码 img/src 就绪后再截屏。
## 验证与归属
- 验证：会话 44f9e8a5 诉求 3–6 与最终结论：三字段未填、识别内容 yee/CW、图片未出现就识别；结论建议测试环境 answer + 前端预留 res.answer。
- 涉及文件：zhi2-web-admin/tests/e2e/login.spec.js、assets/views/login.vue；所属项目：2-0；来源会话：44f9e8a5-1336-42c2-9226-9d3dc33ccb9a
- 另据会话 be5b577d-159c-4126-a301-a93c2e1de71f：根因 OCR 不稳定且实现复杂，测试环境后端 /code 返回固定值或弱化校验；涉及 tesseract.js、res.js；代码基线 none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_ocr_workflow",
  "source_extraction_id": "eec1849560e54b0ab2f531caec03b1b3",
  "version": 3,
  "memory_type": "entities"
}
-->