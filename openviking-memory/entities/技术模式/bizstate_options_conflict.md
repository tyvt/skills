# bizStateOptions 命名冲突触发 Vue 警告
在 Suzhou Real Estate Monitoring V3 项目中，bizStateOptions 在 props 和 data() 中声明导致了冲突和 Vue 警告。

## 问题根因
- bizStateOptions 同时在 props 和 data() 中声明，导致冲突。

## 解决方案
- 在 InfoCardDialog.vue 中移除了 prop 并添加了 personnelStatusOptions。
- 在 loadCredential 中调用 getDicts('personnel_business_status') 加载字典。
- 父组件如 AgencyPersonnelList.vue 不再传递该参数。

## 文件和验证
- 涉及文件: InfoCardDialog.vue, AgencyPersonnelList.vue, WorkCardDialog.vue, personnelStatus.js, AgencyPersonnelDetail.vue, zs-table-column.vue, listMixins.js, table.js.
- 验证证据: src=苏州市房地产监测V3-rest/059.md; session c7e8e793-52a0-4fb3-835f-ca02c35c1248.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_options_conflict",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->