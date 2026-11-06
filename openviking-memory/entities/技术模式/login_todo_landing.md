# 登录后默认落地页改为待办页并移除首页标签
苏州市房地产监测V3 登录后默认进入待办事项（`/todo`），并去掉 TagView 中固定的「首页」标签。

## 路由改动
- `router/index.js`：新增 `DEFAULT_LANDING_PATH = '/todo'`
- 删除常量路由里的 `/index` 首页（原 `affix: true` 固定显示）
- `/index`、根路径 `''` 均重定向到 `/todo`
- 已登录访问 `/login`、404 回退、访问 `/index` 均进入 `/todo`
- 账套回跳逻辑改为在 `/todo` 时触发

## 登录改动
- `login.vue`、`LoginForm.vue`、`companyLogin.vue` 登录成功后跳转 `/todo`

## TagView 改动
- `TagsView/index.vue`：去掉对 `path === 'index'` 的固定标签逻辑
- 「关闭所有」后无标签时跳转到 `/todo`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：router/index.js、login.vue、LoginForm.vue、companyLogin.vue、TagsView/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：4c436c5b-d2ad-4894-8c78-5a8d855852f6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_todo_landing",
  "source_extraction_id": "79970fc9e96f4f2f88b06a0b0e2a2a8f",
  "version": 1,
  "memory_type": "entities"
}
-->