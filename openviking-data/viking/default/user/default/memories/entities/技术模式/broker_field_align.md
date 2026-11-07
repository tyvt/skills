# 经纪机构页字段对齐修复
修复经纪机构页（BrokerPages.vue）字段宽度导致统一社会信用代码换行及标签值起点不一致问题，改为四列网格与 subgrid。

## 问题根因
- 全宽行与双列行用两套标签宽度，双列是两个50%格子各自flex，左右列值起点不一致，窄列文字叠在标签上
- ≤1200px 断点误将机构详情改成两列

## 调整方式
- 右侧字段区改为四列网格：180px | 值 | 180px | 值
- 双列项用 display: contents 让 dt/dd 落四列上，左右成对
- 全宽项占满一行用 subgrid（不支持回退相同四列），值统一从第2列跨到行末
- 修正 ≤1200px 断点机构详情误改两列问题

## 涉及文件与归属
- d:\repository\门户\zhi2-web-admin\src\views\home\publicPortal\pages\BrokerPages.vue
- d:\repository\门户\zhi2-web-admin\src\views\home\publicPortal\mock\brokers.js
- 所属项目：门户；来源会话：f3136e73-1172-459f-872c-cc4efe5d4b2f

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_field_align",
  "source_extraction_id": "50db55700aec41de90507de005ee0d8e",
  "version": 1,
  "memory_type": "entities"
}
-->
