# 预售方案三字典字段接入
苏州市房地产监测V3 将土地使用权类型、土地用途、有无委托三个字典字段接入预售方案。

## 改动摘要
- `permitConstants.js` 新增 `PLAN_DICT_TYPES` 与 `resolveDictLabel()`
- `plan/detail.vue` `created()` 调 `initDict()` 通过 `getDicts` 加载三字典
- 土地使用权类型→`zs-select`+`landUseTypeOptions`(`land_use_rights_type`)
- 土地用途→由文本输入改 `zs-select`+`landPurposeOptions`(`project_verification_land_purpose`)
- 有无委托→`zs-select`+`entrustFlagOptions`(`have_or_not`)，移除错误硬编码 `1/2`

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：permitConstants.js、plan/detail.vue、PermitPlanPanel.vue、PresalePlanFillForm.vue
- 来源会话ID：efd9562e-b10f-4594-b813-0ef6e60b60d2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_dict_fix",
  "source_extraction_id": "76d1d541f8e54cc298fc91be29bc6250",
  "version": 1,
  "memory_type": "entities"
}
-->