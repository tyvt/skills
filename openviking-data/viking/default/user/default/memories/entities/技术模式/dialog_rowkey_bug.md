# zs-select-dialog rowKey 误用导致整表高亮
zs-select-dialog 的 rowKey 误写为接口不存在的字段时，所有行 key 为 undefined，选中后整表高亮。

## 现象
- 在「选择物业管理区域」等 zs-select-dialog 里点选一行，整张表每一行都被加选中高亮
- 删除/回填等按 key 的操作也一起错乱

## 根因
- 页面把 rowKey 写成 complexId，而接口返回的候选列表里无此字段，所有行 rowKey 均为 undefined
- Element 内部按 key 建立的映射塌成一条，选中状态被广播到全表

## 解决方案
- 页面侧 rowKey 对齐同模块已跑通页面用同一业务主键字段（此处 projectId），不要按业务语义想当然取名
- 组件侧在 zs-table 的 rowClassName 加空值过滤，遇到 undefined/null 的 row key 直接跳过，公共组件层防止坏 key 放大成整表高亮（兜底不能替代把字段改对）
- 排查提示：凡「选中态莫名扩散/全选」现象，第一步把 rowKey 与接口返回字段逐字对一遍

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 5af5c221 结论 rowKey 误设为 complexId 导致全 undefined、整表高亮，改为 projectId 并在 rowClassName 增空值过滤
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankReceiptApply/detail.vue、src/components/zs-select-dialog/zs-select-dialog.vue、src/components/zs-table/zs-table.vue
- 所属项目：产品2.0；来源会话ID：5af5c221-8134-4622-ae26-0886a69a35ed；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_rowkey_bug",
  "source_extraction_id": "1feff99c09f5411780734b6be1b7bdaf",
  "version": 1,
  "memory_type": "entities"
}
-->