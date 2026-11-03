# 从业人员查看态网格去编号重排8字段
苏州市房地产监测V3 中 staffManagement/detail.vue 查看态 contentInfo 区块按 3 列网格重排 8 个字段并移除人员编号。

## 实现要点
- `zhi2-web-admin/src/views/company/staffManagement/components/detail.vue` 查看态 `contentInfo` 区块按 3 列网格重排 8 个字段（01–08 占 9 格、09 备注单独占行）
- 移除人员编号展示，因已由 HeadTitle 展示
- 该文件同时服务 `isChange` 备案详情，编辑态表单与 e2e 可见性断言不受影响

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/103.md
- 涉及文件：zhi2-web-admin/src/views/toB/personnelRecord/components/detail.vue、company/staffManagement/components/detail.vue、toB/personnelRecord/components/PersonnelCertificatesList.vue、company/staffManagement/components/certificatesTable.vue、e2e/company/personnel-record.spec.js、company/companyManagement/components/agencyBasicInfoContent.js
- 所属项目：苏州市房地产监测V3；来源会话：c934e048-5cfb-4b50-92e2-9b843aa417f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_detail_grid_reorder",
  "source_extraction_id": "3a29ac9907f94022a22fb0ef67802f2f",
  "version": 1,
  "memory_type": "entities"
}
-->