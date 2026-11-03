# 酬金数额单位动态设置修复
淮安物管 zhi2-web-admin 中 detail.vue 的酬金数额因写死 unit:'%' 导致固定金额误显百分号，需按 remunerationExtractionMethod 动态设置。

## 问题背景
- detail.vue 中 contentInfo 的「酬金数额」写死 unit: '%'，导致 DetailTemplate 将固定金额误显为百分号。
- 与编辑区 remunerationExtractionMethod 区分逻辑不一致。

## 修复方案
- 按 remunerationExtractionMethod 动态设置 unit 和 dot：比例 '%'/0位、固定月 '元/月'/2位、其余 '元/年'/2位。
- 对齐展示逻辑，避免固定金额误显为百分号。

## 涉及文件
- zhi2-web-admin/src/views/property/propertyContract/components/detail.vue
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/formatters/index.js

## 验证与归属
- 验证证据：src=淮安物管/014.md
- 来源会话：d33d4f62-bcd8-4af4-8adc-3a0f5ac7884d；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remuneration_unit_fix",
  "source_extraction_id": "2ba854edc6664b4e909fc2e8d9323249",
  "version": 1,
  "memory_type": "entities"
}
-->