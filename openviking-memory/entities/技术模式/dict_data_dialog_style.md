# 字典数据弹窗样式错乱修复
苏州市房地产监测V3 中「字典数据」弹窗（`system/dict/components/DictDataDialog.vue`）搜索条与按钮未对齐，已修复样式。

## 问题根因
- `zs-search-form` 单行模式用 `justify="space-between"`，左侧 `form-content-col` 为 `flex:1`，把「搜索/重置」顶到整行最右，与「字典标签/状态」间留白过大
- Headline 旧修复写 `align-items: flex-start`，与组件自带 `align="middle"`、`.button-col { align-items: flex-start }` 冲突，按钮与 38px 高输入框不在同一水平线
- 详情页 Headline 的 `el-row` 栅格作用到 `single-line-row`（非 `zs-search-form__field-row`），干扰列宽间距；下拉箭头在表单项拉宽时显得像多余控件

## 修改内容
- `index.scss`：Headline 内 `.search-form-container > .el-row` 改为 `justify-content: flex-start`、对齐方式修正
- `detail-form.scss` 同步调整按钮列对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`index.scss`、`detail-form.scss`、`DictDataDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：f3c35b72-3629-4796-b668-c4d4ead84829；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_data_dialog_style",
  "source_extraction_id": "b4d7c66a115e439a926be64696a6d02d",
  "version": 1,
  "memory_type": "entities"
}
-->