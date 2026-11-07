# 产品2.0 zs-table-column 字典类型自动推导
产品2.0 中 `zs-table-column` 组件在 `type="dict"` 且未指定字典类型时，会把 `prop` 从驼峰转下划线自动推导为字典类型名。

## 原因说明
- `zs-table-column.vue` 的 `underline(str)` 方法（377-384行）将驼峰属性转下划线：`buildType` → `build_type`
- 组件随后请求 `POST /system/dictData/listByType { dictType: 'build_type' }`
- 因此代码全局搜索不到 `build_type` 字符串（非手写字典名，而是自动生成），但在网络面板可见

## 涉及文件
- `src/components/zs-table-column/zs-table-column.vue`（377-384行）
- `src/views/building/building/detail.vue`（581-583行）
- `BuildRecordTable.vue`
- `src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildRecordTable.vue`（10-10行）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：ee495a83-a53a-4f2d-b96d-432bae5f93c9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_dict_autogen",
  "source_extraction_id": "2658e67cf6ca4db888ef45ede55a20f8",
  "version": 1,
  "memory_type": "entities"
}
-->