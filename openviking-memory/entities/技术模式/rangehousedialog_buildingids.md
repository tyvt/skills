# RangeHouseDialog 的 buildingIds 误拼字符串致后端报错
RangeHouseDialog.vue 的 getRightList 将 buildingIds 通过 checkList.join(',') 拼为字符串传给后端，后端需数组，导致报错。

## 问题根因
- getRightList 将 buildingIds 用 checkList.join(',') 拼成字符串传给后端，后端期望数组
- repairFunds/ownerApply/components/RangeHouseDialog.vue 同样存在 join(',') 写法

## 解决方案
- 改为直接传 checkList 数组，去除 join(',') 写法
- repairFunds/ownerApply/components/RangeHouseDialog.vue 同步去除 join(',')

## 验证与归属
- 验证证据：extracted source=cursor session=ed5871e8-b674-4437-be6c-e81ab129b3ce、285d96e1-2ba9-47f3-bae6-7acc747ce441
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/components/RangeHouseDialog.vue、repairFunds/ownerApply/components/RangeHouseDialog.vue、repairFunds/ownerApply/components/HouseholdDialog.vue
- 所属项目：太仓G；来源会话：ed5871e8-b674-4437-be6c-e81ab129b3ce、285d96e1-2ba9-47f3-bae6-7acc747ce441；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rangehousedialog_buildingids",
  "source_extraction_id": "dee365f6667649d6b5647eae46defd78",
  "version": 2,
  "memory_type": "entities"
}
-->