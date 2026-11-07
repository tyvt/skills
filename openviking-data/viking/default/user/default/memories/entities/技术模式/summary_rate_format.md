# 合计行完成率保留一位小数
淮安物管物业数据录入详情页合计行完成率由两位小数改为一位小数，满足需求图片精度。

## 问题根因
- `property/dataEntryDetail/index.vue` 的 `getSummaries` 通过 `calcRate` 计算合计行完成率。
- 原先使用 `toFixed(2)` 保留两位小数，与需求的一位小数不符。

## 修复方案
- 将 `calcRate` 中的 `toFixed(2)` 改为 `toFixed(1)`。
- 修改位置：`zhi2-web-admin/src/views/property/dataEntryDetail/index.vue` 的 `calcRate` 函数（约155-161行）。
- 示例：`42.54% → 42.5%`、`25.94% → 25.9%`、`39.41% → 39.4%`、`1.77% → 1.8%`。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：409a9212-d2de-4514-9b9c-101087799117
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "summary_rate_format",
  "source_extraction_id": "766cfeab02434f30a55a13c9314916f3",
  "version": 1,
  "memory_type": "entities"
}
-->