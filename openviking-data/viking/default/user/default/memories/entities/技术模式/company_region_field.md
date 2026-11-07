# 经纪机构区域字段变更前端适配与字典展示
getOwnCompany 经纪机构返回 administrativeArea（字典 ECONOMIC_INSTITUTIONS_REGION）替换 provinceCityArea，前端原消费旧字段未适配。

## 问题根因
- getOwnCompany 接口经纪机构返回字段由 provinceCityArea 改为 administrativeArea（字典 ECONOMIC_INSTITUTIONS_REGION）
- 前端原消费 provinceCityArea 的表单与校验未同步适配

## 修复方案
- companyRecord.js 增接口注释说明字段变更
- CompanyBasicInfoDetail.vue、toB/companyRecord/detail.vue 等表单/校验改 administrativeArea
- companyBasicInfoContent.js 中 normalizeCompanyBasicForm 完成映射与默认值移除，兼容旧数据
- CompanyBasicInfoDetail.vue 新增 regionOptions 加载 ECONOMIC_INSTITUTIONS_REGION 字典渲染

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/090.md；src=苏州市房地产监测V3-rest/133.md；src=苏州市房地产监测V3/145.md；src=苏州市房地产监测V3/176.md
- 涉及文件：companyRecord.js、institution/record/index.vue、companyApply/detail.vue、CompanyBasicInfoDetail.vue、companyBasicInfoContent.js、toB/companyRecord/detail.vue、companyRecordAgency/detail.vue、companyApplyAudit/detail.vue、personnelRecord/components/detail.vue、staffManagement/components/detail.vue、companyManagement/components/CompanyBasicInfoForm.vue
- 来源会话：b82a2bdb-bc43-4b64-8752-65616c815a12；69acdb4b-1c0e-45f8-bc4e-41d66fa2aa9c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_region_field",
  "source_extraction_id": "557c86357e9b4baca04357cc63d73f27",
  "version": 4,
  "memory_type": "entities"
}
-->