# 选择监管标准弹窗列表数据解析修复
苏州市房地产监测V3 项目修复「选择监管标准」弹窗（`RegulatoryDialog.vue`）接口返回列表但表格显示「暂无数据」的问题。

## 问题根因
- `zs-select-dialog.vue` 的 `getList` 写死 `this.tableData = res[this.listKey]`，默认 `listKey = 'rows'`
- 接口实际返回 `{ code: 200, data: [...] }`，顶层无 `rows` 字段，导致 `tableData` 非数组
- 同目录 `zs-select-dialog-func.vue` 已有 `extractListData` 可回退到 `data` / `data.records`，但普通版未同步

## 修改要点
- 在 `zs-select-dialog.vue` 中与 func 版对齐，改用 `extractListData` / `extractTotal` 解析
- `rows` 不存在时自动回退用 `data` 数组赋值 `tableData`

## 验证与归属
- 需重新打开「选择监管标准」弹窗验证列表；若仍为空需提供完整响应 JSON 顶层字段名
- 涉及文件：`zs-select-dialog.vue`、`zs-select-dialog-func.vue`、`RegulatoryDialog.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：79196650-1f8f-4250-a924-1f5ed127ab56

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "regulatory_dialog_data_fix",
  "source_extraction_id": "e5756bdd8c034e2494a05870d03ebaea",
  "version": 1,
  "memory_type": "entities"
}
-->