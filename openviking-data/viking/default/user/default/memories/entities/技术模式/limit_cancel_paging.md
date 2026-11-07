# 解除限制详情页关联房屋子表分页接入
苏州市房地产监测V3 中为解除限制详情页「关联房屋详情」子表接入服务端分页接口。

## 问题原因
- `limitFormMixin.js` 中 `useHouseLimitPageForSubTable` 排除了解除限制（`!this.isCancel`），导致查看态仍用前端分页未调新接口

## 改动说明
- `limitFormMixin.js`：查看态统一走服务端分页；解除限制调 `POST /building/houseLimit/pageLimitRemoval`，新增限制调 `POST /building/houseLimit/page`
- 请求参数：`projectLimitId` + `pageNum` + `pageSize`；新增 `normalizeHouseLimitRemovalLineRow` 处理 `limitNumbers` 数组
- 查看态「涉及限制条数」优先读主表 `involveLimitCount` 或接口 `summary.limitQty`
- `limitCancel.vue`：查看态子表改为 `houseLimitLineData` + 服务端分页

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`limitFormMixin.js`、`limitCancel.vue`
- 所属项目：苏州市房地产监测V3；来源会话：c4ca2aed-d9fc-4952-9a00-b6fc2368c3dc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "limit_cancel_paging",
  "source_extraction_id": "8e0e61e5a3c841b68158d2e24ffb43c0",
  "version": 1,
  "memory_type": "entities"
}
-->