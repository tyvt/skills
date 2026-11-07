# 业务中心流程区溢出与列宽不约束
门户首页 index-new 业务中心流程区因 overflow:visible 使步骤条溢入 column-gap，且 flow-grid 列宽未约束导致上下行不对齐。

## Description
- 现象：流程区步骤条溢出、上下行不对齐。
- 根因：业务中心流程区 overflow:visible 使步骤条溢入 column-gap；flow-grid 列宽未约束导致上下行不对齐。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue、src/layout/index.vue 等。

## Solution
- home-main 限制卡片不超出网格列。
- card-body 与 flow-steps 设 overflow:hidden。
- flow-grid 第二列 minmax(0,1fr) 且子项 width:100%。

## Verification
- 来源会话ID：bfe00b75-42a6-4d80-bfb4-a79e98b5a2fe（extracted source=cursor）。
- 涉及文件含 index-new.vue、layout/index.vue、portal-home-visual.spec.ts、package.json、playwright.config.ts。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_overflow_col",
  "source_extraction_id": "96758bb922ef469fa059939f20317c82",
  "version": 1,
  "memory_type": "entities"
}
-->