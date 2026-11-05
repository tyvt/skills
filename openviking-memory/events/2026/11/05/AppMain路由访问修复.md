# Summary
2026-11-05，zhi2-web-admin 修复 layout/components/AppMain.vue：原代码用 router.currentRoute.query.formMode 访问路由参数，在 Vue Router 4 中 router.currentRoute 是 ref 而非路由对象，导致 undefined；改为使用组件内 this.$route 并加空值保护。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】fact
【标题】L71: created() { L72: // 监
【内容】这个报错是因为在 `AppMain.vue` 里用的是 `router.currentRoute.query.formMode`： ```12:21:zhi2-web-admin/src/layout/components/AppMain.vue computed { formMode() { return router.currentRoute.query.formMode } } ``` 在 Vue Router 4 里，`router.currentRoute` 是一个 `ref`，并不是直接的路由对象，所以这样访问时会出现 `undefined`。 我已经改成直接使用组件自带的 `this.$route`，并加上空值保护： ```8:42:zhi2-web-admin/src/layout/components/AppMain.vue <script> export default { name: 'AppMain', mounted() { this.makeWatermark({ loginName: this.$store.state.user.name || sessionStorage.getItem('name'), userName: this.$store.state.user.nickName || sessionStorage.getItem('name
【验证证据】extracted source=cursor project=2-0
【涉及文件】`AppMain.vue ; ```12:21:zhi2-web-admin/src/layout/components/AppMain.vue ; ```8:42:zhi2-web-admin/src/layout/components/AppMain.vue ; @zhi2-web-admin/src/components/global-table-config/global-table-config.vue
【所属项目】2-0
【来源会话ID】10b68c5e-e8dd-4ad6-b706-b4db9da0103d
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "AppMain路由访问修复",
  "goal": "修复路由query访问报错",
  "summary": "2026-11-05，zhi2-web-admin 修复 layout/components/AppMain.vue：原代码用 router.currentRoute.query.formMode 访问路由参数，在 Vue Router 4 中 router.currentRoute 是 ref 而非路由对象，导致 undefined；改为使用组件内 this.$route 并加空值保护。",
  "ranges": "13-20",
  "source_extraction_id": "250d9c7abad647a092e8e1f658ea7961",
  "version": 1,
  "memory_type": "events"
}
-->