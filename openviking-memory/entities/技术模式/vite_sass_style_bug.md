# SFC 漏写 </style> 导致 Vite sass 报错
在 Vue SFC 中多个 style 块时，前一个漏写 </style> 会导致 Vite 报 [sass] expected selector，实为标签闭合错乱。

## 问题根因
- 在已有 <style lang="scss" scoped> 后追加非 scoped <style lang="scss">，若前块末尾（常见 :deep 之后）漏 </style>
- SFC 编译器把两块当同一段 SCSS 解析，后块 <style> 标签被喂进 Sass 报 expected selector
- 错误信息指向 Sass 而无从提示缺失闭合标签，易误判为语法错

## 解决方案
- 定位报错文件所有 <style> 开闭数量，确认每个块都有 </style>（尤其以 :deep 结尾的 scoped 块）
- 补齐后保存，仍报错则重启 npm run dev（HMR 可能缓存坏状态）
- 属「Vue 标签闭合错乱伪装成工具链错误」家族，优先做标签配对检查而非改语法

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/views/dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue
- 所属项目：产品2.0
- 来源会话ID：91caa295-2c37-448d-8386-139abc7c3402
- 代码基线：64fa9e2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_sass_style_bug",
  "source_extraction_id": "2c4fb9e23b1f49d3949a5b972ee566fe",
  "version": 1,
  "memory_type": "entities"
}
-->