# 预售许可申请详情按图1设计稿改造
苏州市房地产监测V3 改造预售许可申请详情，去除重复的申请要件展示，按图1 设计稿只保留方案摘要。

## 原因
- 页面两块同拉一套申请要件（ysxksq）：「预售方案」用 AnnexUpload 未传 bus 显示纵向折叠列表；「要件上传」用 AppendixPackageSection + 网格横向 Tab
- 同一批材料出现两次仅展示形式不同
- 按图1，「预售方案」只应含状态说明 + 维护/查看 +（可选）方案字段摘要；方案要件在方案维护独立页维护

## 修改内容
- 从 `PermitPlanPanel.vue` 去掉内嵌「方案要件」AnnexUpload，保留方案摘要 DetailTemplate 和顶栏「维护/查看」
- 刷新后详情页仅剩「要件上传」网格

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：4544dadc-80b6-40ef-8002-3d6ab970a0b4
- 涉及文件：PermitPlanPanel.vue、presale/permit/plan/detail.vue、company/institutionRegister/detail.vue
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_presale_redesign",
  "source_extraction_id": "1c43be6e1763445fbf0f4d5695251802",
  "version": 1,
  "memory_type": "entities"
}
-->