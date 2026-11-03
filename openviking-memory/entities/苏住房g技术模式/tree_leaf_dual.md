# 树表叶子/分支状态字段与树结构双轨判定
月报模板维护等树表行上类型字段与 children 结构不一致，导致显示分支但校验按叶子，须以 children 为唯一真值。

## 问题根因
- utils/monthlyReport.js 的 isLeafNode(node) 只看节点自己 leafFlag，而非 children.length
- addBranch()/removeBranch() 改写父节点 leafFlag，结构一变状态字段落后一次
- 同一结构存两份（children 树和 leafFlag 标量），写漏路径（addSibling、createTemplateNode）致永久不一致

## 解决方案
- 判定一律以 children 为准（isLeafNode 只读 children，[] 或不存在算叶子），leafFlag 退化为保存前派生写出冗余字段
- 变更树结构时父变分支清空叶子专属字段并置 leafFlag='0'，删光子节点按默认回填并置 '1'
- 保证 normalizeTemplateOrder 之类递归归一在保存/提交路径被调用，统一出口同步 leafFlag 并清分支字段

## 验证与归属
- 验证证据：审查 monthlyReport.js 改 isLeafNode 只读 children；新增 clearBranchNodeFields；ensureLeafFields 设 leafFlag；normalizeTemplateOrder 同步；结论 MEDIUM 指仓库内未见调用点
- 涉及文件：zhi2-web-admin/src/utils/monthlyReport.js、zhi2-web-admin/src/views/publicQuery/monthlyReportTemplate/components/TemplateTreeTable.vue
- 所属项目：苏住房G；来源会话ID：65ff5e0a-abf7-48c3-8b4c-301501c73c48；代码基线：4f7c2c3

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "tree_leaf_dual",
  "source_extraction_id": "fc9114db6f08406fa42b32567924ccee",
  "version": 1,
  "memory_type": "entities"
}
-->