# 巡检issue页输入框UI对齐修复
泰兴小程序物业手持端巡检 issue 页输入框 UI 与设计图不一致，已修复样式。
## 问题根因
- `.page-top` 背景为 `#fff` 致搜索行白色药丸不清晰。
- `.tab-box` 无背景、`.search-wrap` padding 与设计图不符。
## 解决方案
- `src/staff/pages_facility/issue/index.vue` 的 `<style scoped>` 调整：`.page-top` 改 `background:transparent`，`.tab-box` 加 `background:#fff`，`.search-wrap` padding 改为 `0 24rpx`，`:deep(.uni-searchbar)` padding 改 `24rpx 0 0`。
- 保留 `:deep(.uni-searchbar__box)` 的 `background:#FFFFFF!important` 不动。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/staff/pages_facility/issue/index.vue、dist/build/mp-weixin/staff/pages_facility/issue/index.wxss
- 来源会话ID：e4455f6a-1b4d-496a-9b8d-c1d66976df97
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "issue_input_ui",
  "source_extraction_id": "631ebc59479242c29a9efec9b009a2b7",
  "version": 1,
  "memory_type": "entities"
}
-->