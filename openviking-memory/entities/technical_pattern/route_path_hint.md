# 路由名首段作pathHint致合同缴款页误命中
`buildDetailNavigation` 取路由 name 首段为 `pathHint`，合同缴款与定金缴款共用 `notice/detail` 导致解析命中定金详情。

## 问题根因
- `buildDetailNavigation` 取路由 `name` 首段作为 `pathHint`
- 合同缴款与定金缴款共用 `notice/detail` 路由模式
- 解析时命中定金详情而非合同缴款详情

## 修复方案
- `zhi2-web-admin/src/utils/ruoyi.js` 新增 `resolveListRoutePathHint` 按路由模式提取区分度 hint
- 示例：`Notice/CONTRACT_PAYMENT_NOTE` → `CONTRACT_PAYMENT_NOTE`
- 新增验证脚本 `zhi2-web-admin/scripts/resolve-list-route-path-hint.test.mjs` 覆盖

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/061.md
- 涉及文件：路由信息.json、supervision/deposit/notice/index.vue、notice/detail.vue、refund/index.vue、refund/detail.vue、mixins/listMixins.js、mixins/detailMixins.js、utils/ruoyi.js
- 所属项目：苏州市房地产监测V3；来源会话：b58596af-97c9-4eba-bfba-cac9335e72f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "route_path_hint",
  "source_extraction_id": "914335400ee24df19f7a1f642d838c6f",
  "version": 1,
  "memory_type": "entities"
}
-->