# subVenueTable.vue引用路径调整修复
产品2.0中benefit/leaseApply/detail.vue因错误引用subVenueTable.vue路径导致找不到模块，已修正。

## 问题原因
- detail.vue原引用 '@/views/benefit/pubUseMoneyApply/components/subVenueTable.vue' 路径错误
- 实际组件位于 '@/views/benefit/leaseApply/components/subVenueTable.vue'

## 修复内容
- 将导入改为 import subVenueTable from '@/views/benefit/leaseApply/components/subVenueTable.vue'
- 修改后“找不到模块subVenueTable”错误消失，剩余为文件内原有TS类型报错，与路径无关

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：benefit/leaseApply/detail.vue、benefit/leaseApply/components/subVenueTable.vue
- 所属项目：产品2.0；来源会话：e9d0317f-8909-475d-8300-5760a17efba4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subvenue_import_fix",
  "source_extraction_id": "3b7c32de1f0b440c8ceb0198c73dafbb",
  "version": 1,
  "memory_type": "entities"
}
-->