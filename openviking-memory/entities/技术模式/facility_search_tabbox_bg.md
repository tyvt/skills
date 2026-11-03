# 设施页搜索栏tab-box白底与24rpx对齐
泰兴小程序设施 issue 页搜索区 UI 需由 `.tab-box` 接管白底与 `24rpx` padding 对齐卡片，露出灰底且药丸清晰。

## 问题根因
- `src/staff/pages_facility/issue/index.vue` 的 `.page-top` 不透明遮挡灰底，搜索区未由 `.tab-box` 统一接管白底。
- `.search-wrap` 与 `:deep(.uni-searchbar)` 的 padding 未设为 `24rpx`，与卡片对齐不一致。

## 解决方案
- 改动 `<style scoped>` 使 `.page-top` 透明、`.tab-box` 设 `#fff`。
- `.search-wrap` 与 `:deep(.uni-searchbar)` padding 设为 `24rpx`，露出灰底且药丸清晰。

## 验证与归属
- 验证证据：src=泰兴小程序/010.md
- 涉及文件：src/staff/pages_facility/issue/index.vue、src/pages.json、src/components/ZsSearch/ZsSearch.vue、src/staff/components/ZsSearch/ZsSearch.vue、src/uni.scss、src/staff/pages_facility/record/index.vue
- 来源会话ID：e4455f6a-1b4d-496a-9b8d-c1d66976df97
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_search_tabbox_bg",
  "source_extraction_id": "076fb3abe2994198a7216abbac25264f",
  "version": 1,
  "memory_type": "entities"
}
-->