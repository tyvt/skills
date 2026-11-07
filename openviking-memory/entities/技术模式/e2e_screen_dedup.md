# 公司注册中冗余的 E2E 视频
在 zhi2-web-admin（2.0 产品）完整流程、UI 用例、返回导航以及合伙人 CRUD 中，重复了 Step1→3，产生了 12 个冗余视频。
## 问题根因
- 每个用例（完整流程、UI、返回、合伙人 CRUD）都独立地重做了 Step1→3。
## 解决方案
- 将 company-register.spec.js 合并为 2 个连续的会话。
- 将字段验证移至 company-register-fields.spec.js，且不录制视频。
- 生成 test-results/company-register-full.webm（~58s），保持断言覆盖率。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：1a0da812-3129-4757-ad86-ae58155f438e
- 验证证据: cursor session=1a0da812-3129-4757-ad86-ae58155f438e
- 涉及文件: package.json, playwright.config.js, real-api-flow.spec.js, register-helpers.js, real-api.spec.js, flow.spec.js, ui.spec.js, input-maxlength.spec.js
- 所属项目: 2-0; 代码基础: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_screen_dedup",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->