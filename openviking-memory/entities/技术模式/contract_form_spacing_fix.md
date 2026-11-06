# 合同表单间距修复
苏州市房地产监测V3 的合同表单间距已修复，统一了标签与行列间距样式。

## 修复结果
- 新增 `contract-form.scss`：统一标签在上、行距 24px、列距 32px
- 预售/现售 `chapter1.vue` 已用 `el-row` 规范布局并接入样式
- 构建已通过，样式可正常编译

## 验证与归属
- 刷新预售合同签订页，在「第一章 合同当事人」查看间距效果
- 涉及文件：`contract-form.scss`、`chapter1.vue`
- 所属项目：苏州市房地产监测V3
- 来源会话：ddd87ea1-3142-4bc4-8883-ca705a2c8ff5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_form_spacing_fix",
  "source_extraction_id": "f096da90f9b54af4ad0fcc8abdafe82d",
  "version": 1,
  "memory_type": "entities"
}
-->