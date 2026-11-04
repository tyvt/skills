# 详情页整体滚动方式全局收敛
苏州市房地产监测V3 修复承办银行页等「表单+底部子表块」结构被 `overflow:hidden` 裁掉的问题，全局统一为整页滚动。

## 根因
- `styles/index.scss` 中 `.detail-container` 默认 `height:100%; overflow:hidden`，`.detail-from-container` 自带 `overflow-y:auto`
- 原 CSS 仅覆盖「表单+底部 Tab」与「无表单区」两种结构，「表单+底部子表块」无规则导致列表被裁

## 修复内容
- 仅改动 `zhi2-web-admin/src/styles/index.scss`（+29/-8，无模板改动）
- 将「整页滚动」收敛为三个互斥触发条件共用同一套声明
- 未纳入规则的结构示例：`property/spFeeBill/components/import.vue`

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：c1906245-6943-4895-a140-51bca0018684；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_scroll_unify",
  "source_extraction_id": "8b3fd04925784d4a9e921898df472afd",
  "version": 1,
  "memory_type": "entities"
}
-->