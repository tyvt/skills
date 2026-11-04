# 从 Mixin 中排除的解除限制子表分页未集成
在项目 苏州市房地产监测V3 中，解除限制子表被从 Mixin 中排除，在查看模式下使用了前端分页；已通过服务端分页修复。

## 问题根因
- `limitFormMixin.js` 在 `useHouseLimitPageForSubTable` 中排除了解除限制
- 这导致 `limitCancel.vue` 在查看模式下使用前端分页

## 解决方案
- 查看视图改为使用统一的服务端分页
- 解除限制调用 `POST /building/houseLimit/pageLimitRemoval` 并规范化行数据

## 验证与归属
- 验证证据: src=cursor session=c4ca2aed-d9fc-4952-9a00-b6fc2368c3dc
- 涉及文件: building/houseLimit/houseLimitConstants.js, limitFormMixin.js, limitCancel.vue, limitAdd.vue, components/LimitRecordDetailDialog.vue
- 所属项目: 苏州市房地产监测V3; session: c4ca2aed-d9fc-4952-9a00-b6fc2368c3dc

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "limit_cancel_subtable_paging",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->
