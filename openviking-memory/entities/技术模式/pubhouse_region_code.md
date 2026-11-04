# 修复 pubHouse 中的区域代码

在提交 `/benefit/pubHouse` 时缺少 `regionCode`，且 `subdistrict`/`community` 被转换为名称，但后端需要代码。

## 描述
- 在 `index.vue` 和 `detail.vue` 中添加了 `regionCode`。
- 选择物业管理区域时，直接赋值代码。
- 在 B 端，默认使用 `project.region` 填充 `regionCode`。

## 关系
- 涉及文件: `benefit/pubHouse/index.vue`, `benefit/pubHouse/components/pubHouseDialog.vue`, `benefit/pubHouse/detail.vue`, `benefit/pubVenue/detail.vue`, `benefit/pubParkingSpace/detail.vue`.
- 来源: cursor 会话 b86fe772-d48c-4f14-83ed-0fae40ff6861.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubhouse_region_code",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->