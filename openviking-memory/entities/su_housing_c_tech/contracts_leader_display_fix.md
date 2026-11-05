# 物业合同项目负责人姓名电话不显示修复
苏住房C 小程序「物业合同」页面合同信息中项目负责人姓名和电话不显示的问题已修复，根因为接口字段名不匹配。

## 问题根因
- `contracts.vue` 通过 `getLastContractDetail` 获取合同详情，但模板绑定了 `companyLeaderName` / `companyLeaderPhone`
- 该接口实际返回的字段是 `projectManager` / `managerPhone`（与 `property-detail.vue` 一致），因此一直显示为 `-`

## 修复内容
- 项目经理：改为绑定 `detailInfo.projectManager`
- 联系电话：改为绑定 `detailInfo.managerPhone`，并使用 `PhoneCall` 组件支持点击拨打（与物业服务企业详情页一致）
- 修改文件：`src/pages_owner/company/info/contracts.vue`

## 验证与归属
- 刷新「物业合同」页面后，应能正常显示如「张静」「17751215965」等项目负责人信息
- 涉及文件：`contracts.vue`、`property-detail.vue`、`index.vue`、`page-query/property-detail.vue`、`api/property.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d0c4c430-2836-4d0f-89fe-307fffe632fd；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "contracts_leader_display_fix",
  "source_extraction_id": "89e86137a57a4163a4616007107418e7",
  "version": 1,
  "memory_type": "entities"
}
-->