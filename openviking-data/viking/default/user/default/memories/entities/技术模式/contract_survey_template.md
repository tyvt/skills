# 合同范本与问卷模板详情页 DetailTemplate 改造
苏州市房地产监测V3 完成合同范本与问卷模板详情页使用 DetailTemplate 展示并规范对齐。

## 改动内容
- presale/template/detail.vue 在 formMode === 'view' 时改用 DetailTemplate 展示基本信息，新增/编辑仍走原 el-row 表单。
- 新增 contentInfo：编号、名称、版本、项目、是否启用、合同类型（tag+字典）、备注（textarea+整行布局）。
- 引入 DETAIL_COL_THREE / DETAIL_COL_FULL，与同模块 specialcontract/detail.vue 一致。
- survey/template/detail.vue 的 contentInfo 改用 DETAIL_COL_*，问卷描述改为 textarea。
- 修复 survey/template/detail.vue 中 useCount === 0 在 DetailTemplate 里被当成空显示为「-」的问题。

## 涉及文件
- zhi2-web-admin/src/views/commercialHousingSales/presale/template/detail.vue
- zhi2-web-admin/src/views/survey/template/detail.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/specialcontract/detail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：0a2af86f-af14-4bf6-9a47-1232bb898f9c；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_survey_template",
  "source_extraction_id": "9fd334bb627245ef84af5e82730e7532",
  "version": 1,
  "memory_type": "entities"
}
-->