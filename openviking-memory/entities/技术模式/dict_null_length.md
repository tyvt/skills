# 字典重渲染未防御空值length访问致报错
苏州市房地产监测V3 中 initDict 加载字典后重渲染时，attachmentList 等字段未归一化致访问 undefined.length 报错。

## 问题根因
- initDict 加载字典后重渲染时，attachmentList 等字段未归一化为数组
- 直接访问 undefined.length 导致运行时报错

## 解决方案
- 在 companyCancel/detail.vue 新增 normalizeAttachmentList、toDictOptions、buildCancelForm 统一归一化
- 确保字典选项始终为数组，防御空值访问

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/049.md
- 涉及文件：companyCancel/detail.vue、AgencyBasicInfoForm.vue、agencyBasicInfoContent.js、companyBasicInfoShared.js、detail-template.vue、detailMixins.js、dict-tag.vue、area.js
- 所属项目：苏州市房地产监测V3；来源会话：498a2746-f027-429d-b6bd-919dab34f28b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_null_length",
  "source_extraction_id": "7297edb7fc6144aeb1a7dca1c1581165",
  "version": 1,
  "memory_type": "entities"
}
-->