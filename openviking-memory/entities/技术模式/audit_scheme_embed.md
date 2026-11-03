# 机构入网审核详情服务方案须用内嵌列表防空数据
苏州市房地产监测V3 中审核方案位于详情接口 schemeList/companySchemeList，原分页接口常空致表格无数据，需优先取内嵌数组。

## 问题根因
- 审核中方案位于详情接口 schemeList/companySchemeList
- 原分页接口常空导致表格无数据

## 解决方案
- institutionRegister/detail.vue 优先取非空内嵌数组前端 slice 分页
- 空时走原接口兜底并重置页号

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/050.md
- 涉及文件：路由信息.json、institutionRegister/detail.vue、companyRecordAgency/detail.vue、institutionRegister.js、Step4ServiceScheme.vue、InstitutionRegisterPage.vue、companyScheme.js、companyScheme/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：f93aa12c-1cdd-411f-adfa-0e6cc96d1075；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_scheme_embed",
  "source_extraction_id": "7297edb7fc6144aeb1a7dca1c1581165",
  "version": 1,
  "memory_type": "entities"
}
-->