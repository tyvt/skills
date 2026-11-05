# ZsSearch 搜索框宽度修复
苏住房C 小程序 `houseVideo/index.vue` 中 `ZsSearch`（底层 `uni-search-bar`）默认宽度较窄导致搜索框无法撑满，已修复。

## 问题原因
- `ZsSearch` 底层 `uni-search-bar` 默认宽度较窄
- 仅给 `.uni-searchbar` 设 `width: 100%` 无效，父容器无明确宽度时百分比无法撑开

## 修改内容
- 用 `w-660`（660rpx，接近全屏内容区宽度）包裹搜索框
- 将 `.page-top` 改为居中布局，与同类页面（`goodProject/index`、`newHouse/index`）保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`houseVideo/index.vue`、`ZsSearch.vue`、`goodProject/index.vue`
- 来源会话ID：1fdb1e84-2130-4a0e-9e11-7525a8813edf

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zssearch_width_fix",
  "source_extraction_id": "e393299e4a9740aba5960facd459a397",
  "version": 1,
  "memory_type": "entities"
}
-->