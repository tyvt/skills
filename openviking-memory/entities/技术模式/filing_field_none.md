# 列表备案字段前端追加 none 伪值
苏住房G 物业管理区域列表新增「管理主体」「收费方式」列与筛选时，后端字典缺「未备案」项，需前端追加 none 伪值并兜底缺项。

## 问题背景
- 管理主体取共有资金-管理主体，展示最新完成备案类型，未备案为空
- 后端字典 benefit_management_subject 仅 0/1/2（业委会/物业服务企业/物管会），无「未备案」
- 「未备案」非备案状态而是无记录，字典天然缺项，等补会造成「字典值+空值」两套语义

## 解决方案
- 页面加载 benefit_management_subject 后判断无 none 则追加 { dictValue:'none', dictLabel:'未备案' }
- 筛选参数 name=managementSubject，value 取 0|1|2|none
- complexFieldConfig.js 新增 managementSubject 单选 + EQ 运算符，DEFAULT_COMPLEX_FIELDS 加同名兜底项防字典加载失败缺项
- 列表列直接渲染 managementSubjectName（未备案为空、不显示占位符），收费方式走全局 dictFormatter + property_charging_method

## 验证与归属
- 涉及文件：publicQuery/complex/index.vue、zs-advanced-query/complexFieldConfig.js、benefit/assetLeaseApply/index.vue、benefit/pubManagementOrg/detail.vue、zs-advanced-query/advancedQueryCore.js、benefit/pubChangeleadershipAudit/detail.vue、benefit/pubHouseDetailChange/index.vue、publicQuery/propertyCompany/index.vue、docs/complex-pageNew-backend-handoff.md
- 所属项目：苏住房G；来源会话：579a0b70-5ca8-42fa-86cb-0af96a7205d9；代码基线：ad5bbd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filing_field_none",
  "source_extraction_id": "9d6a5afb1d8e4fd5a2e3955461234a78",
  "version": 2,
  "memory_type": "entities"
}
-->