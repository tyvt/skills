# buildingTable.vue导入路径错误修复
产品2.0中projectManagement/buildland/detail.vue因引用不存在的buildingTable.vue路径导致构建失败，已修正为正确路径。

## 问题原因
- detail.vue引用了不存在的路径 './project/components/buildingTable.vue'，解析到projectManagement/project/components/buildingTable.vue，该文件不存在
- 实际组件位于src/views/building/project/components/buildingTable.vue，且支持landPlotId属性

## 修复内容
- 将导入改为 import buildingTable from '@/views/building/project/components/buildingTable.vue'
- 构建错误消除，但出现无关错误：缺少图片资源src/assets/images/down.png

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：buildingTable.vue、projectManagement/buildland/detail.vue
- 所属项目：产品2.0；来源会话：a4b83bc3-a943-4439-b513-3c52d63c3302；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_import_fix",
  "source_extraction_id": "3b7c32de1f0b440c8ceb0198c73dafbb",
  "version": 1,
  "memory_type": "entities"
}
-->