# mathjs add 空值入参类型报错兜底
building/detail.vue 中 getFloor 调 mathjs add 计算总层数时空值抛类型错误，改用 || 0 兜底。

## 问题描述
- building/detail.vue 的 getFloor 调 mathjs add 算总层数
- floorNumberAbove 或 floorNumberUnder 为 undefined 或空字符串时抛类型错误

## 解决方案
- 操作数使用 || 0 兜底，与 UnitDialog.vue 逻辑对齐

## 涉及文件
- zhi2-web-admin/src/views/building/building/detail.vue
- zhi2-web-admin/src/components/AmountInput/index.vue
- zhi2-web-admin/src/directives/formatter/money.js
- zhi2-web-admin/src/components/zs-input/zs-input.vue
- zhi2-web-admin/src/views/building/building/components/UnitDialog.vue
- zhi2-web-admin/src/views/building/unit/detail.vue
- zhi2-web-admin/src/views/building/buildingChange/detail.vue
- zhi2-web-admin/src/views/building/unitChange/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：园区公共收益/035.md
- 来源会话：748fb1f8-e625-4295-9c80-d99233536464；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mathjs_add_guard",
  "source_extraction_id": "6c92fed8893d4123a7051e661689f0c0",
  "version": 1,
  "memory_type": "entities"
}
-->