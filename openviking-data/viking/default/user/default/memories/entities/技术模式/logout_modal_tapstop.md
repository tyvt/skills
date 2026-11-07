# 退出登录用 uni.showModal 二次确认并 @tap.stop 防冒泡
顶栏退出登录仅在有 token 时显示，点击 uni.showModal 二次确认，确认后调 userStore.logout()。

## 方案说明
- 顶栏退出登录仅在有 token 时显示
- 点击 uni.showModal 二次确认，确认后调 userStore.logout()（请求 /security/ctAuth/logout、清空本地、switchTab）
- 按钮用 position:absolute 固定右上角 z-index:2，并用 @tap.stop 避免冒泡触发背景的 login

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证：会话 2ac982b9 property.vue 顶部退出登录，@tap.stop 防冒泡（证据 012.md）
- 涉及文件：src/pages/index/property.vue、src/store/user.js
- 来源会话ID：2ac982b9-0050-4def-847b-622f257aa9f2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_modal_tapstop",
  "source_extraction_id": "5275a4e5dacb42f1bcfc39133d795b60",
  "version": 1,
  "memory_type": "entities"
}
-->