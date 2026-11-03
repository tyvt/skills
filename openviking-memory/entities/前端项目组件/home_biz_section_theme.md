# 门户首页业务板块主题色
新增或改色首页业务板块时需同时改两处配置并保持同步，不要散落在 HomeBizSection 硬编码。
## 配置位置
- config/homeLayout.js 的 `SECTION_THEMES` 配置主题键（如面积管理 theme=cyan、经纪机构新增 brokerAgency），实际色值与 `HomeBizSection` 内 `TAG_COLOR_BY_THEME` 对齐（cyan → #026AD9、brokerAgency → #7B00D9）。
- HomeBizSection.vue 内 `TAG_COLOR_BY_THEME`/主题映射、入口卡片背景与图标区浅底色（purple 对应 #f9f2fc、#7B00D9）。
## 注意事项
- 板块展示与权限由后端 functionCode（如经纪机构 agency）与接口菜单配置决定，前端不要硬编码互斥。
- 接口 functionCode 与配置键不一致时，在 `mapFlowsFromApi` 用 `SECTION_TITLE_THEMES` 按 `functionName`（如「经纪机构」）兜底套用主题，必要时再补 functionCode 别名。
- 新增板块主题时同步扩展 `TAG_COLOR_BY_THEME` 与图标区样式映射。
- 改完刷新 /#/index 验收标签色与卡片底。
## 验证与归属
- 验证证据：会话 50a4a697 用户要求面积管理改 #026AD9、经纪机构改 #7B00D9；实现为面积管理 theme 改 cyan，经纪机构新增 brokerAgency 主题 #7B00D9，functionCode 非 brokerAgency 时靠 SECTION_TITLE_THEMES 按名称兜底。
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/views/home/components/HomeBizSection.vue、zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts
- 所属项目：门户；来源会话 50a4a697-6901-4e3d-8d06-01bcbaac09ac；代码基线 f489349。

<!-- MEMORY_FIELDS
{
  "category": "前端项目组件",
  "name": "home_biz_section_theme",
  "source_extraction_id": "731ed82de4844f9c8dc4884c40a5bb81",
  "version": 2,
  "memory_type": "entities"
}
-->