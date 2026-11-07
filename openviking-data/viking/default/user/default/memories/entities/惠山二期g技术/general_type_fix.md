# 一般表决列表业务类型修复
惠山二期G 项目「业主自治→一般表决」列表页业务类型列不展示问题已修复。

## 问题根因
- 列表页 initDict 过滤条件原先排除 ['0', '2']，导致 decisionBusinessType='0'（维修资金使用表决）被剔除
- 自定义 formatter 依赖被过滤的 decisionBusinessTypeOptions，找不到对应 label 显示为空

## 修复方案
- 列表列「业务类型」从自定义 formatter 改为 type: 'dict'，直接走完整字典 decision_business_type
- initDict 过滤从排除 ['0', '2'] 改为仅排除 ['2']，与详情页保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 涉及文件：zhi2-web-admin/src/views/autonomy/general/index.vue
- 所属项目：惠山二期G；来源会话：24864aca-3eff-4a2b-8d94-e4ce7b40b21d；代码基线：none
- 验证建议：刷新列表页确认 TPBJ20260928000001 业务类型显示「维修资金使用表决」，其他记录仍正常显示

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "general_type_fix",
  "source_extraction_id": "3dbc8c42edae4e499a4f6a25469a070a",
  "version": 1,
  "memory_type": "entities"
}
-->