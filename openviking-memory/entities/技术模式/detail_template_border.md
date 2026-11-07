# DetailTemplate无边框仅去外框留网格线
苏州市房地产监测V3 中 detail-template 的 no-border 修饰仅去外框，弹窗恢复默认 border 保留分隔线。

## 变更要点
- .detail-template--no-border 仅去除外框、圆角与底部间距，不再清除 .detail-row/.detail-item 网格线
- CareerList.vue 与 AgencyPersonnelCertificateTable.vue 弹窗恢复默认 border 以保留外框与内部分隔线

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/150.md（原 -rest/105.md）
- 涉及文件：components/detail-template/detail-template.vue、institution/agencyPersonnel/components/CareerList.vue、company/staffManagement/components/certificatesDialog.vue、evaluation/surveyRelease/statistics/components/TopicAnalysisTab.vue、components/README.md、institution/agencyPersonnel/components/AgencyPersonnelCertificateTable.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、docs/cursor-user-rule-components.md
- 所属项目：苏州市房地产监测V3；来源会话：8a22acb0-cef0-4f17-b365-fd7a8a3806d5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_border",
  "source_extraction_id": "dc35d04afcc14f6f9e69bc950ef0eadb",
  "version": 2,
  "memory_type": "entities"
}
-->