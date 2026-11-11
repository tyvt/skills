# 防台防汛列表列宽规范
苏住房G 防台防汛（flood）模块列表列宽截断问题的统一修复方案：单据编号类列 width: 200，时间类列 width: 190。

## 问题根因
- 列表 单据编号 / 提交时间 / 求援工单编号 / 求援时间 等列宽不足导致内容截断显示

## 修复方案
- 单据编号类列（单据编号、求援工单编号）统一 width: 200
- 时间类列（提交时间、求援时间）统一 width: 190
- tiany 于 2026-11-10 修复 汛前/汛中/汛后检查（CheckPage.vue）与 积水原因复盘（cause/index.vue，提交 f86a6b9cc）
- lichandan 于 2026-11-11 重新激活禅道 bug 6401，要求补 求援工单（rescue/index.vue）；同方案调整 width 170→200、160→190（提交 4763f71ba）

## 涉及文件与归属
- 涉及：flood/rescue/index.vue、flood/CheckPage.vue、flood/cause/index.vue、docs/flood/common-errors.md
- 所属项目：苏住房G
- 代码基线：develop/v2.6.2-suzhufang-li
- 来源会话：2026-11-11 li worktree 处理 bug 6401

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flood_column_width",
  "source_extraction_id": "450da2f25b73423f86334d72db23c5ce",
  "version": 1,
  "memory_type": "entities"
}
-->