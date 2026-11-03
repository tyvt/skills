# 街道节点列缺启用状态列
街道节点（level === 'street'）在 regionBankAuth/index.vue 的 columns 仅配置「区级可用」「街道授权」，缺失「启用状态」列。

## 问题现象
- 街道层级表格仅展示「区级可用」「街道授权」两列，无启用状态可视化
- 街道数据经 /system/streetBankPolicy/page 的 listCallback 转字符串后由字典列直接渲染

## 解决方案
- street 层级列配置需增加 type: 'dict', prop: 'enableStatus', dictUrl: 'is_enable' 列
- 街道数据经 listCallback 转字符串后由字典列直接渲染启用状态

## 验证与归属
- 验证证据：苏住房G/069.md
- 涉及文件：system/regionBankAuth/index.vue、StreetAuthDialog.vue、utils.js、detail.vue
- 所属项目：苏住房G；来源会话ID：a1374881-763d-4840-b3aa-3eaf7ccde1c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_enable_col",
  "source_extraction_id": "62aa50b1d31141a59681e1090dfd286d",
  "version": 1,
  "memory_type": "entities"
}
-->