# 默认登录落地页改为/todo并移除首页affix
苏州市房地产监测V3 中将默认路由改为 `/todo`，并移除 TagView 中首页固定标签逻辑。

## 变更要点
- 原 `/index` 路由设 `affix: true` 导致 TagView 固定显示首页且登录落地页不统一
- `router/index.js` 新增 `DEFAULT_LANDING_PATH = '/todo'` 并删除 `/index` 路由

## 修复方案
- 根路径及登录成功均重定向至 `/todo`
- `TagsView/index.vue` 去除 `path === 'index'` 固定标签逻辑
- 关闭所有标签后回跳 `/todo`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/131.md
- 涉及文件：router/index.js、login.vue、TagsView/index.vue、路由信息.json、companyLogin.vue、permission.js、index.vue、settings.js
- 所属项目：苏州市房地产监测V3；来源会话：4c436c5b-d2ad-4894-8c78-5a8d855852f6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "default_landing_todo",
  "source_extraction_id": "09055bdcd2ed47b8927899ce1b85cc24",
  "version": 1,
  "memory_type": "entities"
}
-->