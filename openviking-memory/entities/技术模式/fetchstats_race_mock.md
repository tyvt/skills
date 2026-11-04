# 首页 fetchStats 竞态与 MOCK 回落语义
门户首页 homeDataMixin.fetchStats 存在 layoutVariant 切换竞态，且空 stats 与 catch 回落 MOCK 语义不同。

## 竞态与回落
- homeDataMixin.fetchStats 在权限加载前后 layoutVariant 可能变化，若无请求序号/取消，后返回的统计可能盖错布局
- homeLayout.normalizeStatsFromApi 在接口 200 但 stats 为空数组时回落 MOCK_STATS，与 catch() 走 mock 不是同一语义（前者像「接口成功但无数据」，后者是失败兜底）
- 改开发者侧栏统计或 MOCK_STATS.developer 时要分清这两种路径，避免线上空数据被展示成假数

## 验证与归属
- 验证：审查说明 fetchStats 无请求序号/取消，权限加载前后 layoutVariant 变化可能竞态；接口 200 且 stats:[] 时 normalizeStatsFromApi 回落 MOCK，与 catch() 用 mock 不同语义
- 涉及文件：zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/views/home/components/HomeDeveloperStatsRow.vue、zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- 所属项目：门户；来源会话ID：d84d57ba-71c5-494d-8381-3d716e160510；代码基线：50578e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fetchstats_race_mock",
  "source_extraction_id": "9bff8e575e8c477cbc2cfba8158e77d8",
  "version": 1,
  "memory_type": "entities"
}
-->