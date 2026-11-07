# 维修项目立项页组织验收单位Tab切换丢失
昆山G 维修项目立项页（estate/MaintenanceProject/initiation/detail.vue）因 Tab 切换重建表单从 sessionStorage 恢复时未重新请求业委会/物管会信息，导致「业委会」「物管会」选不中。

## 问题根因
- task762（组织验收单位新增「业委会」「物管会」）遗留问题：首次进入选小区后调 infoByPropertyProject 拉取业委会/物管会信息，可正常选择。
- 切换 Tab 再回来页面重建，表单从 sessionStorage 恢复，但未重新请求，homeownersassociaInfo 为空。
- 再选「业委会」或「物管会」时校验失败，提示「当前小区暂无有效的业委会/物管会信息」，表现为选不中。

## 修复内容
- 恢复 task762 功能：组织验收单位下拉重新加入「业委会」「物管会」。
- 修复 Tab 切换：在 init() 中，新增页从 sessionStorage 恢复且已有 propertyProjectId 时，重新调用 getHomeownersassociaInfo。
- 保留原有触发点：选择小区、加载详情时仍会拉取业委会/物管会信息。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山G
- 涉及文件：d:/repository/昆山G、d:/repository/昆山G/src/views/estate/MaintenanceProject/initiation/detail.vue
- 所属项目：昆山G；来源会话：42c65495-f5cf-48ac-8138-4f4fe0a5e388；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintenance_tabfix",
  "source_extraction_id": "90a7d045e4ab48fcb9e8138e704cd05e",
  "version": 1,
  "memory_type": "entities"
}
-->