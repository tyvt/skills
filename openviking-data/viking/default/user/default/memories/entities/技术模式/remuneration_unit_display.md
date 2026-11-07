# 酬金数额单位动态显示修复
淮安物管物业合同详情中酬金提取方式为固定金额（月）时，酬金数额错误显示百分号，已改为动态 unit 修复。

## 问题根因
- 查看模式下 contentInfo 里「酬金数额」写死 unit:'%'，导致固定金额（月）等类型仍被格式化为带 % 展示。
- 编辑区已按 remunerationExtractionMethod 区分 %、元/月、元/年，仅详情配置不一致。

## 解决方案
- 详情「酬金数额」按模板 amount-input 规则设动态 unit 与 dot：比例(==0)为 % 小数0位；固定金额月(==1)为 元/月 小数2位；其余为 元/年 小数2位。
- 修改文件 detail.vue（路径 .../propertyContract/components/detail.vue）及 detail-template.vue。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管。
- 涉及文件：detail.vue、detail-template.vue（路径 d:\repository\淮安物管\zhi2-web-admin\src\...）。
- 所属项目：淮安物管；来源会话：d33d4f62-bcd8-4af4-8adc-3a0f5ac7884d；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remuneration_unit_display",
  "source_extraction_id": "786ff81f84094d8eb6aa5023f40dbe21",
  "version": 1,
  "memory_type": "entities"
}
-->