# 报废记录设施设备跳转改造
产品2.0 的 zhi2-web-admin 中 scrappedRecord 模块改为点击设施设备名称跳转至设施设备详情页。

## 改动内容
- 引入路由工具 `getRouterPathByFilePath` from '@/utils/ruoyi'
- 「设施设备名称」列改为 link，绑定 `handleViewFacility`
- 新增 `handleViewFacility`，使用 `row.facilityId` 跳转 `maintenance/facility/detail` 并带 `formMode: 'view'`，参考 maintenance/repair/index.vue 与 planBid/components/maintenanceApplyTable.vue

## 涉及文件
- `src/views/dataProperty/scrappedRecord/index.vue`
- `src/views/dataProperty/scrappedRecord/detail.vue`
- `src/mixins/listMixins.js`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：71a2b0ad-3e39-4680-9567-9bb5c7e84b89；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrappedrecord_facility_link",
  "source_extraction_id": "adcae344ee4b4720a5c42b11e5cf062c",
  "version": 1,
  "memory_type": "entities"
}
-->