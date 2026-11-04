
# WXSS不支持min()致:deep弹层宽度失效变窄卡片
`src/staff/pages/cashier/result.vue` 使用 `:deep(.payment-popup){ width: min(100vw, 750rpx) }`，因 WXSS 不支持 `min()/max()/clamp()`，该声明被静默丢弃，弹层宽度回落到 `ZsPopup` 默认 `560rpx` 并居中，变为窄卡片悬浮。
## 问题根因
- `result.vue` 使用 `:deep(.payment-popup){ width: min(100vw, 750rpx) }` 写法。
- WXSS 不支持 `min()/max()/clamp()`，这条声明被静默丢弃；同规则里的 `margin:0 auto`、`padding:0`、圆角照常生效。
- 宽度回落到 `ZsPopup` 默认的 `.popup-container{width:560rpx}` 并被居中（截图量得白卡宽 450px，592px 屏下≈560rpx）。
- 卡片比账单卡窄，账单明细右侧金额/日期从弹层旁漏出，底部「合计」被挤到换行。
## 解决方案
- 需改用小程序支持的样式方案（如直接写类名或内联样式，避免 `min()/max()/clamp()`）。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/staff/pages/cashier/result.vue、src/components/ZsPopup/ZsPopup.vue
- 来源会话ID：54c23926-7b8a-40d1-a6aa-2e3dcc903484
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wxss_deep_discard",
  "source_extraction_id": "628e445ead5342fe8e8a0f3c75869f07",
  "version": 2,
  "memory_type": "entities"
}
-->