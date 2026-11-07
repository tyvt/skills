# 首页工作待办两个问题修复
物业手持B端首页「工作待办」切换小区数字不变与点击报事/报修提示建设中的修复方案。

## 问题根因
- 切换小区数字不变：`loadHomeData` 在 `homeLoading` 为 true 时直接 return，快速切换可能跳过刷新；统计接口未显式传入当前 `complexId`
- 点击报事/报修提示建设中：`handlePending` 统一调用 `showDevelopingToast()`，未做页面跳转

## 解决方案
- `home/index.vue`：统计接口请求传入 `complexId: userStore.projectId`；用 `loadSerial` 替代 `homeLoading` 防重复请求；小区变化时先重置数字为 `--` 再加载
- 报事待办点击穿透至 `/pages_facility/issue/index?orderType=1&backlog=1`；报修待办至 `orderType=2&backlog=1`
- `issue/index.vue` 工单列表页配套优化

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages/home/index.vue、src/api/home.js、src/pages/complex-select/index.vue、src/pages/workbench/index.vue、src/pages_facility/issue/index.vue
- 来源会话ID：d6765f9e-f18c-4d82-bd7a-2e28452fae2d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_todo_fix",
  "source_extraction_id": "492c8b0603a94a41bead32e1a63d8236",
  "version": 1,
  "memory_type": "entities"
}
-->