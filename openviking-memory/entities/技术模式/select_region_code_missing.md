# 选项目仅回填地区名漏写编码
benefit/pubParkingRate/detail.vue 的 applyPropertyProjectRow 仅回填 regionName 未写区域编码，致保存 payload 缺 regionCode。

## 问题根因
- applyPropertyProjectRow(row) 仅回填 this.form.regionName，未写入区域编码
- 保存 payload 缺失 regionCode 字段（区别于 property/feeStandard 链路）

## 解决方案
- 该函数内赋值 this.form.regionCode = row.regionCode || row.region 兼容字段名

## 验证与归属
- 验证：src=无锡锡山V2/001.md
- 涉及文件：benefit/pubParkingRate/detail.vue、property/feeStandard/*、mixins/detailMixins.js 等多文件
- 来源会话：10a3ad34-4550-4bcb-84d2-48b5270dd6f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_region_code_missing",
  "source_extraction_id": "ff6806156faa472abe330cb92a0e77f6",
  "version": 1,
  "memory_type": "entities"
}
-->