# 预售方案维护页 Tab 上内边距修复
苏州市房地产监测V3 项目在预售方案维护页 `PresalePlanFillForm` 中为 Tab 栏增加 16px 上内边距，与预售申请详情里「楼幢信息」等区块的 Tab 顶距一致。

## 修改内容
- `PresalePlanFillForm.vue` 的 `.plan-fill-tabs :deep(.tabs-bar)` 增加 16px 上内边距（依据 `index.scss` 中 `tabs-bar` 规范）
- 现售方案填报 `CashsalePlanFillForm.vue` 已同步修改，避免两页样式不一致

## 效果与说明
- 刷新方案维护页后，「要件上传」与下方 Tab 之间会有更明显的留白
- 若仍偏紧可进一步加大到 24px 等期望间距

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：4888d8ae-3851-4690-936f-b2202e52f6b9
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_tab_padding",
  "source_extraction_id": "b6820f9cb17546e1b9b6efc01324a33b",
  "version": 1,
  "memory_type": "entities"
}
-->