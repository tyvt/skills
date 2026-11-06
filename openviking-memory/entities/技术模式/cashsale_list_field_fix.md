# 修复预售转现售列表字段显示
苏州市房地产监测V3 中修复了预售转现售列表的列标题文案与预售许可证编号字段映射。

## 修改内容
- 筛选区与表格列标题均由「预售现售申请编号」改为「预售转现售申请编号」（共 2 处）
- `cashsaleListMixin.js` 中「预售许可证编号」列 `prop` 由 `permitNo` 改为 `sourcePermitNo`
- `formatter` 增加回退：`row.sourcePermitNo || row.permitNo || '-'`
- 筛选条件仍使用 `permitNo` 作为查询参数，若无效需确认后端分页接口是否要求 `sourcePermitNo`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/presale/cashsale/cashsaleListMixin.js`
- 来源会话ID：2d5fa078-1499-48cb-8fca-5cc13ccc4a4d
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_list_field_fix",
  "source_extraction_id": "e69a9aaf65ce4fd18a27899f934dccdf",
  "version": 1,
  "memory_type": "entities"
}
-->