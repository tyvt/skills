# 月报统计合计列 monthValue 取值修复（苏住房G）
苏住房G 月报统计详情页「合计」列已修复，正确解包 monthValue 显示数字。

## 修复内容
- `monthlyReport.js` 新增 `extractMonthValue(item)` 辅助函数：`return item?.monthValue ?? null`
- `buildStatTableRows` 中对 `regionValues` 与 `total` 统一调用 `extractMonthValue` 解包，不再显示 `{"monthValue": 3}` 这类对象

## 验证结果
- 本地验证：`regionValues` 输出 `[1, 2]`，`total` 输出 `3`
- 刷新月报统计详情页后「合计」列正常显示数字

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/utils/monthlyReport.js`、`zhi2-web-admin/src/views/publicQuery/monthlyReport/detail.vue` 等
- 所属项目：苏住房G；来源会话：697d27f0-7752-400c-9d86-9e7940bec722；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_monthvalue",
  "source_extraction_id": "d8a74d1aab5b4d0b85d30ea4f6cc11b7",
  "version": 1,
  "memory_type": "entities"
}
-->