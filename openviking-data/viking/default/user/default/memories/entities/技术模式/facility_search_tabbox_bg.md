# 设施issue页搜索区白底与24rpx对齐修复
泰兴小程序物业手持端设施 issue 页搜索区 UI 不一致，已修复样式。
## 问题根因
- `.page-top` 背景为 `#fff`（或不透明）遮挡灰底，搜索区未由 `.tab-box` 统一接管白底。
- `.tab-box` 无背景、`.search-wrap` 与 `:deep(.uni-searchbar)` 的 padding 未设为 `24rpx`，与卡片对齐不一致。
## 解决方案
- `src/staff/pages_facility/issue/index.vue` 的 `<style scoped>` 调整：`.page-top` 改 `background:transparent`、`.tab-box` 加 `background:#fff`、`.search-wrap` padding 改为 `0 24rpx`、`:deep(.uni-searchbar)` padding 改 `24rpx 0 0`。
- 保留 `:deep(.uni-searchbar__box)` 的 `background:#FFFFFF!important` 不动。
## 验证与归属
- 验证证据：src=泰兴小程序/010.md
- 涉及文件：src/staff/pages_facility/issue/index.vue、src/pages.json、src/components/ZsSearch/ZsSearch.vue、src/staff/components/ZsSearch/ZsSearch.vue、src/uni.scss、src/staff/pages_facility/record/index.vue、dist/build/mp-weixin/staff/pages_facility/issue/index.wxss
- 来源会话ID：e4455f6a-1b4d-496a-9b8d-c1d66976df97
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_search_tabbox_bg",
  "source_extraction_id": "77ba704f1a8144e49c493206d2246a53",
  "version": 2,
  "memory_type": "entities"
}
-->