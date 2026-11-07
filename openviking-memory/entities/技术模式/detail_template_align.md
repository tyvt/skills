# detail-template 将标签左对齐
在苏州市房地产监测V3中，组件 `detail-template.vue` 的标签默认对齐方式已从右侧全局更改为左侧。

## 脚本更改
- `getLabelAlignClass` 默认值从 `'right'` 改为 `'left'`
- `getLabelContentStyle` 默认值 `'left'` 且回退从 `flex-end` 改为 `flex-start`

## CSS 更改
- `.detail-label` 和 `.detail-label-main` 定义 `justify-content: flex-start` 和 `text-align: left`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-rest/125.md
- 涉及文件: CashsaleInfoPanel.vue, detail-template.vue, detail-template-long-labels.md, README.md, detail-template-CrrkOgnH.css, migrate-detail-framework.mjs
- 会话: 0e6522ee-5877-4b0d-9156-b0f67a688a71; baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：0e6522ee-5877-4b0d-9156-b0f67a688a71


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_align",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "entities"
}
-->
