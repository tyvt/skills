# 预售许可详情栅格对齐修复
修复苏州市房地产监测V3中预售许可详情页「统一社会信用代码」因「项目坐落」占位导致的列错位问题。

## 问题根因
- el-row 中「项目坐落」占 16 格后剩 8 格，「统一社会信用代码」被排第三列，与上行「行政区划」对不齐

## 修复方案
- 编辑态改为 section-form 三列栅格：普通字段用 section-field（一行三列）
- 「项目坐落」用 section-field--wide（占两列，第三列留空）
- 「预售描述」用 section-field--full（整行），使「统一社会信用代码」从下一行第一列开始，纵向与「所属项目名称」对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：presale/permit 下 detail.vue、PermitInfoPanel.vue
- 所属项目：苏州市房地产监测V3；来源会话：f7e32c84-3538-433f-bf02-d17f353e9e06；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_permit_layout_fix",
  "source_extraction_id": "6f58039a3564482e961b58f9f1b314ce",
  "version": 1,
  "memory_type": "entities"
}
-->