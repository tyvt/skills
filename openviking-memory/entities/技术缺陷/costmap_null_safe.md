# accountOpen业主页costMap空安全
列表/汇总区直接取response.costMap.sum在costMap为null时会抛错，需可选链与默认合并。

## 问题根因
- 原代码this.sum = response.costMap.sum，当costMap为null/undefined时抛出异常。

## 解决方案
- 用const sumFromApi = response.costMap?.sum；sumFromApi不为null时用{...defaultSum, ...sumFromApi}合并缺字段为0，否则用默认小计对象，与模板||0一致。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/index.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：43c3714d-1845-47df-a896-b1f6b3f03897

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "costmap_null_safe",
  "source_extraction_id": "b6e7b8a9944344a097a575400ce2397e",
  "version": 1,
  "memory_type": "entities"
}
-->