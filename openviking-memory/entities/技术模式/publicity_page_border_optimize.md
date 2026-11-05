# 公共收益公示管理页面边框优化
产品2.0 项目优化了公共收益-公示管理相关页面的表格外层边框，消除双层边框问题。

## 修改说明
- 修改 `pubownerDecision/index.vue` 与 `pubPublicity/index.vue`，去除外层 `list-container`+`list-card` 包裹，直接渲染子组件
- 子组件 `autonomy/general/index.vue`、`autonomy/publicity/index.vue` 内部已通过 `ListTemplate` 自带结构
- `pubQuarterlyDeclaration/index.vue` 本身结构标准无需改动
- 在 `index.scss` 为 `.sub-container` 补充与 `.list-card` 一致的标准表格样式，修复子表底部横线

## 验证与归属
- 所属项目：产品2.0；来源会话：37a43ff8-4058-4152-bac5-a0c1e5aa7270；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_page_border_optimize",
  "source_extraction_id": "b748adfbea38472688052e3ba8fcbc14",
  "version": 1,
  "memory_type": "entities"
}
-->