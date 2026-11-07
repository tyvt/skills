# 变更详情ID解析修复
苏州市房地产监测V3 修复企业项目变更详情页通过路径进入时详情接口拿不到 companyRecordChangeId 的问题。

## 问题根因
- 变更详情页只从 `$route.query.id` 取 ID，未从路由路径解析（getId()/tableid）
- 通过 `/change/detail/{id}` 路径进入时，详情接口拿不到 companyRecordChangeId

## 修复内容
- 新增 companyRecordChangeId 计算属性，统一从 `$route.query.id`、`$route.params.tableid`、getId()（路径末段）、form 中已有值解析
- getDetail、validateDetailRequiredParams、getForm、提交/保存逻辑均改为使用该计算属性
- detailCallback 在接口响应未带 companyRecordChangeId 时，用路由 ID 回填避免表单主键为空

## 一致性
- 与 personnelRecord 详情页、companyRecordAgency/change/detail.vue 处理方式一致

## 涉及文件与归属
- 涉及文件：toB/companyRecord/detail.vue、companyRecordAgency/change/detail.vue、api/company/companyRecord.js、companyBasicInfoContent.js
- 所属项目：苏州市房地产监测V3；来源会话：24a5c5a8-dd40-426d-9696-d87bebf426bd
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "变更详情ID解析修复",
  "source_extraction_id": "67144a3a9ca34730818c9a048666c82e",
  "version": 1,
  "memory_type": "entities"
}
-->