# 欠费金额列取值根因定位与修复
苏住房G费用申报模块定位到列表「欠费金额」列错误取 oweAmountSum 而非 arrearsAmount。

## 问题结论
- 列表「欠费金额」列曾错误取 oweAmountSum，不是 arrearsAmount，已于 2026-11-05 修复为 arrearsAmount。
- 代码原位于 feeBindScopeTable.vue 第24行：<zs-table-column label="欠费金额" prop="oweAmountSum" :formatter="formatOweAmountSum" />，修复后 prop 改为 arrearsAmount
- 格式化函数 formatOweAmountSum（579-589行）仅处理 oweAmountSum，有值则保留两位小数否则返回空。

## 涉及文件与归属
- 文件：src/views/property/feeDeclare2/components/feeBindScopeTable.vue、feeDeclare2/detail.vue。
- 所属项目：苏住房G；来源会话：4503975e-6816-4246-9c00-374fb2a079bb；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_bind_scope_owe_root",
  "source_extraction_id": "d01efc0c9d0d47ad8d1bc296cacdc1a3",
  "version": 2,
  "memory_type": "entities"
}
-->