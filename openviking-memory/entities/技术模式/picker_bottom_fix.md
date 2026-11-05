# Picker 全局贴底修复方案
泰兴小程序新建 `ZsBottomPopup` 组件并替换 5 个核心 Picker 与 8 个页面级弹层，实现全局贴底。
## 核心改动
- 新建 `ZsBottomPopup` 组件：`root-portal`（微信）、`teleport to body`（H5）、回退 `uni-popup`（其他），`z-index:10001`，暴露 `open`/`close`。
- 改造 `ZsDatePicker`、`ZsPicker`、`ZsMonthRangeCalendar`、`ComplexPicker`、`ProjectPicker` 内部 `uni-popup` 替换为 `ZsBottomPopup`，移除 `:deep(.uni-popup)` hack。
- 迁移页面级 bottom popup 8 个文件（如 `NeedToKnowPopup.vue`、`pages_poll/form.vue` 等）。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/components/ZsBottomPopup/ZsBottomPopup.vue`、`NeedToKnowPopup.vue`、`pages_poll/form.vue`、`pages-suggest/create.vue`、`pages_property/payment/index.vue`、`PaymentChannelPopup.vue`、`pages_owner/repair/detail.vue`、`DescribePopup.vue` 等
- 来源会话ID：d9dec39a-c73b-4a6d-8ec0-8afcd431fcb6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "picker_bottom_fix",
  "source_extraction_id": "3a37b65da1f046779078aeddca3b83b5",
  "version": 1,
  "memory_type": "entities"
}
-->