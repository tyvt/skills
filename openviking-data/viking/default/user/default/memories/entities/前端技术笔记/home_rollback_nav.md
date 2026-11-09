# 首页迁移回滚未提交改动并移植导航
苏住房G工作区未提交改动从惠山撤掉，恢复 home-v2 文件 HEAD，删除部分面板，并将导航解析逻辑移植至惠山版本。

## 背景
- 苏住房G工作区有未提交改动需从惠山撤掉，10个 home-v2 文件恢复源仓库 HEAD。
- 删除 EvaluationPanel.vue 与 SunshinePanel.vue。
- 相关提交仅 2 个：b57f471d1（bug 5277 首页待办 UI 间距，TodoPanel 行高 45→72px）、4d9d729b6（bug 5338 首页待办跳转专业化小区详情报错），均为源仓库 HEAD 祖先提交。

## 解决方案
- src/utils/ruoyi.js 的 resolveTodoTaskNavigation 移植至惠山版本。
- storedPath 不匹配时按 busCode 重建 path，动态参数段泛化按 name+params 跳转避免丢参。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/mock.js、src/utils/homeRoute.js、惠山版 permission.js、RecursiveMenu.vue、ruoyi.js 等。
- 来源会话：90752fe7-cf79-4a80-9bb9-bc665e648167；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "home_rollback_nav",
  "source_extraction_id": "e715db2dfbbd45d092aba2acf15396d8",
  "version": 2,
  "memory_type": "entities"
}
-->