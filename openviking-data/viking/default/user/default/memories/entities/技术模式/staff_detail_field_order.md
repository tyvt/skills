# 从业人员详情页字段顺序调整
苏州市房地产监测V3 中从业人员详情页（staffManagement/components/detail.vue）查看态「基本信息」区块已按图调整字段顺序，采用 3 列网格。

## 新字段顺序
- 行1：01 姓名 · 02 性别 · 03 联系电话
- 行2：04 证件类型 · 05 证件号码 · 06 人员角色
- 行3：07 职务 · 08 学历 ·（空位，8 字段占 9 格）
- 行4：09 备注（单独占行，原位）
- 人员编号已从网格中移除，页头 HeadTitle 已展示人员编号，无信息丢失

## 改动范围与归属
- 修改文件：zhi2-web-admin/src/views/company/staffManagement/components/detail.vue（contentInfo 查看态）
- 该文件同时服务备案详情与变更备案详情（isChange），两处顺序同步生效；编辑态表单未改动
- e2e 断言只校验字段可见性，不受影响
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：staffManagement/components/detail.vue、toB/personnelRecord/components/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c934e048-5cfb-4b50-92e2-9b843aa417f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "staff_detail_field_order",
  "source_extraction_id": "1b1aa05893f34d1eb5a371aa9023b5b0",
  "version": 1,
  "memory_type": "entities"
}
-->