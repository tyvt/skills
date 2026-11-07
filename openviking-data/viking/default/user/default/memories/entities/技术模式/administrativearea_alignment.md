# 备案列表 administrativeArea 字段对齐
后端字段变更为 administrativeArea，前端查询参数、列与筛选同步适配。

## 变更要点
- companyApplyAudit/index.vue 查询参数与列改为 administrativeArea
- 筛选改 select 取 ECONOMIC_INSTITUTIONS_REGION，init() 先加载字典再请求
- companyApply.js 补充注释并新增 updateCompanyApply 接口

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/207.md
- 涉及文件：companyApplyAudit/index.vue、companyApplyAudit/detail.vue、companyCancel/index.vue、api/company/companyApply.js、api/company/companyRecord.js、companyManagement/components/companyBasicInfoContent.js、mixins/listMixins.js、companyRecordAgency/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：0b852a77-0d91-4864-8952-efcea41ccc4f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "administrativearea_alignment",
  "source_extraction_id": "410c6abe2a3b43599e57be64b1b56ab3",
  "version": 1,
  "memory_type": "entities"
}
-->