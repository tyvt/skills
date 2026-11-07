# 弹窗外层内边距致底部安全区留白
uni-app 编译注入 `addGlobalClass:true` 使 `App.vue` 样式穿透至 `uni-popup` 内部，根因系 `App.vue` 将 `padding-bottom: env(safe-area-inset-bottom)` 作用于 `.uni-popup__wrapper.bottom` 外层，致内容白卡片无法填充而露遮罩灰。
## 问题根因
- uni-app 编译于 `dist/build/mp-weixin/common/vendor.js` 注入 `addGlobalClass:true`，使 `src/App.vue` 样式穿透至 `uni-popup` 内部。
- `App.vue` 将 `padding-bottom: env(safe-area-inset-bottom)` 作用于 `.uni-popup__wrapper.bottom` 外层，导致内容白卡片无法填充而露遮罩灰。
## 解决方案
- 需调整 `App.vue` 中安全区内边距的作用层级，避免穿透影响弹窗内部布局。
## 验证与归属
- 验证证据：src=泰兴小程序/003.md
- 涉及文件：src/App.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、src/staff/pages_facility/issue/components/MoreDialog.vue、src/components/ZsDialog/ZsDialog.vue、src/pages.json、src/components/ZsPopup/ZsPopup.vue、node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue、dist/build/mp-weixin/app.wxss
- 来源会话ID：9c0ae57b-34e1-42e1-a284-87b375e87284
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_safearea_padding",
  "source_extraction_id": "fc9f554b0d494f35b937bf826962d11b",
  "version": 1,
  "memory_type": "entities"
}
-->