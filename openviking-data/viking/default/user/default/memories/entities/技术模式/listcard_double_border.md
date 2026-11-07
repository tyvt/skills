# 由重复的 list-card 引起的双边框和水平线
涉及外部 list-card 导致双边框的广告页面的技术规范。
## 问题根因
- pubownerDecision/index.vue 和 pubPublicity/index.vue 在已经包含 ListTemplate 的子组件之外重复了 list-container+list-card。
- 没有标准样式的子表 .sub-container 导致下方水平线。
## 解决方案
- 移除外部包裹层并直接渲染子组件。
- index.scss 添加与 .list-card 一致的 .sub-container 样式。
## 文件和验证
- 涉及文件: pubownerDecision/index.vue, pubPublicity/index.vue, pubQuarterlyDeclaration/index.vue, detailTable.vue, autonomy/general/index.vue, autonomy/publicity/index.vue, styles/index.scss, mixins/ListTemplate.js.
- 原始会话: 37a43ff8-4058-4152-bac5-a0c1e5aa7270; 基线: none.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：37a43ff8-4058-4152-bac5-a0c1e5aa7270


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listcard_double_border",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->
