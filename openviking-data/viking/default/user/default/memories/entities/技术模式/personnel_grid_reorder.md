# 从业人员详情网格字段按规格重排
staffManagement/detail.vue 查看态 contentInfo 区块按规格重排为 3 列网格，人员编号移出网格由 HeadTitle 展示。

## 变更要点
- 查看态 contentInfo 区块重排为 3 列网格，01-08 字段占 9 格、09 备注独占一行
- 人员编号移出网格，改由 HeadTitle 展示
- 文件受 isChange 控制，同时服务备案与变更备案

## 不受影响范围
- 编辑态表单保持不变
- e2e 断言不受影响

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/303.md
- 涉及文件：staffManagement/components/detail.vue、toB/personnelRecord/components/detail.vue、PersonnelCertificatesList.vue、certificatesTable.vue、personnel-record.spec.js、agencyBasicInfoContent.js
- 所属项目：苏州市房地产监测V3；来源会话：c934e048-5cfb-4b50-92e2-9b843aa417f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_grid_reorder",
  "source_extraction_id": "44503dfe3d384a8da633982d1828183f",
  "version": 1,
  "memory_type": "entities"
}
-->