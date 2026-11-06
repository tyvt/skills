# 物业管理信息月报表模板配置前端改造（苏住房G）
苏住房G 项目完成物业管理信息月报表模板配置页的前端改造，调整填报校验与列展示逻辑。

## 变更内容
- 公共工具层 `monthlyReport.js` 新增 `getUnitAttrInputProps`、`formatStatMonthCell`、`ensureLeafFields`、`validateTemplateTree` 四个函数
- 填报校验改为按 `xxxEditable/xxxRequired` 动态判断，`unitAttr` 控制精度
- `buildSaveValues` 对不可编辑列强制输出 `null`
- 填写说明改为每行直接展示后端解析值，不再做父级合并
- `createTemplateNode` 默认带五字段初始值

## 涉及页面与组件
- `TemplateTreeTable.vue` 新增单位名称、单位属性、本月/本年/历史累计五列，仅叶子行展示
- `monthlyReportTemplate/index.vue` 模板配置页相应调整
- `monthlyReport/components/ReportItemsTable.vue` 同步改动

## 验证与归属
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话：98a6eb7e-953e-490a-ae39-942396e69cb2
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_template_config",
  "source_extraction_id": "7de707754b5c430297ab66535487c776",
  "version": 1,
  "memory_type": "entities"
}
-->