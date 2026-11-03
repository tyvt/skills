# 企业变更返回未切view致编辑态残留
苏州市房地产监测V3 变更编辑态点返回未将URL参数formMode重置为view，导致详情页未重现且草稿残留。

## 问题根因
- 变更编辑态点返回未将URL参数 `formMode` 重置为 `view`
- 导致详情页未重现且草稿残留

## 关键修复
- 返回时URL改 `formMode=view`，清除未保存联系人，详情页重显变更按钮
- E2E用例 `company-record-change.spec.js` 避免 `getByText('')` 匹配空节点，仅联系人有值时断言回显

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/075.md
- 涉及文件：institutionRegister/index.vue、companyBasicInfo/detail.vue、change/detail.vue、DeveloperBasicInfoDetail.vue、companyBasicInfoShared.js、toB/companyRecord/detail.vue、detailMixins.js、OperationBtnGroup/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：db089cf1-03c8-448c-a942-78bec363a420；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_formmode_bug",
  "source_extraction_id": "035bf3f5de7f43a499299f8415342812",
  "version": 1,
  "memory_type": "entities"
}
-->