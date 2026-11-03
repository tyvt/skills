# 月报模板填报校验动态化
原月报模板填报校验未动态判断、不可编辑列未置空且填写说明误合并父级。

## 问题现象
- 月报模板填报校验未动态判断，固定逻辑不适配行列差异
- 不可编辑列未置空，填写说明误合并父级

## 解决方案
- monthlyReport.js 改为按 xxxEditable/xxxRequired 动态校验
- buildSaveValues 对不可编辑列强制输出 null，说明逐行展示解析值
- TemplateTreeTable.vue 新增五列仅叶子行展示，index.vue 接入上述改造

## 验证与归属
- 验证证据：苏住房G/073.md
- 涉及文件：utils/monthlyReport.js、publicQuery/monthlyReportTemplate/components/TemplateTreeTable.vue、publicQuery/monthlyReport/components/ReportItemsTable.vue、publicQuery/monthlyReport/index.vue、monthlyReportStat/detail.vue、monthlyReport/detail.vue
- 所属项目：苏住房G；来源会话ID：98a6eb7e-953e-490a-ae39-942396e69cb2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_validation",
  "source_extraction_id": "62aa50b1d31141a59681e1090dfd286d",
  "version": 1,
  "memory_type": "entities"
}
-->