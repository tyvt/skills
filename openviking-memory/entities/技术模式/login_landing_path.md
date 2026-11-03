# 登录成功递归跳转首个叶子菜单无则回退
苏州市房地产监测V3 新增 utils/landingPath.js 中 resolveFirstMenuPath 深度优先取首个非 hidden 叶子项。

## 跳转逻辑
- 新增 `utils/landingPath.js` 中 `resolveFirstMenuPath` 深度优先取首个非 hidden 叶子项（跳过 Layout/ParentView）
- 登录成功优先 URL redirect，否则经 `/index` 拉权限后跳首菜单
- 根路径 `''` 重定向至 `/index`，无菜单回退 `/todo`（`DEFAULT_LANDING_PATH`）
- 同步 `login.vue`、`LoginForm.vue` 等组件

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/075.md
- 涉及文件：router/index.js、store/modules/permission.js、utils/ruoyi.js、login.vue、RecursiveMenu.vue、LoginForm.vue、companyLogin.vue、Navbar.vue
- 所属项目：苏州市房地产监测V3；来源会话：4f960b97-1c4b-4b74-94fb-4c515763dae7；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_landing_path",
  "source_extraction_id": "035bf3f5de7f43a499299f8415342812",
  "version": 1,
  "memory_type": "entities"
}
-->