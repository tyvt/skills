# Element UI 必填红星要求 prop 与 rules 键名一致
zhi2-web-admin 详情页用 el-form 时，el-form-item 的 prop 需与 rules 键名完全一致，否则标签前不显红色必填星号且校验提示不一致。

## 现象
- el-form-item 的 prop 绑定提交字段（如 parkingChargeStandardId），rules 写在展示名字段（parkingChargeStandardName）上。
- 保存时自定义/异步校验仍报「xxx不能为空」，但标签前无红色必填 *，用户以为非必填。

## 根因
- Element UI 必填红星由 prop 与 rules 键名匹配驱动，键名不一致时星号不渲染。

## 修复方案
- 把 rules 的键改成与 prop 完全一致，message 仍用业务文案（如「收费标准名称不能为空」）。
- 新增表单项先对齐 prop 再写 rules，不要按 label 起名。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：停车泊位租赁详情 prop 为 parkingChargeStandardId、rules 写在 parkingChargeStandardName 导致无必填星号，改 rules 键后星号与提示一致。
- 涉及文件：parkingSpaceContractFiling/detail.vue。
- 所属项目：园区公共收益；来源会话：7a6ec4bf-c697-4a2c-85ae-f84db3a2a972；代码基线：08d3255。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_prop_rules",
  "source_extraction_id": "29c980d82c364957b8a38a2d08250317",
  "version": 1,
  "memory_type": "entities"
}
-->