# 注册单要件未同步备案致 030100 包缺文件
苏州市房地产监测V3 中，注册单要件审批后未同步至备案 companyRecordId，导致备案侧 busCode=030100 要件包无文件、90s 轮询失败。

## 问题根因
- 注册单要件审批后未同步至备案 companyRecordId
- 备案侧 busCode=030100 要件包无文件
- 90s 轮询失败，与开发企业 040100 同类问题

## 影响范围
- 涉及机构注册、企业注册、企业备案等多条链路
- 需将注册单要件同步至备案 companyRecordId 补齐要件包

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/004.md
- 涉及文件：路由信息.json、.workbuddy/memory/MEMORY.md、zhi2-web-admin/src/views/institutionRegister/components/Step3Appendix.vue、src/api/institution/institutionRegister.js、src/api/company/companyRegister.js、src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue、src/api/company/companyRecord.js、src/views/toB/companyRecord/detail.vue
- 来源会话ID：6b984501-42f6-4b9b-a56e-364375c13c03；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_appendix_sync",
  "source_extraction_id": "462201af45e742729b026ea5c07ddb26",
  "version": 1,
  "memory_type": "entities"
}
-->