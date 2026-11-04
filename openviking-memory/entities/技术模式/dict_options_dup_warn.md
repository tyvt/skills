# 在 prop 和 data 中声明的字典选项触发 Vue 警告
在项目 苏州市房地产监测V3 中，在 `InfoCardDialog.vue` 的 `props` 和 `data()` 中声明的 `bizStateOptions` 触发了 Vue 警告。

## 问题根因
- 在 `institution/agencyPersonnel/components/InfoCardDialog.vue` 的 `props` 和 `data()` 中声明的 `bizStateOptions`
- 因名称重复触发 Vue 警告

## 修正
- 移除该 prop 并添加 `personnelStatusOptions`
- 在 `loadCredential` 中调用 `getDicts('personnel_business_status')` 以自动加载字典
- 父组件移除传入的参数

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/110.md
- 涉及文件: InfoCardDialog.vue, AgencyPersonnelList.vue, WorkCardDialog.vue, personnelStatus.js, AgencyPersonnelDetail.vue, zs-table-column.vue, listMixins.js, table.js
- 所属项目: 苏州市房地产监测V3; session: c7e8e793-52a0-4fb3-835f-ca02c35c1248; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_options_dup_warn",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->