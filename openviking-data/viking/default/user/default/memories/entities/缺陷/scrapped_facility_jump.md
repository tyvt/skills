# 从报废记录列表跳转至设施详情
修改 `scrappedRecord/index.vue` 以使设施名称可点击并打开设备详情。

## 描述
- 文件 `scrappedRecord/index.vue` 导入 `getRouterPathByFilePath`。
- 列 "设施设备名称" （设施名称）配置 `function: this.handleViewFacility`。
- 该函数使用 `row.facilityId` 导航至 `maintenance/facility/detail` 并携带 `formMode: 'view'`。

## 涉及的文件
- `d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/scrappedRecord/index.vue`
- `d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js`
- `d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/scrappedRecord/detail.vue`
- `d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/repair/index.vue`

## 验证
- 来源: cursor session=71a2b0ad-3e39-4680-9567-9bb5c7e84b89
- 代码基线: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：71a2b0ad-3e39-4680-9567-9bb5c7e84b89


<!-- MEMORY_FIELDS
{
  "category": "defeito",
  "name": "scrapped_facility_jump",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->
