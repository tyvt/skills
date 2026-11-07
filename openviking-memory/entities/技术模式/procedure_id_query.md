# 步骤子表按 procedureId 查询 dataProperty
产品2.0 的 zhi2-web-admin 中按 `procedureId` 查询 `dataProperty` 以驱动步骤子表必填项。

## 行为说明
- `detail.vue` 给步骤子表增加 `:procedure-id="form.procedureId"`，与当前单据上的巡保程序一致
- `recordProcessStepTable.vue` 增加 `procedureId` 透传给 `RecordProcessStepDialog`
- `recordProcessStepDialog.vue` 新增 `procedureId` 属性

## 查询逻辑
- 在 `view`/`edit` 下调用 `GET /dataProperty/procedureProcess/page`，参数 `procedureId`、`pageNum: 1`、`pageSize: 500`
- 用返回列表中 `processSerial` 与当前步骤一致的那条记录，取 `isExplain`、`isPicture`（`'1'` 为必填）驱动原 `dynamicRules`
- 若没有 `procedureId`、没有步骤编号、请求失败或未匹配到行，则仍用 `detailForm`

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/recordProcess/components/recordProcessStepTable.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/recordProcess/components/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/procedure/components/procedureProcessDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：4d8f8198-d7b1-458f-891e-5a0c95b1090a；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "procedure_id_query",
  "source_extraction_id": "8a43c32a273941439109c1eae5f6e5e3",
  "version": 1,
  "memory_type": "entities"
}
-->