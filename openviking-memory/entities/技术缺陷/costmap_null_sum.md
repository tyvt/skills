# costMap空值未防护致sum读取报错
维保开户模块中 response.costMap 为 null/undefined 时直接读取 sum 会报错，需可选链与默认合并兜底。

## 问题根因
- response.costMap 为 null/undefined 时直接读取 sum 字段会抛错。

## 解决方案
- 使用可选链 response.costMap?.sum 读取。
- 为 null/undefined 时采用默认小计对象。
- 用 {...defaultSum, ...sumFromApi} 合并，缺字段补 0。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：OpeningBuildingDialog.vue、@zhi2-web-admin/src/views/maintenance/accountOpen/owner/index.vue
- 所属项目：园区物管2.0（项目2-0）
- 验证证据：src=2-0/021.md
- 来源会话：43c3714d-1845-47df-a896-b1f6b3f03897

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "costmap_null_sum",
  "source_extraction_id": "a5b508af35ef44519ddeab11320e8cba",
  "version": 1,
  "memory_type": "entities"
}
-->