# 收缴率展示保留两位小数（苏住房G）
苏住房G 项目 feeDeclare2/detail.vue 调整三个收缴率展示逻辑，优先后端字段并保留两位小数。

## 改动内容
- 户室/资金/面积收缴率优先使用后端字段 `collectionRate`、`fundCollectionRate`、`areaCollectionRate`
- 展示格式由 `toFixed(0)` 改为 `toFixed(2)`
- 示例：户室收缴率 91.67%，资金收缴率 91.67%，面积收缴率 89.51%

## 涉及文件
- `zhi2-web-admin/src/views/property/feeDeclare2/detail.vue`

## 验证与归属
- 所属项目：苏住房G；来源会话：35e5c7ce-aa72-47e0-b6de-ec32e623dc5f
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare_rate_format",
  "source_extraction_id": "b658824e88774344b10a90357779d9e4",
  "version": 1,
  "memory_type": "entities"
}
-->