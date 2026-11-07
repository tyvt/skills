# 侧栏首页路径归一修复（苏住房G）
苏住房G 项目侧栏首页点击报错与高亮异常的修复记录。

## 问题根因
- 侧栏点击首页报「页面未授权或不存在」，一级叶子菜单点击、路由守卫兜底及首页识别逻辑异常
- 首页未高亮，且切换菜单后首页仍高亮（/index/xxx 同级菜单误触发）

## 修复方案
- 统一首页路径归一到 /index，修复一级叶子菜单点击、路由守卫兜底及首页识别逻辑
- 侧栏高亮比较时同步做首页路径归一
- 首页菜单改为仅精确匹配，避免 /index/xxx 同级菜单误触发高亮

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：router/index.js、utils/homeRoute.js、utils/permission.js
- 所属项目：苏住房G；来源会话：cb0377ba-165d-4411-88e0-da19021618ab

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suhousing_sidebar_home",
  "source_extraction_id": "65c1d962f20549ccb0401f3b58973a8c",
  "version": 1,
  "memory_type": "entities"
}
-->