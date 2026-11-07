# 月报模板树表新增下级父级填报列仍显示
苏住房G 公共查询-物业管理区域月报模板配置（TemplateTreeTable）新增下级后父级填报列仍显示且仍拦截保存的缺陷与修复。

## 问题根因
- 判断叶子节点的 isLeafNode 原先优先读后端字段 leafFlag === '1'，只要该行历史上被标成叶子，push 子节点后它依然是「叶子」，五列（单位/单位属性/本月数据/本年累计/历史累计）继续展示并参与 validateTemplateTree 必填校验
- leafFlag 是结果字段，不是判定依据

## 修复方案
- monthlyReport.js：① isLeafNode 只按 children.length 判断，彻底不读 leafFlag；② 新增 clearBranchNodeFields 清空分支节点的单位/填报字段并显式置 leafFlag='0'；③ 新增 ensureLeafFields 叶子节点置 leafFlag='1' 并补默认值；④ normalizeTemplateOrder 保存前统一同步 leafFlag（分支清字段、叶子补默认），与 index.vue 的 handleSave 调用一致
- TemplateTreeTable 的 addChild 在 push 子节点之前调用 clearBranchNodeFields(row.node)，之后才递归重算展示与校验

## 验收与边界
- 删光子级后 ensureLeafFields 只恢复默认空值，不会还原加下级前的填写内容——产品确认过的预期行为，不要做快照回滚
- 验证：会话 78a75b10-f6bb-48e1-ade4-51abaa4d72e3（2026-09-18，基线 4f7c2c3，苏住房G/063.md）用户报「编辑已有的新增下级时单位等五列仍显示，期望存在下级时上一级自动清空且无需校验必填」；本地脚本验证带 leafFlag:'1' 的父节点 push 子节点后 isLeafNode 为 false，validateTemplateTree 不再报父级单位名称不能为空，删光子节点后能恢复默认值与 leafFlag:'1'
- 涉及文件：zhi2-web-admin/src/utils/monthlyReport.js、zhi2-web-admin/src/views/publicQuery/monthlyReportTemplate/components/TemplateTreeTable.vue、zhi2-web-admin/src/views/publicQuery/monthlyReportTemplate/index.vue
- 所属项目：苏住房G

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：78a75b10-f6bb-48e1-ade4-51abaa4d72e3


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "template_tree_isleaf_bug",
  "source_extraction_id": "bef229ef9efa47e0b71ee6b556779111",
  "version": 2,
  "memory_type": "entities"
}
-->
