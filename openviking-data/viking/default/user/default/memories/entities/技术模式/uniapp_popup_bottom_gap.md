# 底部弹窗距底空隙因 addGlobalClass 穿透与 padding
项目多处底部弹出弹窗距页面底部有空隙，根因是 uni-app 注入 addGlobalClass 且 App.vue 在弹窗最外层容器加了安全区内边距。

## 问题根因
- uni-app 编译小程序时给所有组件注入 `options.addGlobalClass = true`（≈ `styleIsolation: 'apply-shared'`），证据在 `dist/build/mp-weixin/common/vendor.js`：`const a={multipleSlots:!0,addGlobalClass:!0,...}`
- 这意味着 `app.wxss`（src/App.vue 的 `<style>`）的 class 规则会穿透进组件内部（含第三方 uni-popup），而兄弟组件自己写的 `:deep()` 进不去
- `src/App.vue` 把 `padding-bottom: env(safe-area-inset-bottom)` 打在弹窗最外层容器 `.uni-popup__wrapper.bottom` 上，内容底部白卡片填不满约 34px，底下露出遮罩灰
- `ZsDialog`/`ZsBottomPopup` 里 `:deep(.uni-popup__wrapper){padding-bottom:0!important}` 因全局类穿透失效

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序
- 涉及文件：dist/build/mp-weixin/common/vendor.js、src/App.vue
- 来源会话ID：9c0ae57b-34e1-42e1-a284-87b375e87284

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uniapp_popup_bottom_gap",
  "source_extraction_id": "31154dd57d29449692bc02b09f1c6aad",
  "version": 1,
  "memory_type": "entities"
}
-->