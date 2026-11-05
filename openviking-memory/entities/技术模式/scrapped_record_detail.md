# 报废记录详情页实现
参考 procedure/detail.vue 在 scrappedRecord/detail.vue 实现报废记录详情页，并对接真实接口与字段。

## 实现要点
- 布局使用 detailMixins + HeadTitle + Headline + DetailTemplate（查看）/ 表单（新增、编辑），底部 operation-btn-group
- 详情接口：moduleName 为 dataProperty、businessName 为 scrappedRecord 时，detailApiFull 为 GET /dataProperty/scrappedRecord/{id}
- 物业区域：弹窗选小区 /property/complex/page，bizState 为 2
- 设施设备：FacilitySelectDialog，/dataProperty/facility/page，固定 bizState 2 + complexId，增加 excludeScrapped

## 验证与归属
- 所属项目：产品2.0
- 来源会话：9d46bdf7-9e8f-42c5-85bc-23a99ef581f6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrapped_record_detail",
  "source_extraction_id": "34b4c24c5f494281ba1ca2287f22b231",
  "version": 1,
  "memory_type": "entities"
}
-->