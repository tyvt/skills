# 存量业委会跳转漏拼ID致详情无记录
`committeeTable.vue` 的 `handleView` 在 `sourceType == 1` 跳转 `directDetail` 时未拼接 `committeeVersionId`，导致详情页无法获取记录。

## 问题根因
- `committeeTable.vue` 的 `handleView` 在 `sourceType == 1` 跳转 `directDetail` 时未拼接 `committeeVersionId`
- 详情页无法获取对应业委会记录

## 解决方案
- 对齐 `autonomy/record/components/index.vue` 跳转逻辑
- 存量与新增均在路径后拼接 `row.committeeVersionId`（存量 `directDetail`、新增 `detail`）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/078.md
- 涉及文件：publicQuery/complex/detail.vue、publicQuery/complex/components/committeeTable.vue、autonomy/record/components/enums.js、directDetail.vue、index.vue
- 所属项目：园区物管2.0；来源会话：6a98c35a-f7f0-46a2-9882-8721000ff3f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "committee_jump_missing_id",
  "source_extraction_id": "cf643038b5164e918e636fbbab3a205f",
  "version": 1,
  "memory_type": "entities"
}
-->