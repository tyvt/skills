# 机构入网信息变更 administrativeArea 改造
苏州市房地产监测V3 完成机构入网信息变更列表与详情页 administrativeArea 字段改造。
## 改动内容
- companyRecord.js：为 pageCompanyRecordChanges、getCompanyRecordChangeDetail、updateCompanyRecordChange 补充 JSDoc，新增 addCompanyRecordChange 接口封装
- change/index.vue：查询参数 regionCode → administrativeArea，表格列改用 dict-url="ECONOMIC_INSTITUTIONS_REGION"，删除 formatRegion 方法
- change/detail.vue 与 toB/companyRecord/detail.vue 同步调整（主管部门相关页）
## 涉及文件
- zhi2-web-admin/src/api/company/companyRecord.js
- zhi2-web-admin/src/views/company/companyRecordAgency/change/index.vue
- zhi2-web-admin/src/views/company/companyRecordAgency/change/detail.vue
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：81bf5be6-c0ce-46ce-b29f-c26f9c1c7127；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_change_admin",
  "source_extraction_id": "8859921961514c0b83e99829e8eff324",
  "version": 1,
  "memory_type": "entities"
}
-->