# 单元拆分弹窗计数与布局修复
苏州市房地产监测V3 修复了单元拆分弹窗全选计数不符与布局过窄的问题，统一数据源并改为纵向排列。

## 问题现象
- 全选显示 (0/2) 但下面有 3 个户室，因表单模式用 res.total 而全选分母用 selectList.length，重复 houseId 导致计数错
- el-checkbox-group 中 houseId 重复出现多个勾选项但可选值更少
- 106px 网格过窄，「房号+（单元名）」挤在一行，弹窗下半截显空

## 修改说明
- 表单模式用 rows.length <= 6 决定是否走勾选 UI，不再单独信 total
- 增加 formRoomList 按 houseId 去重，列表、全选、计数均基于同一数据源
- 户室列表改为纵向排列，单行完整展示房号与单元名

## 涉及文件
- zhi2-web-admin/src/views/projectManagement/unitinfo/components/UnitSplitDialog.vue
- zhi2-web-admin/src/views/building/unit/components/UnitSplitDialog.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：c25170fe-e1f9-496c-b733-e6745dc10d5b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_split_fix",
  "source_extraction_id": "fc84a4f4f2314ce5913569c89a7f798e",
  "version": 1,
  "memory_type": "entities"
}
-->