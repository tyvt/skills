# 表单弹窗用 form-layout 收敛为单双列两档宽度
苏州市房地产监测V3 的 zhi2-web-admin 将 412 个表单类弹窗收敛，389 个复用 form-layout（117 双列 + 272 单列），36 个左树豁免。

## 收敛概况
- 412 个表单类弹窗参与收敛
- 389 个复用 form-layout（117 双列 + 272 单列）
- 36 个左树结构弹窗豁免

## 双列实现
- 多字段弹窗列声明 span24 致仅改宽度无效
- 批 2 将 :sm/:md/:lg/:xl 从 24 改写为 12 实现双列

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/006.md
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue、src/styles/detail-form.scss、eslint-rules/lib/rules/prefer-zs-components.cjs、eslint-rules/lib/rules/zs-dialog-form-layout.cjs、eslint-rules/index.js、.eslintrc.cjs
- 来源会话ID：5e0a7497-a6b0-4210-a09a-c115fce18836；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_dialog_columns",
  "source_extraction_id": "462201af45e742729b026ea5c07ddb26",
  "version": 1,
  "memory_type": "entities"
}
-->