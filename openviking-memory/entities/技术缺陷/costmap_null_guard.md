
# 开户费用小计空值防护
维保开户模块中 response.costMap 为 null/undefined 或 sum 为 null/undefined 时做防护，避免报错并使用默认小计。

## 问题根因
- response.costMap 为 null/undefined 时直接读 sum 会抛错
- costMap 存在但 sum 为 null/undefined 时取值异常

## 解决方案
- response.costMap?.sum 为 undefined 时不抛错
- costMap 存在但 sum 为 null/undefined 时，sumFromApi != null 为假，使用默认小计对象
- 接口正常返回 sum 时，用 { ...defaultSum, ...sumFromApi } 合并，缺字段仍用 0，与模板 || 0 行为一致
- 项目已有可选链用法（如 OpeningBuildingDialog.vue），与当前写法一致
- 当前文件 TS 插件告警为原有问题，非本次修改引入

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/index.vue、OpeningBuildingDialog.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：43c3714d-1845-47df-a896-b1f6b3f03897


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "costmap_null_guard",
  "source_extraction_id": "a549c01781a14f8d92d24a4948405f59",
  "version": 1,
  "memory_type": "entities"
}
-->