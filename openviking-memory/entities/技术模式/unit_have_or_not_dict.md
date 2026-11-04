# 单元有无电梯字典修正
苏州市房地产监测V3 中将单元管理相关列表的「有无电梯」列字典由错误的 `sys_include` 改为 `have_or_not`，修复显示原始值 0 的问题。

## 问题根因
- 单元管理、楼盘表-单元、单元变更三处列表「有无电梯」列原用 `sys_include` 字典，该字典无匹配值导致列表显示原始值 0

## 修改文件
- `zhi2-web-admin/src/views/projectManagement/unitinfo/index.vue`（单元管理列表页）
- `zhi2-web-admin/src/views/building/unit/index.vue`（楼盘表-单元列表）
- `zhi2-web-admin/src/views/building/unitChange/index.vue`（单元变更列表）

## 验证与归属
- `have_or_not` 字典类型在预售方案模块已有使用（`permitConstants.js` 的 `PLAN_DICT_TYPES.HAVE_OR_NOT`），刷新后显示字典标签（有/无）
- 若仍显示数字，需确认系统字典管理中 `have_or_not` 的 dictValue 与接口返回值一致
- 所属项目：苏州市房地产监测V3；来源会话ID：4676abc6-8d97-4393-94eb-00860b189dc6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_have_or_not_dict",
  "source_extraction_id": "37bad7824c0e47148de04351dc784be5",
  "version": 1,
  "memory_type": "entities"
}
-->