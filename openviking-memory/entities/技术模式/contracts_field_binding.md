# contracts.vue 合同详情字段绑定错误
contracts.vue 通过 getLastContractDetail 获取合同详情，但模板错误地绑定了不存在的字段，导致信息缺失。

## 问题根因
- 模板绑定 `companyLeaderName`/`companyLeaderPhone`，而接口实际返回 `projectManager`/`managerPhone`
- 字段名不匹配导致联系人信息无法显示

## 修复要点
- 改为绑定 `detailInfo.projectManager` 与 `detailInfo.managerPhone`
- 接入 `PhoneCall` 组件支持拨打电话

## 涉及文件
- src/pages_owner/company/info/contracts.vue
- src/pages_owner/company/info/index.vue
- src/page-query/property-detail.vue
- src/api/property.js
- src/pages_owner/poll/index.vue

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：d0c4c430-2836-4d0f-89fe-307fffe632fd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contracts_field_binding",
  "source_extraction_id": "b593d87ec37f4a2daf53a37fe760199f",
  "version": 1,
  "memory_type": "entities"
}
-->