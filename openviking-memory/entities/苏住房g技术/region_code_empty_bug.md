# 行政区划不能为空根因
苏住房G 收费标准与物业收费管理保存时报「行政区划不能为空」，根因为选物业管理区域只回填 regionName 未同步 regionCode。

## 问题现象
- 收费标准 pubParkingRate/detail.vue、ChargeStandardDialog.vue 保存报行政区域/行政区划不能为空
- 管理主体模块此前同报错（commit 841479510），属同源复发

## 根因分析
- 选「物业管理区域」只调 getFullRegionNameByRegionCode 写 form.regionName 展示值
- 未把区划编码写进 form.regionCode，后端校验读 regionCode，请求体该字段为空

## 修复方案
- 选区域三件套一起写：regionName（展示）、regionCode（提交取 row.region 原始编码）、同步街道社区
- B 端自动带入当前小区走同一 applyPropertyProjectRow，仅补 regionCode 一处两入口同效

## 经验沉淀
- 排查「显示已填但后端说为空」先对照 form 里哪个是提交字段哪个仅展示字段
- 涉及文件 pubParkingRate/detail.vue、ChargeStandardDialog.vue、api/benefit/pubParkingChargeStandard.js；会话 23d3fee1；基线 26069c8

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "region_code_empty_bug",
  "source_extraction_id": "0486331f426744389b891531c5cf81c6",
  "version": 1,
  "memory_type": "entities"
}
-->