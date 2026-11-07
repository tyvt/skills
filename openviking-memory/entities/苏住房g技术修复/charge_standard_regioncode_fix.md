# 收费标准保存行政区划为空修复
苏住房G(zhi2-web-admin) 保存「收费标准」时提示行政区域不能为空，因前端选择物业管理区域后仅设置 regionName 未同步 regionCode，已修复。

## 问题根因
- 后端保存「收费标准」要求提交 regionCode，前端选择物业管理区域后只设置展示用 regionName，未同步 regionCode
- 与此前「管理主体」模块同类问题一致（见 commit 841479510）

## 修复方案
- 公共收益-停车位收费标准(pubParkingRate/detail.vue)：选择物业管理区域时补充设置 this.form.regionCode = row.region，并同步街道社区编码
- 物业收费管理-收费标准弹窗(ChargeStandardDialog.vue)：选择时同样补充 regionCode

## 涉及文件与归属
- 文件：benefit/pubParkingRate/detail.vue、ChargeStandardDialog.vue、api/benefit/pubParkingChargeStandard.js
- 所属项目：苏住房G；来源会话：23d3fee1-5580-41c7-9e87-e84609a63989

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "charge_standard_regioncode_fix",
  "source_extraction_id": "7fa17d8bd2df458083f43c28cf14a90a",
  "version": 1,
  "memory_type": "entities"
}
-->
