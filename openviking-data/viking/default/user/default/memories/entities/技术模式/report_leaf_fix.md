# 月报模板新增下级父级字段清空修复
苏住房G项目月报模板在已有叶子项「新增下级」后父节点仍被当成叶子，已修复。

## 问题原因
- isLeafNode 原先优先看 leafFlag === '1'，导致新增下级后父节点仍展示五列并参与校验

## 修复内容
- monthlyReport.js 中 isLeafNode 仅根据是否存在子节点（children.length）判断
- 新增 clearBranchNodeFields：清空单位/填报字段，并设 leafFlag = '0'
- ensureLeafFields：叶子节点设 leafFlag = '1' 并补默认值
- normalizeTemplateOrder：保存前同步 leafFlag，分支节点清字段，叶子节点 ensureLeafFields（与 index.vue 的 handleSave 调用一致）

## 涉及文件与归属
- 文件：zhi2-web-admin/src/utils/monthlyReport.js、src/views/publicQuery/monthlyReportTemplate/index.vue、components/TemplateTreeTable.vue
- 所属项目：苏住房G；来源会话：78a75b10-f6bb-48e1-ade4-51abaa4d72e3；验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report_leaf_fix",
  "source_extraction_id": "02759d82d8a9496b98e4adfceff55de0",
  "version": 1,
  "memory_type": "entities"
}
-->