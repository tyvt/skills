# statisticsMap projectId 透传模式
statisticsMap 模块中，marker 点击的 projectId 从 index.vue 一路透传至 overviewContent 及其子组件，用于接口请求的项目隔离。

## 问题背景
- index.vue 点击 marker 时从 payload.data.projectId 取值存为 selectedProjectId
- 原 overviewContent.vue 未接收 projectId，导致子组件及接口请求缺失项目隔离

## 实现方式
- index.vue 通过 :projectId="selectedProjectId" 传给 overview-content
- 同时把整条 payload.data 通过 :data="selectedMarkerData" 传入，兼容原 leaseProjectId 用法
- overviewContent.vue 新增 prop projectId，透传至 operating-assets、asset-lease、lease-contract、income-expense-detail
- 相关接口请求优先使用该 projectId 保证数据隔离

## 涉及文件
- statisticsMap/index.vue
- overviewContent.vue
- 子组件：assetLease.vue、leaseContract.vue、incomeExpenseDetail.vue、operatingAssets.vue

## 验证与归属
- 来源会话：e25df0a3-f9f1-4362-8a34-4a8b0cb59fcd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statsmap_projectid_prop",
  "source_extraction_id": "fcd8a128f48a41fc9c6111b9caff053b",
  "version": 2,
  "memory_type": "entities"
}
-->