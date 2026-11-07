# 开发企业从业人员详情页隐藏要件上传模块
苏州市房地产监测V3 中开发企业（organType==='01'）从业人员详情页不需要件上传模块，需按条件隐藏。

## 约束规则
- 开发企业（organType === '01'）从业人员详情不需要件上传
- 经纪机构不受影响，仍显示要件上传模块
- staffManagement/components/detail.vue 与 toB/personnelRecord/components/detail.vue 新增 showAppendixSection 计算属性控制显隐
- 模板条件改由 showAppendixSection 决定；beforeSaveHook 直接返回、validateAppendix 返 true 跳过校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/146.md
- 涉及文件：staffManagement/components/detail.vue、toB/personnelRecord/components/detail.vue、api/company/personnelRecord.js、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、constants/companyOrgan.js、e2e/fixtures/company-menu-config.js、toB/personnelChange/detail.vue、staffManagement/personnelChange/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：76ab4922-b1d4-4c4f-bf33-36bf0db42b93；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "personnel_hide_appendix",
  "source_extraction_id": "38960cc9508a40a19b9c3ec07e6c4353",
  "version": 2,
  "memory_type": "entities"
}
-->