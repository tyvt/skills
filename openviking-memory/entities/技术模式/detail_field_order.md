# DetailTemplate 顺序和字段不一致
building/project/detail.vue 和 projectChange/detail.vue 中的 DetailTemplate(contentInfo) 在顺序和字段上与截图不一致。

## 问题
- DetailTemplate(contentInfo) 中的字段顺序与截图不对应。
- 缺少诸如 landPlotName、土地使用责任人名称和备注等字段。

## 解决方案
- 根据查看页面重新排序了 contentInfo。
- 在末尾添加了：地块名称、拥有土地使用权的人员和备注。
- Endpoints 和编辑状态未被更改。

## 文件和来源
- 涉及文件: building/project/detail.vue; building/projectChange/detail.vue.
- 验证证据: cursor会话 ff097cf6-67f8-45c1-8b04-753136cfda5d.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_field_order",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->