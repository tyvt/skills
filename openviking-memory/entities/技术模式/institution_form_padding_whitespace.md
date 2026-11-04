# 由 Padding 和 Margin 叠加导致的页脚空白
在 Suzhou Real Estate Monitoring V3 项目中，租赁机构表单因 padding 和 margin 叠加出现了约 136px 的空白。

## 问题根因
- 全局样式 `.institution-register-form` 带有 `padding-bottom: 48px`
- 租赁的 `.agreement-wrap` 样式带有 `margin-bottom: 88px`，相加产生约 136px 空白

## 解决方案
- `InstitutionRegisterSingleForm.vue` 动态添加类 `has-agreement`
- 租赁机构（有协议）接收 `padding-bottom: 0`，仅保留协议的 88px
- 经纪机构（无协议）保持 48px 以避开固定栏

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/152.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: CompanyRegisterSingleForm.vue, InstitutionRegisterSingleForm.vue, AnnexUpload/index.vue, RegisterUploadItem.vue, AppendixPackageSection/index.vue, Step3Appendix.vue, AppendixPictureUpload.vue, AppendixRequirementGrid.vue
- 会话: 08c8c33f-395a-42c3-ab4b-468a9d18c04b; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "institution_form_padding_whitespace",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->