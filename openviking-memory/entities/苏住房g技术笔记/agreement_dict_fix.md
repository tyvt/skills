# 协议签署单据状态字典错位修复
苏住房G协议签署页(pubRegulatoryAgreement)修复initDict中getDicts字典项配置错误导致的「单据状态」查询错位。

## 问题现象
- pubRegulatoryAgreement/index.vue中initDict的getDicts字典项配置错误，致「单据状态」查询条件错位

## 解法要点
- 修正initDict内getDicts参数，使其匹配正确的字典类型

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：c376e461-5508-4c08-8192-16ac1392a65f
- 来源：苏住房G/044.md；会话c376e461-5508-4c08-8192-16ac1392a65f
- 涉及文件：.workbuddy/memory/2026-09-10.md、benefit/pubRegulatoryAgreement/index.vue、property/propertyAgreement/index.vue、components/zs-table-column/zs-table-column.vue、mixins/ListTemplate.js、store/modules/common.js、main.js、mixins/listMixins.js
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "agreement_dict_fix",
  "source_extraction_id": "bbef648410d54c61896564bae729c765",
  "version": 1,
  "memory_type": "entities"
}
-->