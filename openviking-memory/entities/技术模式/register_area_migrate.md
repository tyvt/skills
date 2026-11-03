# 机构注册区域字段迁移兼容旧数据
苏州市房地产监测V3中Step1BasicInfo.vue将「行政区域」绑定由provinceCityArea改为administrativeArea，需兼容旧数据。

## 问题根因
- 原绑定provinceCityArea，新字段administrativeArea，旧数据无新字段

## 解决方案
- Step1BasicInfo.vue用mergeRecordForm兼容旧数据administrativeArea || provinceCityArea，提交排除旧字段
- detail.vue改展示新字段并加载ECONOMIC_INSTITUTIONS_REGION字典，旧数据回退至provinceCityArea

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/062.md
- 涉及文件：Step1BasicInfo.vue、detail.vue、AgencyApplyDialog.vue、CompanyBasicInfoForm.vue等
- 所属项目：苏州市房地产监测V3；来源会话：b87a6819-b6e9-446b-8864-ad0ee4ca0fc1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_area_migrate",
  "source_extraction_id": "2631256d0f3846be87323d35fca57b3e",
  "version": 1,
  "memory_type": "entities"
}
-->