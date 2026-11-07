# 退出登录清除小区上下文
园区物管2.0 在退出登录时新增 clearProjectContext，统一清除 localStorage 与 Vuex 中的小区状态，避免串号显示旧小区。

## 问题现象
- 退出登录后 Navbar 仍从 localStorage 读到上一个账号的小区名。
- 刷新后 layout/index.vue 的 syncProjectDialogVisibility 校验清除无效缓存才正常。

## 根因与修改
- 小区信息存于 localStorage(currentProjectId 等)、Vuex(user.currentProject)、Navbar(localProjectName)。
- LogOut/FedLogOut 原只清 token 和权限，未清小区数据。
- user.js 新增 clearProjectContext，在登出时统一清除上述状态。

## 关联信息
- 涉及文件：src/layout/components/Navbar.vue、src/store/modules/user.js、src/views/home/bProjectDialog.vue 等。
- 所属项目：园区物管2.0；来源会话：7cc4a853-05fc-4b7d-833f-c45e8ba67283；代码基线：none。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "clear_project_logout",
  "source_extraction_id": "175779f5800742d9a6b6bf5fa413e19e",
  "version": 1,
  "memory_type": "entities"
}
-->
