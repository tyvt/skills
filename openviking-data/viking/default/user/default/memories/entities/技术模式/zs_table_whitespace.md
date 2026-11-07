# zs-table固定宽自定义列空白修复
苏州市房地产监测V3 中品牌详情页 `zs-table` 因固定宽自定义列参与剩余宽度均分导致右侧空白的 bug 已修复。

## 原因
- 「加盟门店授权书」列用了 `type="custom"` + `slot-width` 做固定宽度，但 `zs-table` 仍把它当成可拉伸列去分剩余宽度
- 多出来的宽度没有落到任何一列上，在「加盟门店备注」和操作列之间出现一块空白

## 修复
- `zs-table-column.vue`：固定宽自定义列（`type="custom"`、带 `slot-width` 等）不再参与剩余宽度均分
- 拉伸算法里的 `getBaseWidth` 与真实列宽对齐：有 `slot-width` 时直接用它，避免测算偏差
- 授权书列仍为图片缩略图 / 非图片链接，宽度按内容动态计算

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zs-table-column.vue`、`FranchiseTable.vue`
- 所属项目：苏州市房地产监测V3；来源会话：00b4659f-08fb-4133-a80c-e461befbd2cf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_whitespace",
  "source_extraction_id": "3fa26587d60f4b14a861e10b9d4f9839",
  "version": 1,
  "memory_type": "entities"
}
-->