# 股东信息表单列弹性致满屏空白
苏州市房地产监测V3 的 ShareholderChangeSection 股东信息表仅「股东名称」列弹性，满屏时剩余空间全堆该列形成空白，改为多列弹性均摊修复。

## 问题根因
- `ShareholderChangeSection.vue` 股东信息表仅「股东名称」列设弹性 min-width
- 其余列固定宽度，表格满屏时剩余空间全堆该列后形成空白

## 修复方案
- 将「股东类型」「持股比例(%)」改为弹性列（min-width 120）
- 股东名称调至 200，使三列均摊剩余宽度，操作列固定不变

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/129.md
- 涉及文件：src/views/company/companyManagement/components/ShareholderChangeSection.vue、DeveloperBasicInfoDetail.vue、DeveloperBasicInfoForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：983752c0-c3e1-4959-83cc-dbe78e214ea6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "shareholder_flex_column",
  "source_extraction_id": "07c2d7124c274e7c976432390b07e669",
  "version": 1,
  "memory_type": "entities"
}
-->