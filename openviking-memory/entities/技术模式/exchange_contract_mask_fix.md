# 合同换签列表买受人姓名脱敏修复
苏州市房地产监测V3 的 exchangeContract/index.vue 补齐了原买受人/新买受人姓名脱敏实现。

## 问题根因
- `exchangeContract/index.vue` 已配置 `listNameFormatter`，但全局 `formatters/index.js` 缺失该函数，列表显示明文

## 改动内容
- 新增 `maskPersonName.js`：2 字 `张*`、3 字及以上保留首尾；已含 `*` 视为后端脱敏不再处理
- `formatters` 中实现 `listNameFormatter`，并补上项目大量引用的 `dateFormatter`、`dateTimeFormatter`、`idCardFormatter`、`listPhoneFormatter`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：exchangeContract/index.vue、formatters/index.js、maskPersonName.js
- 所属项目：苏州市房地产监测V3；来源会话：aaf8bc2b-ca74-47e8-a834-52fa7830c0c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "exchange_contract_mask_fix",
  "source_extraction_id": "006a04fcf9644149a135bbe7d42014c7",
  "version": 1,
  "memory_type": "entities"
}
-->