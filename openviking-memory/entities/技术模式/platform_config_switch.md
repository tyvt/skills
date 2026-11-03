# platformConfig 功能开关默认隐藏
跨页面按钮展示可挂在 Vuex app.platformConfig，用严格等于 true 判定避免后端未下发时误开敏感操作。

## 问题背景
- 跨页面按钮（如「发布公告」）是否展示需统一控制在 Vuex app.platformConfig
- 接口 /system/platformConfig/getInfo 对齐，初始对象声明 isShowPublishButton: undefined

## 解决方案
- 页面用 mapState 取出后，v-if 最前面加 isShowPublishButton === true，再叠原有 bizState/msgId/征集类型/publishState 等业务条件
- 严格等于 true 时未配置或 undefined/false 一律不显示，避免后端未下发时误开敏感操作
- 若产品要求「未配置则沿用旧逻辑」，改为 isShowPublishButton !== false 并文档化

## 验证与归属
- 验证：会话 f61307bd，app.js 增 isShowPublishButton，candidateCollect detail 发布公告按钮仅在 === true 且原条件满足时显示
- 涉及文件：zhi2-web-admin/src/store/modules/app.js、zhi2-web-admin/src/views/autonomy/candidateCollect/components/detail.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：f61307bd-7d75-4fff-ad85-3385c42878ea

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_config_switch",
  "source_extraction_id": "fbe34a26be854f6a8e62e198fe539062",
  "version": 1,
  "memory_type": "entities"
}
-->