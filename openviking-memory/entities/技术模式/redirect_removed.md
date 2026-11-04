# 全站重定向逻辑移除改为直跳
在泰兴G项目 zhi2-web-admin 中，已全量移除重定向逻辑，代码不再含 redirect 关键字与 /redirect 路由用法，统一改为直接路由跳转。

## 改动内容
- `src/router/index.js` 删除根路由 `redirect: 'index'`，并此前已删除 `/redirect` 路由入口；登录回跳 `?redirect=...` 逻辑改为直接 `next('/login')`
- `src/layout/components/TagsView/index.vue` 去掉子路由路径 `/redirect/` 拼接；刷新页签由 `'/redirect'+fullPath` 改为 `replace(fullPath)`；关闭标签后首页回退不再走 `/redirect...`
- `src/layout/components/Navbar.vue` 去掉 `key.indexOf('/redirect')` 分支及一级菜单路径 `/redirect/` 拼接逻辑
- `src/views/property/complexService/components/complexServiceDetailTable.vue` 涉及（作为重定向逻辑排查相关文件）
- 历史涉及文件还包含：`assets/views/login.vue`、`views/companyLogin.vue`、`register/companyRegister.vue`、`LoginForm.vue`、`store/modules/permission.js`

## 适用范围
- 涉及路由、登录、注册、TagsView、Navbar、权限 store 等模块

## 验证与归属
- 验证证据：extracted source=cursor/project=泰兴G（原 src=泰兴G/004.md）
- 所属项目：泰兴G（zhi2-web-admin）
- 来源会话：6d0e86c2-8c79-42bd-a40b-a156427e418b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "redirect_removed",
  "source_extraction_id": "47b34f339d8f45c8bb02598401ebc0b1",
  "version": 2,
  "memory_type": "entities"
}
-->