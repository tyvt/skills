# 侧栏首页路径归一与精确匹配
苏住房G项目中，侧栏「首页」报错未授权及高亮错乱，需统一首页路径为 /index 且菜单仅精确匹配。
## 问题现象
- 点侧栏首页提示「页面未授权或不存在」
- 修复后首页不高亮，或切到别的菜单首页仍高亮
## 根因
- 后端菜单下发首页 path 可能带斜杠或不同写法，路由守卫兜底、侧栏跳转、首页识别函数各自比较字符串导致口径不一致
## 解决方案
- 抽公共归一函数 homeRoute，把首页统一成 /index，在一级叶子菜单点击、路由守卫兜底、首页识别三处共用
- 侧栏高亮比较时对当前路由同样归一
- 首页菜单只允许精确匹配，避免 /index/xxx 同级菜单误触发高亮
## 验证与归属
- 验证覆盖：进入首页高亮、切走后不再高亮
- 涉及文件：router/index.js、utils/homeRoute.js、utils/permission.js、store
- 所属项目：苏住房G；来源会话：cb0377ba-165d-4411-88e0-da19021618ab；代码基线：c17e4d8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_route_normalize",
  "source_extraction_id": "85080ea7fd7b49f2a6f0d4ca4a7361e9",
  "version": 1,
  "memory_type": "entities"
}
-->