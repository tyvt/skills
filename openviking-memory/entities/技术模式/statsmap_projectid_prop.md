# statsmap_projectid_prop
statisticsMap/index.vue 点击 marker 取 projectId 存 selectedProjectId 并传 overview-content，overviewContent.vue 新增 prop projectId 透传至子组件。

## 问题背景
- statisticsMap/index.vue 点击 marker 时从 payload.data.projectId 取值存为 selectedProjectId 并传给 overview-content
- 原 overviewContent.vue 未接收 projectId 导致子组件及接口请求缺失项目隔离

## 解决方案
- overviewContent.vue 新增 prop projectId 并透传至 operating-assets 等子组件
- 相关接口请求携带 projectId 保证数据隔离

## 验证与归属
- 涉及文件：statisticsMap/index.vue、overviewContent.vue
- 来源会话：e25df0a3-f9f1-4362-8a34-4a8b0cb59fcd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statsmap_projectid_prop",
  "source_extraction_id": "283032af46cb4317908e542b78aaeac1",
  "version": 1,
  "memory_type": "entities"
}
-->