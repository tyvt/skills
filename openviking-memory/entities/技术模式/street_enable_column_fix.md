# 街道层级启用状态列缺失修复
苏住房G项目regionBankAuth模块街道层级列表缺少「启用状态」列，已补充。

## 问题原因
- 街道节点（level === 'street'）的columns只配置了「区级可用」「街道授权」，没有「启用状态」列；区级、市级则有该列

## 修复内容
- 在街道层级列配置中增加启用状态列，使用is_enable字典展示，与市级一致
- 街道数据来自/system/streetBankPolicy/page，listCallback已统一将enableStatus转为字符串，字典列可直接渲染

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/system/regionBankAuth/index.vue、components/StreetAuthDialog.vue、utils.js
- 所属项目：苏住房G；来源会话：a1374881-763d-4840-b3aa-3eaf7ccde1c3；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_enable_column_fix",
  "source_extraction_id": "ad128491ddb047a6bbc7e9b936d4e89b",
  "version": 1,
  "memory_type": "entities"
}
-->