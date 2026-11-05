# 旧物业管理区域变更详情名称回显修复
苏住房G 项目 property/complexChange/detail.vue 在变更旧物业管理区域时名称显示异常，已通过新增 resolveRecordName 等方法修复。

## 问题现象
- 对旧物业管理区域发起变更时，变更详情页「物业管理区域名称（备案名称）」未正确显示（如应显示「财神里小区」）。

## 修复内容
- 新增 resolveRecordName 方法，统一名称回退逻辑：recordName → complexName → originalObj.recordName → originalObj.complexName。
- 修复 add 模式 created 钩子：从物业管理区域详情点击「变更」加载小区数据后，自动将 complexName 回填到 recordName。
- 统一展示与回调取值：detailCallback、contentInfo 查看模式、rangeTable 的 :complexName 均使用 resolveRecordName 解析。

## 验证建议
- 打开旧物业管理区域详情 (complexId=667603002413487)，点击「变更」，确认名称显示为「财神里小区」。

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G。
- 涉及文件：src/views/property/complexChange/detail.vue、src/mixins/detailMixins.js。
- 来源会话ID：81e0c5dc-49f5-4db4-8eef-299f62b77144。

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "complex_change_fix",
  "source_extraction_id": "f71cdca3fc7f42be8b25a9f5ef75b181",
  "version": 1,
  "memory_type": "entities"
}
-->