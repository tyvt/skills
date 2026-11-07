# 首页待办不刷新与点击未跳转修复
物业手持B端首页待办在切换小区后数字不刷新，且点击卡片仅弹开发中提示而不跳转对应列表。

## 问题根因
- `loadHomeData` 在 `homeLoading` 为 true 时直接 return，切换小区时统计接口未传 `complexId`，导致待办数字不变。
- `handlePending` 统一调用 `showDevelopingToast()` 而未执行页面跳转。

## 解决方案
- `src/pages/home/index.vue` 传入 `complexId: userStore.projectId`，用 `loadSerial` 替代 `homeLoading` 防阻塞并重置数字。
- 报事待办跳转至 `/pages_facility/issue/index?orderType=1&backlog=1`，报修待办跳转至 `/pages_facility/issue/index?orderType=2&backlog=1`。

## 验证与归属
- 所属项目：物业手持B端
- 验证证据：extracted source=cursor project=物业手持B端
- 验证证据：src=cursor session=d6765f9e-f18c-4d82-bd7a-2e28452fae2d
- 涉及文件：src/pages/home/index.vue、src/api/home.js、src/pages/complex-select/index.vue、src/pages/workbench/index.vue、src/pages_facility/issue/index.vue、src/store/user.js、src/api/index.js、src/api/property.js
- 来源会话ID：d6765f9e-f18c-4d82-bd7a-2e28452fae2d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_refresh_nav",
  "source_extraction_id": "c40df6b4b615473fb6ddcee301ea183a",
  "version": 1,
  "memory_type": "entities"
}
-->