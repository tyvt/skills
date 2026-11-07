# 切换小区刷新后查询参数丢失
Navbar 切换小区后刷新页面，各业务列表页（67 处）查询条件 complexId/projectId/parentDeptId 全部丢失，需 getter+localStorage 恢复。

## 现象
- Navbar 切换当前小区后刷新页面，property/benefit/autonomy 等 67 处业务列表页查询参数全部丢失。

## 根因
- 页面直接读 this.$store.state.user.currentProjectId，刷新后 Vuex 重置，created 阶段发请求时 state 尚未恢复，参数为 undefined。

## 解决方案
- 新增 utils/projectContext.js 集中处理 localStorage 小区信息读取、清理与兜底解析。
- store/modules/user.js 应用启动时即从 localStorage 初始化 currentProject/currentProjectId，不等 GetInfo。
- getters.js 增加全局 getter currentProjectId/currentProject，state 为空回退 localStorage。
- 全项目 67 处直读 $store.state.user.currentProjectId 批量替换为 $store.getters.currentProjectId（Navbar 用 currentProject，alert/detailB 的 watch 改基于 computed）。
- 套路：任何存 store 的全局上下文都要有 localStorage 恢复 + getter 兜底，页面禁止直读 state。

## 关联信息
- 涉及文件：src/utils/projectContext.js、src/store/modules/user.js、src/store/getters.js、src/layout/components/Navbar.vue。
- 所属项目：园区物管2.0；来源会话：c38a681a-e3b0-4637-8706-f8e910c1b6d0；代码基线：5a288f142。
- 验证：会话 c38a681a 排查 67 处直读，通过 projectContext.js+user.js 启动恢复+getters 兜底+批量替换修复。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "project_id_getter",
  "source_extraction_id": "300b3a9ed67245bca01dea527f6bd86b",
  "version": 1,
  "memory_type": "entities"
}
-->
