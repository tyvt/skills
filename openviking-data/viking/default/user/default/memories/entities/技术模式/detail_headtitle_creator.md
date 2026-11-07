# 详情组件顶部HeadTitle显创建信息避重复
园区物管2.0 中 article/components/detail.vue 顶部新增 HeadTitle 展示创建人及时间，并从详情字段列表移除对应项避免重复。

## 实现要点
- article/components/detail.vue 顶部新增 HeadTitle 展示创建人及时间
- 从详情字段列表移除对应项避免重复
- 组件内置 formMode !== 'add' 逻辑使新增模式不显示 HeadTitle

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/villagePartyOrganization/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/villagePartyOrganization/components/partyOrganizationHonorDialog.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/system/message/project/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/system/message/components/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/system/message/policy/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/partyOrganization/components/partyOrganizationHonorDialog.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/article/components/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 来源会话：c9355ab5-7e88-44c0-9187-09826e7c3a8d
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_headtitle_creator",
  "source_extraction_id": "b3308256c9da4e959219e2ced6ad87dd",
  "version": 1,
  "memory_type": "entities"
}
-->