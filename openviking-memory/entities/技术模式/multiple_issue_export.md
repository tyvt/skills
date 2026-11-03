# 多议题表决决策范围导出为空：导出参数须与 list 同源
惠山二期G 项目中，autonomy 模块子议题/多议题表决明细导出 Excel 为空或参数不一致的根因与修复套路。

## 现象
- autonomy/option 子议题「业主决策明细」弹窗或 autonomy/multiply 详情「决策统计」表决明细导出 Excel 为空
- 导出 Form Data 与列表查询参数不一致

## 根因
- 子议题弹窗导出误用路由 getId()（主表 decisionManageId），而 listForManage 需子议题 decisionId（form.decisionId）
- 导出参数手写或抄错，漏掉 getQueryParams() 里的楼幢、单元、户室、表决方式/状态等筛选

## 修复方案
- 实现 getExportParams()：先 getQueryParams() 去掉 pageNum/pageSize，再按场景覆盖主键
- 弹窗用 decisionId，统计页签与列表一致用 decisionManageId，字段名须与列表请求一致
- Network 逐项对照 list 与 export；若列表带 decisionManageId 而 export 文档只认 decisionId，需联调映射后端字段名

## 验证与归属
- 已知记忆「MULTIPLE_ISSUES 跳转主键」不覆盖导出参数对齐
- 涉及文件：autonomy/option/components/DecisionRangeTable.vue、autonomy/multiply/components/DecisionRangeTable.vue、mixins/subTableMixins.js、mixins/table.js
- 所属项目：惠山二期G；来源会话：ff92c2c8-d9c4-4961-9a25-0851d8f75cd1；代码基线：a0d5892

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multiple_issue_export",
  "source_extraction_id": "d24a5ccb2658402b9453ac1bed06c24b",
  "version": 1,
  "memory_type": "entities"
}
-->