# 选项目仅回填地区名漏写编码
benefit/pubParkingRate/detail.vue（停车位收费标准页，接口 benefit/pubParkingChargeStandard）的 applyPropertyProjectRow 仅回填 regionName 未写区域编码，致保存 payload 缺 regionCode。

## 问题根因
- 两条选项目路径（B端 initCurrentProject、A端弹窗 SelectDialog）最终都走 applyPropertyProjectRow(row)
- applyPropertyProjectRow(row) 仅回填 this.form.regionName（由 row.region 转名称），未写入区域编码
- 保存 payload 缺失 regionCode 字段（property/feeStandard 是另一页面，非本条链路）

## 解决方案
- 该函数内赋值 this.form.regionCode = row.regionCode || row.region 兼容字段名（项目列表返回字段名为 region，即 "320205"）

## 验证与归属
- 验证：src=无锡锡山V2/001.md；workbuddy project=无锡锡山V2
- 涉及文件：benefit/pubParkingRate/detail.vue（改动核心）；property/feeStandard 为另一页面，非本条链路
- 来源会话：10a3ad34-4550-4bcb-84d2-48b5270dd6f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_region_code_missing",
  "source_extraction_id": "aed577481db842dca661fcd886b59106",
  "version": 2,
  "memory_type": "entities"
}
-->