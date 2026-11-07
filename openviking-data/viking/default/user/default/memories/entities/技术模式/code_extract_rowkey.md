# 立项登记编码提取弹窗row-key修复
苏州市房地产监测V3 修复了「立项登记编码提取」弹窗勾选无反应、「确定」不可用的 bug。

## 问题原因
- 弹窗数据来自 `exportList`，行上是 `prjNum`（立项登记编码）等外部字段，一般还没有 `projectInitiationChangeId`
- 表格却用子表主键 `projectInitiationChangeId` 作为 `row-key`，多行 key 都是 `undefined`
- Element UI 多选列无法正确维护勾选，表现为点复选框无反应、「确定」一直不可用

## 修改要点
- `ProjectCodeExtractDialog.vue`：表格 `row-key` 改为 `prjNum`；多选列关闭 `reserve-selection`；分页/打开时清空勾选；`batchInsert`/查询优先用传入的 `id`
- `RecordCodeTable.vue`：向弹窗传入 `:id="isChange ? projectChangeId : projectId"`，与当前变更单/项目一致
- 验证路径：项目变更 → 立项登记编码 → 提取 中再试勾选并确定

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`ProjectCodeExtractDialog.vue`、`RecordCodeTable.vue`
- 来源会话：2ad0a6d1-00bd-4325-b11b-d24bc3592b7f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "code_extract_rowkey",
  "source_extraction_id": "a713c3405a0b43ccbbf1e5e1e8b62543",
  "version": 1,
  "memory_type": "entities"
}
-->