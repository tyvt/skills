
# platformConfig 发布公告按钮获取方式改造
产品2.0 的 zhi2-web-admin 中 candidateCollect detail.vue 的 `isShowPublishButton` 获取方式从 Vuex platformConfig 改为新接口获取。

## 原方案（已移除）
- 早期通过 Vuex `app.platformConfig` 的 `isShowPublishButton === true` 控制按钮展示，文件涉及 store/modules/app.js 与 detail.vue
- 原所属项目记录为园区物管2.0，来源会话 f61307bd-7d75-4fff-ad85-3385c42878ea

## 现方案（当前）
- 已移除 `computed` 里 `mapState` 映射，改为组件本地 `data` 字段
- 组件 `created()` 调用 `/autonomy/common/getCustomConfig`，从 `res.data.preparatoryGroup.isShowPublishButton` 赋值
- 接口异常时默认 `false`，保证按钮不误显示
- 关键位置：`detail.vue` 约 104-199 行，组件名 `OwnerCandidateCollectDetail`

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/autonomy/candidateCollect/components/detail.vue`
- 所属项目：产品2.0；来源会话：62402fac-2ae0-4b94-a392-c3ba8b3662d4；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_config_switch",
  "source_extraction_id": "da9bca3f195c4fd8a5e10c92635c7b91",
  "version": 2,
  "memory_type": "entities"
}
-->
