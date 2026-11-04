# 页面级裸选 uni-popup wrapper 污染全页弹层
报事报修详情页裸选 `:deep(.uni-popup__wrapper){height:100%}` 命中全页所有弹层，居中弹窗被撑满贴顶。
## 现象
- 详情页三个弹层（撤销确认、满意度评价、评价成功）同时贴到屏幕顶部，居中弹窗变横幅。
- 截图似弹层组件坏了，实际是某处 CSS 污染全页。
## 根因
- `:deep(.uni-popup)` / `:deep(.uni-popup__wrapper){height:100%!important}` 无作用域限定，命中该页所有 uni-popup 实例。
- wrapper 被强制 100% 高，弹层内容从自适应高度+居中变撑满视口；`!important` 让组件自带 flex 居中规则失效。
## 解决方案
- 分清哪种弹层该占满：底部/全屏弹层才允许 height:100%，居中弹层保持自适应高度。
- 覆盖收窄到具体弹层根类（如给满意度弹窗加 `satisfaction-popup` 类，写 `.satisfaction-popup :deep(.uni-popup__wrapper){ height:auto; }`）。
- 用 grep 把页面所有 `:deep(.uni-popup` 找出来逐条判定归属，回归同页其它弹层。
- 顺带排查同类隐患（如 `pages_owner/ownerCard/index.vue:376` 的 `:deep(.uni-popup__wrapper){height:610rpx}` 压住居中提示弹窗）。
## 验证与归属
- 验证证据：会话 dff5eff3（基线 9e0fdde，禅道 bug 5915 入口）结论根因 detail.vue 裸选命中全页弹层，修复为收窄并披露遗留隐患。
- 涉及文件：zhi2-mobile-shimin/src/pages_owner/repair/detail.vue、pages_owner_extra/repair/detail.vue、components/ZsPopup/ZsPopup.vue、pages_owner/ownerCard/index.vue。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_wrapper_narrow",
  "source_extraction_id": "ca1c03debbd649dab1b71cd5d75db317",
  "version": 1,
  "memory_type": "entities"
}
-->