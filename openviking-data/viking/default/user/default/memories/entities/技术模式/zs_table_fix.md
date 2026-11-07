# zs_table_fix
产品2.0 的 `zs-table.vue` 修复固定列小计行样式错乱与伪元素遮罩缺失问题。

## 问题根因
- 原选择器未命中：小计行固定列单元格无 `zs-operate-column-cell` 类（`class-name` 只作用于表体），样式未生效。
- 误删 `fixed-footer-wrapper::after` 伪元素遮罩（原用白色块盖右侧 1px 竖线并留 `bottom: 1px` 保留底边），导致右边线露出。

## 本次修正
- 改用 `td:last-child` 选中操作列小计单元格。
- 恢复 `::after` 伪元素遮罩（`right: -1px`，`bottom: 1px`，保留底边）。
- 有合计行时将 `fixed-right` 设为 `overflow: visible`，避免遮罩被裁切。

## 涉及文件与来源
- 文件：`receiptin/index.vue`、`zs-table.vue`、`ZsSummaryText/index.vue`、`src/styles/index.scss`
- 来源会话：8e29a239-a740-473b-921d-cd75f2915a3e；项目：产品2.0

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_fix",
  "source_extraction_id": "cdd213eb2a634e3fb3eece7b8099cf7a",
  "version": 1,
  "memory_type": "entities"
}
-->
