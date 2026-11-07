# 经纪机构接口 administrativeArea 字段适配
苏州市房地产监测V3 完成经纪机构 getOwnCompany 接口返回 administrativeArea 替代 provinceCityArea 的前端适配。

## 改动内容
- companyRecord.js 中 getOwnCompany 已注明：经纪机构返回 administrativeArea，不再使用 provinceCityArea
- CompanyBasicInfoDetail.vue（经纪机构端「机构信息」页）：表单字段改为 administrativeArea，加载 ECONOMIC_INSTITUTIONS_REGION 字典展示行政区域，接口数据经 normalizeCompanyBasicForm 处理兼容旧字段
- toB/companyRecord/detail.vue（机构端变更页）：校验规则改为 administrativeArea，从 getOwnCompany/变更单详情加载时统一 normalize
- companyRecordAgency/detail.vue 主管部门相关页表单与校验同步调整

## 涉及文件
- zhi2-web-admin/src/.../companyRecord.js
- CompanyBasicInfoDetail.vue
- toB/companyRecord/detail.vue
- companyRecordAgency/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：b82a2bdb-bc43-4b64-8752-65616c815a12；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_area_api",
  "source_extraction_id": "81fd5c6810e94dd89c3a540e5bf7f87d",
  "version": 1,
  "memory_type": "entities"
}
-->