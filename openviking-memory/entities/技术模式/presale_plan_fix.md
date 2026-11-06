
# 预售方案保存后详情ID解析修复
苏州市房地产监测V3 中预售方案（presale plan）保存成功后详情页无法正确解析方案 ID 的问题已修复，后端 `PresalePlanSaveVo` 与前端对齐。

## 字段映射
- `presalePlanId`：方案 ID（`extractPlanId` 已兼容 `presalePlanId` / `planId`）
- `planDocSite`：PDF 地址（`resolvePlanDocUrl` / `buildPlanPageResult` 读取）

## 修复内容
- `presale/permit/plan/detail.vue`：保存成功后用 `extractPlanId(res.data)` 解析 `presalePlanId`（原先 `resolveResponseId(res, 'planId')` 读不到该字段）
- E2E helpers：新增 `extractPlanIdFromSaveResponse`，从 `presalePlanId` 取方案 ID
- 完整数据流：POST /presale/permit/plan/save → { presalePlanId, planDocSite } → buildPlanPageResult() 写入 sessionStorage → applyPlanPageResult() 合并到 form.plan / form.p

## 验证与归属
- 涉及文件：`presale/permit/plan/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：77643a80-744f-419d-abfc-21a4685e8d9f


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_fix",
  "source_extraction_id": "96ca86b0c3a64f9d81fb857532a1c43b",
  "version": 1,
  "memory_type": "entities"
}
-->