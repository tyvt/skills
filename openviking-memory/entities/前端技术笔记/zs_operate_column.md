# zs-operate-column 按 label 测宽仍截断补偿
园区物管2.0 中 zs-operate-column 按按钮文案自适应宽度时仍截断，需 Math.max 只增不减并计入单元格 padding。

## 问题根因
- 列表操作列勿写死 :width，交给组件按按钮文案自适应，但各行按钮数量/文案长短不一导致宽度被较小行回写压小
- 未计入 el-table 单元格左右 padding，实际显示空间小于测算宽度

## 解决方案
- 组件内使用 buttonWidth = Math.max(buttonWidth, currentWidth) 实现只增不减
- 增加 cellPaddingWidth（如 24）计入单元格左右留白
- 适当提高列最小宽度（如 96）与单按钮估算下限（如 42→56）

## 验证与归属
- 验证：会话 23253f6c 改为按 label 计算宽度后用户反馈仍显示不下，第二版结论给出 Math.max、cellPaddingWidth=24、min 96
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：园区物管2.0；来源会话：23253f6c-e368-40d0-9e15-aeb08f21a4b6；代码基线：7814a0c2a

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_operate_column",
  "source_extraction_id": "6d1260c5d95f40dea1323fb5b5278536",
  "version": 1,
  "memory_type": "entities"
}
-->