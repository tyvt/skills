# Vue 需求文档生成器 (vue_docgen)
基于项目 园区公共收益 (zhi2-web-admin) 的 Vue 文件生成需求规格文档的工具/skill。

## 描述
- 遵循需求文档的 V1.2 格式。
- 分析 530 个 `index.vue`/`detail.vue` 文件，以提取查询条件、列表字段、表单字段和权限标识符 `xx:yy:zz`。
- 业务描述继承自旧版本；未覆盖的项标记为【待补充】。
- 范围覆盖代码中所有菜单模块，排除非页面的组件目录。

## 相关文件
- Skill WorkBuddy: tencent-local-office-edit/doc.md
- 脚本: .workbuddy/docgen/extract.py, parse_ref.py, digest.py, gen_md.py
- 临时文件: .workbuddy/tmp/args_outline.json, args_struct.json, docgen/args_test.json
- 验证证据: session=workbuddy 76daa5d8-aa79-4e5b-8bb5-6dd86ab1a1d3

<!-- MEMORY_FIELDS
{
  "category": "programa",
  "name": "vue_docgen",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "entities"
}
-->