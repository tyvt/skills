# 退出登录清理小区业务上下文
退出登录必须清 localStorage 三键 + Vuex + 组件 local 状态三处小区/项目上下文，否则切换账号残留。

## 现象
- 顶部 Navbar 显示小区在切换账号登录后仍显示上一账号小区，刷新后才正常。

## 根因
- 小区上下文散落三处：localStorage（currentProjectId/Name/lastLoginProjectId）、Vuex user.currentProject、Navbar mounted 从 localStorage 读入的 localProjectName。
- LogOut/FedLogOut 只清 token 和权限，不清小区数据；刷新后 layout/index.vue 校验清除无效缓存才正常。

## 解决方案
- user.js 新增 clearProjectContext，在 LogOut 与 FedLogOut 统一清除上述 localStorage 键与 Vuex 状态。
- 通用教训：凡挂 localStorage 的跨账号业务上下文，登出与强制登出两路径都要显式清理，不依赖下次进入校验兜底。

## 关联信息
- 涉及文件：src/store/modules/user.js、src/layout/components/Navbar.vue、src/layout/index.vue。
- 所属项目：园区物管2.0；来源会话：7cc4a853-05fc-4b7d-833f-c45e8ba67283；代码基线：49e7729ce。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_clear_project_context",
  "source_extraction_id": "9f99b2420b5a45eaa510bde19c0c7eb0",
  "version": 1,
  "memory_type": "entities"
}
-->
