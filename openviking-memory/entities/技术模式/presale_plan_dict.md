# 预售方案三字段经zs-select接入字典去硬编码
苏州市房地产监测V3 预售方案的土地使用权类型、土地用途、有无委托三字段改为经 zs-select 接入字典，移除硬编码选项。

## 问题背景
- 原预售方案土地使用权类型、土地用途、有无委托使用硬编码 1/2 选项

## 解决方案
- `permitConstants.js` 新增 `PLAN_DICT_TYPES` 与 `resolveDictLabel()`
- `plan/detail.vue` 于 `created()` 调用 `initDict()` 经 `getDicts` 加载字典
- 三字段改为 `zs-select` 绑定对应 Options，移除硬编码 1/2 选项

## 验证与归属
- 涉及文件：PermitPlanPanel.vue、PresalePlanFillForm.vue、plan/detail.vue、permitConstants.js、presale-permit-helpers.js、ruoyi.js、前端技术信息.md、2026-09-11.md
- 验证证据：src=苏州市房地产监测V3/089.md
- 来源会话ID：efd9562e-b10f-4594-b813-0ef6e60b60d2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_dict",
  "source_extraction_id": "89b3d8544da244b99a09d467cebc71dd",
  "version": 1,
  "memory_type": "entities"
}
-->