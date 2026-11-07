# 路由name首段作hint致合同缴款定金详情解析错误
苏州市房地产监测V3 的 zhi2-web-admin 中 buildDetailNavigation 使用路由 name 第一段作 pathHint，导致合同缴款与定金缴款共用路由时解析错误。

## 问题根因
- buildDetailNavigation 使用路由 name 第一段作 pathHint
- 合同缴款与定金缴款共用 notice/detail，解析时总是命中首个详情路由（定金）

## 修复方案
- 新增 zhi2-web-admin/src/utils/ruoyi.js 的 resolveListRoutePathHint 按路由模式提取区分度 hint（如 Notice/CONTRACT_PAYMENT_NOTE → CONTRACT_PAYMENT_NOTE）
- 补充 zhi2-web-admin/scripts/resolve-list-route-path-hint.test.mjs 验证

## 涉及文件
- zhi2-web-admin/src/utils/ruoyi.js
- zhi2-web-admin/scripts/resolve-list-route-path-hint.test.mjs
- zhi2-web-admin/src/views/supervision/deposit/notice/index.vue、detail.vue
- zhi2-web-admin/src/views/supervision/deposit/refund/index.vue、detail.vue
- zhi2-web-admin/src/mixins/listMixins.js、detailMixins.js
- 路由信息.json

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/112.md
- 来源会话：b58596af-97c9-4eba-bfba-cac9335e72f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_hint_conflict",
  "source_extraction_id": "09a31a0689854a169928cbe032f1d3df",
  "version": 1,
  "memory_type": "entities"
}
-->