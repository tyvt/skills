# 导航Tab参数只切UI未参与请求致1105报错
苏住房G门户首页学习园地接口报 1105 tab不能为空，根因是页签组件只切高亮未将 activeTab 并入请求参数。

## 问题现象
- 门户首页学习园地接口报 {"code":1105,"msg":"tab不能为空"}
- 页签组件 5 个 Tab（1～5 对应政策法规、流程指南等）一直只用来切高亮，从没进过请求参数
- 接口把 tab 列必传，报错文案指向后端，易误判为契约变更

## 根因
- 页签视觉似筛选器，读代码易当纯展示状态；api 层默认参数（pageNum/pageSize/regionCode）看似齐全
- 实际 tab 未在 queryParams 中，首屏漏传

## 解决方案
- ①多 Tab 各自列表的面板，activeTab 提升到父级数据并入 queryParams 展开，tab-change 重新拉列表，不能只写 UI 激活态
- ②api 层给默认值兜底（如 tab 默认 '1'）但保留调用方覆盖，防首屏漏传
- ③子组件用 activeTab prop + tab-change 事件与父联动，父组件唯一取数者
- ④修复后核对请求 URL 形如 getStudyList?pageNum=1&pageSize=7&tab=1&regionCode=320500
- ⑤枚举取值若与后端不一致拿成功示例对齐，别靠猜

## 验证与归属
- 验证：会话 6bf37b7b，home.js 的 getStudyList 默认 tab:'1'、index-v2.vue 维护 studyTab 传参并切换重拉、StudyPanel.vue 用 activeTab+tab-change 联动；刷新请求带 tab=1；同会话另修 /v2.0/v2.0/ 路径重复前缀
- 涉及文件：zhi2-web-admin/src/api/portal/home.js、api/index.js、tests/e2e/home-v2.spec.mjs
- 所属项目：苏住房G；来源会话：6bf37b7b-6069-4f69-bd6d-69fac837642a；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_param_missing_1105",
  "source_extraction_id": "04514741d2024b92a72103d8b2d8e96e",
  "version": 1,
  "memory_type": "entities"
}
-->