# pageOptionalComplex接口过滤约定
园区物管2.0 benefit模块详情页可选资源分页接口必须按当前项目过滤的约定。
## 背景
- benefit模块公共经营收益详情页内可选资源分页接口路径以/pageOptionalComplex结尾
- 包括广告位/场地/泊位/公房detail页选择列表
- 接口侧不会自动按上下文过滤，需前端显式传项目ID
## 做法
- filterParams固定加 complexId: this.$store.state.user.currentProjectId
- currentProjectId由bProjectDialog.vue的SET_CURRENT_PROJECT mutation写入store
- 新增同族页面选择弹窗/接口同样带上避免漏过滤
## 相关文件
- zhi2-web-admin/src/views/benefit/pubAdvertiseSpace/detail.vue等四个detail.vue
- zhi2-web-admin/src/store/modules/user.js
- 来源会话e974a409-a954-44ae-98f7-abed1b7bea16，代码基线7fe15a8cb

<!-- MEMORY_FIELDS
{
  "category": "前端接口约定",
  "name": "pageOptionalComplex接口过滤约定",
  "source_extraction_id": "b2f95f5cac604457913ee8b52f946b19",
  "version": 1,
  "memory_type": "entities"
}
-->