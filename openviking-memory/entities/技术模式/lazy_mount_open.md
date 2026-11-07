# 懒挂载与open事件错配致getList未调用
苏州市房地产监测V3 弹窗组件因懒挂载与 @open 事件生命周期不匹配，首次打开时 getList() 未被调用。

## 问题根因
- 懒挂载（v-if）与 @open 事件生命周期不匹配，组件首次打开时 getList() 未调用

## 修复方案
- 需对齐挂载时机与事件触发顺序以确保数据加载

## 涉及文件
- supervision/deposit/other_record/components/PaymentOutletDialog.vue、detail.vue
- vite.config.js
- components/ProjectDialog/index.vue、views/components/ProjectDialog.vue、SelectDialog.vue
- 前端技术信息.md、.workbuddy/memory/MEMORY.md

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/107.md
- 所属项目：苏州市房地产监测V3；来源会话：8741662d-a0ae-43f6-861e-3a3ff5b3e5f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lazy_mount_open",
  "source_extraction_id": "5e5aaa7ca34747248ba59c37c87fab01",
  "version": 1,
  "memory_type": "entities"
}
-->