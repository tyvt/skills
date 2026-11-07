# zs-operate-column 表头白底误命中修复
淮安物管 zs-operate-column 组件非 scoped 白底规则误命中表头 th 导致表头背景缺失的修复约定。

## 现象
- 列表「操作」列表头背景发白或与 #fafafa 表头不一致，固定右列叠层时像表头背景缺失。

## 根因
- 组件内非 scoped 规则 `.el-table .zs-operate-column-cell { background:#fff !important }` 同时命中 `label-class-name`/`class-name` 上的 th 与 td。
- `!important` 压过 ZsTable `header-cell-style` 的 #fafafa。

## 做法
- 白底只限定表体：`.el-table__body-wrapper .zs-operate-column-cell` 与 `.el-table__fixed-body-wrapper .zs-operate-column-cell`。
- 表头跟随 ZsTable 表头样式。
- 未用 ZsTable 的页面需自行设 `header-cell-style` 或全局表头色。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：会话 90849550 dataStatistics 等页操作列表头背景异常，收窄选择器后表头恢复 #fafafa。
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：淮安物管；来源会话：90849550-cbec-4e10-ad4a-35a4b2cf03ba；代码基线：0e429b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_column_header",
  "source_extraction_id": "c5852556bbb845f685ba8e45ddb255f3",
  "version": 1,
  "memory_type": "entities"
}
-->