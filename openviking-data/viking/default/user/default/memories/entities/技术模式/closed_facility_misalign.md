# 封闭设施宽列布局异常修复
苏州市房地产监测V3 中「封闭设施」区块位置字段误设 FORM_COL_WIDE 占两列，与数量字段拼成两列布局，已改回三列排列。

## 问题根因
- 「封闭设施」区块位置字段设 `FORM_COL_WIDE` 占两列，与数量字段拼成两列布局
- 编辑态未与查看态对齐，导致布局拉伸异常

## 修复方案
- `DetailTemplate` 及编辑态改回三列排列
- `getItemStyle` 按 `span` 固定宽度避免拉伸

## 涉及文件
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/styles/index.scss、variables.css、detail-form.scss
- zhi2-web-admin/src/views/projectManagement/certificate/consLic/changeDetail.vue
- zhi2-web-admin/src/utils/detailLayout.js
- 苏州市房地产监测V3/路由信息.json

## 验证与归属
- 验证证据：extracted source=cursor session=8b5d2426-e5c8-4a9a-a656-5be3baa67278
- 来源会话ID：8b5d2426-e5c8-4a9a-a656-5be3baa67278
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "closed_facility_misalign",
  "source_extraction_id": "a272ea15b80241319e7bdad773ac5ebe",
  "version": 1,
  "memory_type": "entities"
}
-->