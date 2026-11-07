# 企业入网认证经营范围查看态展示调整
苏州市房地产监测V3 调整企业入网认证（`AgencyEntryNetworkSections.vue`）「经营范围」查看态展示。

## 改动说明
- 查看模式：「经营范围」从三列栅格移出，底部用整行禁用 `zs-textarea`（3 行）展示，长文本易读
- 编辑模式：逻辑不变，仍可编辑保存 `businessScope`
- 工具函数：在 `agencyBasicInfoContent.js` 新增 `omitBusinessScopeDetailItems`，避免栅格与底部重复显示（租赁机构查看态同样适用）

## 注意事项
- 若接口 `entryNetwork/detail` 未返回 `businessScope`，页面显示「-」，需后端带上该字段

## 验证与归属
- 刷新页面可见新布局；有数据时出现在底部多行文本框
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`AgencyEntryNetworkSections.vue`、`agencyBasicInfoContent.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：615d361b-0113-4fce-8ba9-aa682f572ce3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_business_scope_view_fix",
  "source_extraction_id": "6a00dea484364694864f56aa0b0b9ba2",
  "version": 1,
  "memory_type": "entities"
}
-->