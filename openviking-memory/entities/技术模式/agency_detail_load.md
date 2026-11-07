# 机构详情组件创建时直调接口不依赖表单模式
苏州市房地产监测V3 中机构详情组件在 created 阶段无条件调用 loadDetail()，避免依赖 detailMixins 的 formMode 导致接口漏调。

## 实现要点
- 依赖 detailMixins 的 formMode==='view' 才初始化会导致企业基本信息接口漏调
- AgencyBasicInfoDetail.vue 在 created 无条件调用 loadDetail() 走 getOwnCompany
- 可作为机构详情页标准实现

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/250.md
- 涉及文件：DeveloperBasicInfoDetail.vue、detail.vue、detailMixins.js、form.js、AgencyBasicInfoDetail.vue、companyRecord.js、AgencyEntryNetworkDetail.vue、zljg/companyRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：e15a1da6-99f2-4436-b12d-c0e94bfb9658；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_detail_load",
  "source_extraction_id": "010b16fd09244983972d9f0e9cb07a8e",
  "version": 1,
  "memory_type": "entities"
}
-->