# zs-table-column 自定义插槽列宽度修复
[苏房] 自定义插槽列被排除出自动测宽，无宽度列吸走剩余空间成大片空白，需组件层修复。

## 问题背景
- 列表页某列用自定义插槽（如角色管理「状态」列放 el-switch），该列与相邻列出现大片空白，数据列被压窄。
- 原 zs-table-column 用 !this.$scopedSlots.default 判定自动宽度列，插槽列被排除且没有任何 width/min-width。
- 在 zs-table fit:false 下，无宽度列吸收剩余空间，其他列固定宽、操作列 fixed=right，中间列撑出空白。

## 解决方案
- isAutoWidthColumn 只按「未显式设 width/min-width」判定，不再因插槽跳过。
- 新增 hasCustomSlot + getCustomSlotContentWidth，非文本插槽（switch 等）按类型估固定宽（switch≈60px），文本类插槽仍按行数据测量。
- 暴露 slotWidth 属性供页面显式指定插槽列宽度，type:'custom' 走估算档；不合适时优先给 slotWidth。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 fb464655 role/index.vue 状态列（el-switch 插槽）大片空白；修复后约 100px。
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/views/system/role/index.vue。
- 所属项目：产品2.0；来源会话：fb464655-d812-43a9-9ccc-c27ba5ef2e85；代码基线：76646e6。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column",
  "source_extraction_id": "8ee6202f370b45028bf84c31e7c8eccb",
  "version": 1,
  "memory_type": "entities"
}
-->