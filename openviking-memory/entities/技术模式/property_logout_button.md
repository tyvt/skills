# property.vue 右上角退出登录
property.vue 顶部头图右上角已加「退出登录」功能。

## 行为
- 仅在有 token 时显示，未登录不出现
- 点击后 uni.showModal 二次确认
- 确认后调用 userStore.logout()（请求 /security/ctAuth/logout、清空本地用户状态并 switchTab 回当前页）

## 样式与交互
- position: absolute 固定在 .page-head 右上角，z-index: 2 保证在背景图之上可点
- @tap.stop 避免冒泡触发背景 login

## 验证与归属
- 涉及文件：property.vue、src/store/user.js、src/pages/index/property.vue
- 来源会话：2ac982b9-0050-4def-847b-622f257aa9f2
- 所属项目：repository；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_logout_button",
  "source_extraction_id": "c8d3cef8b2f248fc83df6e71434716c5",
  "version": 1,
  "memory_type": "entities"
}
-->