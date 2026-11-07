# 合计行完成率计算须保留一位小数
dataEntryDetail 合计行完成率计算原保留两位小数点未满足规范，已改为保留一位小数。

## 问题描述
- dataEntryDetail/index.vue 中 calcRate 原使用 `toFixed(2)` 保留两位小数，未满足合计行百分比展示规范

## 解决方案
- 改为 `toFixed(1)` 保留一位小数

## 验证与归属
- 验证证据：extracted source=cursor session=409a9212-d2de-4514-9b9c-101087799117
- 涉及文件：src/views/property/dataEntryDetail/index.vue
- 所属项目：淮安物管 zhi2-web-admin；代码基线 none；来源会话：409a9212-d2de-4514-9b9c-101087799117

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entry_rate_decimal",
  "source_extraction_id": "7abfe3a4488f477dab9e576a3242ceb4",
  "version": 1,
  "memory_type": "entities"
}
-->