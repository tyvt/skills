# 地区级联选择器与机构详情区划回显修复
苏州市房地产监测V3 修复了 location-cascader 组件未传 region prop 时的报警，并完善机构详情区划回显。

## location-cascader.vue
- 去掉 `region` 的 `required: true`，避免未传 prop 时报警
- 新增 `defaultValue`，兼容 `:default-value`（逗号分隔字符串或 [省,市,区] 数组）
- `syncSelectedPathFromProps`：`region` 优先，否则从 `defaultValue` 解析末级 6 位编码；`areas` 加载后再次同步
- 选择变更时仍发 `update:region` / `update`；若监听 `@getValue`，额外发 `{ value, label }`

## eorg/detail.vue
- `setErogName`：写入 `form.provinceCityArea`（`val.area || val.city || val.province`），选机构后区划能回显

## 涉及文件与归属
- 涉及：`location-cascader.vue`、`eorg/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：e660a1c1-9825-434a-be21-3120be9ea83f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cascader_region_fix",
  "source_extraction_id": "48df189a4d5045ffbb5db9580c9d5c11",
  "version": 1,
  "memory_type": "entities"
}
-->