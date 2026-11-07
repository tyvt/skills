# 管理员详情启用状态文字展示修复
苏州市房地产监测V3 项目中修复公司管理员详情查看态（`companyAdmin/detail.vue`）启用状态误渲染为禁用复选框的问题，改为文字展示。
## 问题原因
- 查看态 `contentInfo` 将「启用状态」设为 `DetailTemplate` 的 `switch` 类型，渲染成禁用复选框，与旁侧纯文字字段不一致
## 修改内容
- 在 `detail.vue` 的 `contentInfo` 中改为默认 `text` 类型，按 `enableState` 显示「启用」或「停用」
- 若需「是/否」等文案可后续统一调整
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyAdmin/detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：245206a1-0f07-4e6e-9c61-1b4a9740a686；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_enable_text",
  "source_extraction_id": "304d2d75b409484e82e286701584b3b9",
  "version": 1,
  "memory_type": "entities"
}
-->