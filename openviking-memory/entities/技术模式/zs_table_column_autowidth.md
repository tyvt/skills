# zs-table-column 自动宽度逻辑修复
产品2.0 的 zhi2-web-admin 中 zs-table-column 修复自定义插槽列被排除在自动宽度计算之外的问题。

## 问题根因
- 原 `zs-table-column` 通过 `!this.$scopedSlots.default` 判断是否为自动宽度列
- 角色管理页「状态」列使用自定义插槽（`el-switch`），被排除在自动宽度计算外，未设 width/min-width
- `zs-table` 设置 `fit: false` 时，未设宽度的列吸收剩余空间，导致「状态」列撑出空白、左侧数据列被压窄

## 修复方案
- `isAutoWidthColumn`：仅当列未显式设置 width/min-width 时启用自动宽度，不再因自定义插槽跳过
- `hasCustomSlot` + `getCustomSlotContentWidth`：对插槽列按类型估算宽度（如 type:'custom' 按 switch 约 60px），支持 slotWidth 属性
- `shouldMeasureRowData`：文本类插槽（text/link/dict 等）按行数据测量；switch 等非文本插槽用固定宽度估算

## 验证与归属
- 涉及文件：zs-table-column.vue、system/role/index.vue、mixins/table.js
- 所属项目：产品2.0；来源会话：fb464655-d812-43a9-9ccc-c27ba5ef2e85；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_autowidth",
  "source_extraction_id": "6bef3604790f499d8c2e13c541cc8a34",
  "version": 1,
  "memory_type": "entities"
}
-->