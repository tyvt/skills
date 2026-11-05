# 泰兴小程序 Picker 全局贴底修复
泰兴小程序新建 `ZsBottomPopup` 组件统一 Picker 弹层贴底，构建通过。

## 核心改动
- 新建 `ZsBottomPopup` 组件：微信小程序用 `<root-portal>` 渲染到页面根节点，H5 用 `<teleport to="body">`，其他平台回退 `uni-popup`，统一贴底样式与 `z-index: 10001`，暴露 `open`/`close` API
- 改造 5 个核心 Picker（`ZsDatePicker`、`ZsPicker`、`ZsMonthRangeCalendar`、`ComplexPicker`、`ProjectPicker`），内部 `uni-popup` 替换为 `ZsBottomPopup`，移除 `:deep(.uni-popup)` 定位 hack
- 迁移 8 个页面级 bottom popup（`NeedToKnowPopup.vue`、`pages_poll/form.vue`、`pages-suggest/create.vue` 等）

## 验证与归属
- 验证证据：extracted source=cursor，构建通过
- 涉及文件：`src/components/ZsBottomPopup/ZsBottomPopup.vue` 及多个页面 popup 组件
- 所属项目：泰兴小程序；来源会话ID：d9dec39a-c73b-4a6d-8ec0-8afcd431fcb6

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "taixing_picker_fix",
  "source_extraction_id": "8d6dfc27e44d45308822b25218938937",
  "version": 1,
  "memory_type": "entities"
}
-->