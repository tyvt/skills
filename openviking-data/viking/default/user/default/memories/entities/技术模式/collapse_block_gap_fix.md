# 详情表单 Collapse 区块间距缺失修复
苏州市房地产监测V3 修复 DeveloperBasicInfoForm/AgencyBasicInfoForm 内多个 Headline 之间缺少垂直间距的问题。

## 修改内容
- `zhi2-web-admin/src/styles/index.scss`：为 `.detail-from-container > .el-form / .zs-form` 下的 `.developer-basic-info-form`、`.agency-basic-info-form` 增加布局
- 布局属性：`display: flex; flex-direction: column; row-gap: var(--detail-block-gap)`（12px）

## 影响范围
- 效果：`DeveloperBasicInfoForm`/`AgencyBasicInfoForm` 内多个 `.collapse-container`（Headline）间出现垂直间距，与只读页一致
- 涉及页面：`toB/companyRecord/detail.vue`、`toB/agencyRecord/detail.vue`、`companyRecordAgency/change/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：479fbf59-8cc1-4660-b5b4-7e972253abe9
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "collapse_block_gap_fix",
  "source_extraction_id": "7363ffb17ce0413da919427f6f448e60",
  "version": 1,
  "memory_type": "entities"
}
-->