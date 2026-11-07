# 登录后默认跳转首菜单实现
苏州市房地产监测V3 实现了登录成功或进入系统首页时按侧栏菜单顺序进入第一个可访问页面的逻辑。

## 实现要点
- 新增 `utils/landingPath.js`：`resolveFirstMenuPath` 按菜单树深度优先取第一个非 `hidden` 叶子项（跳过 `Layout`/`ParentView`，支持 `InnerLink`）
- 登录成功后走 `getPostLoginPath`：优先 URL `redirect`，否则到 `/index`，拉取权限并 `GenerateRoutes` 后跳首菜单
- 根路径 `''` 改为重定向到 `/index`；无可用菜单时回退到 `/todo`（`DEFAULT_LANDING_PATH`）
- 已同步 `login.vue`、`LoginForm.vue`、`companyLogin.vue` 及标签栏关闭最后一页的首页跳转

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`utils/landingPath.js`、`src/router/index.js`、`src/store/modules/permission.js`、`src/utils/ruoyi.js`
- 来源会话：4f960b97-1c4b-4b74-94fb-4c515763dae7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_first_menu_redirect",
  "source_extraction_id": "1b78f2ac900543eeacc8a52008582c1e",
  "version": 1,
  "memory_type": "entities"
}
-->