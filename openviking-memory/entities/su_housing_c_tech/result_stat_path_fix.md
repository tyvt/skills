# ResultStatistics 资源路径与SVG修复
苏住房C `ResultStatistics.vue` 因路径多写一级且 SVG 为空导致资源加载失败，已修复。

## 问题根因
- `ResultStatistics.vue` 位于 `pages_owner/decision/sort/`，`StepConfirm.vue` 位于 `pages_owner/decision/components/`
- 资源实际在 `pages_owner/static/images/svg/flag-szf.svg`，应使用 `./../static/...` 而非 `../../../static/...`（后者指向不存在的 `src/static/...`）
- `flag-szf.svg` 为 0 字节空文件

## 修复要点
- 修正路径为 `./../static/images/svg/flag-szf.svg`
- 补充苏住房主题色（`#5583D0` → `#1354BE`）的排序旗帜图标到 `flag-szf.svg`
- 设计稿有指定切图时可替换为正式资源

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`ResultStatistics.vue`、`StepConfirm.vue`、`pages_owner/static/images/svg/flag-szf.svg`
- 来源会话ID：860e18b1-7843-41e3-a393-6d3279b805da
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "result_stat_path_fix",
  "source_extraction_id": "8c968f7c69c54016b77e3b6eff8de193",
  "version": 1,
  "memory_type": "entities"
}
-->