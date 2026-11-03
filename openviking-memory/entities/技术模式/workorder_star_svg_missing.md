# 工单评价星标不显示因SVG缺失路径误
泰兴小程序工单评价星标不显示因 `src/static/svg/` 缺失 SVG 且星标路径误写，恢复并更正路径后业主端同步生效。

## 问题根因
- `src/static/svg/` 下 `star-active.svg` 与 `star-inactive.svg` 缺失。
- `src/staff/pages_facility/issue/detail.vue` 中 4 处星标路径误写为 `/static/images/`。

## 解决方案
- 恢复 SVG 并将路径更正为 `/static/svg/`，业主端 `src/pages_owner/repair/detail.vue` 同步生效。

## 验证与归属
- 验证证据：src=泰兴小程序/012.md
- 涉及文件：src/staff/pages_facility/issue/detail.vue、src/pages_owner/repair/detail.vue、src/pages/staff/workbench/index.vue、src/pages_poll/result.vue、src/components/ZsImage/ZsImage.vue、src/env/mp.js
- 来源会话ID：02e556af-812d-4a11-bb67-1891918531a5
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_star_svg_missing",
  "source_extraction_id": "076fb3abe2994198a7216abbac25264f",
  "version": 1,
  "memory_type": "entities"
}
-->