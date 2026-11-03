# 弹窗表格列宽比例化
苏住房G 申报缴费信息弹窗内表格写死像素列宽，弹窗加宽后不拉伸、右侧留白、金额输入框偏窄。

## 问题根因
- 列宽固定像素（如 140px），容器变宽时列宽不变，多空间堆右侧。
- 金额输入框用 el-input-group 带「元」后缀，宽度只跟自身列宽走，列不涨就永远窄。

## 解决方案
- 容器改 width:100%，列定义从固定像素换 minmax(160px, 1fr)（金额列保 160px 下限）均分剩余空间。
- 补 .el-input-group 宽度规则让带后缀控件占满整列。
- 顺序：先定容器（弹窗宽度走公共 zs-dialog 的 form-layout 档位），再定列比例，最后修控件宽度。

## 验证与归属
- 验证：会话 8525228c（基线 e590ffa）用户多次反馈不撑满；改 minmax + 容器 100% + 补样式。
- 涉及文件：property/feeDeclare2/index.vue、feeBindScopeTable.vue；所属项目：苏住房G。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_col_width",
  "source_extraction_id": "0636d5a52f5e4109813cca86a9966dbb",
  "version": 1,
  "memory_type": "entities"
}
-->