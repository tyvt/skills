# 列表查询区与卡片间距由CSS变量全局统一
苏州市房地产监测V3 通过 variables.css 新增 --list-section-gap: 12px，全局统一列表查询区与 list-card 间距。

## 问题描述
- 列表查询区与卡片间距此前不一致，部分页面存在重复 gap 设定
- .lease-contract-list 等存在重复 gap 设定需清理

## 解决方案
- variables.css 新增 --list-section-gap: 12px
- index.scss 中 .list-container 等应用 gap: var(--list-section-gap)
- 移除 .lease-contract-list 重复 gap 设定

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/065.md
- 涉及文件：companyRecordAgency/index.vue、index.scss、zs-search-form.vue、ListTemplate.js、variables.css、benefit/alert/index.vue、companyRecordAgency/change/index.vue
- 来源会话ID：750c5f05-27fa-429e-89fd-82d7adcd5bc9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_section_gap_css_var",
  "source_extraction_id": "f693a59fc8b14fa8a5001f904bae2259",
  "version": 1,
  "memory_type": "entities"
}
-->