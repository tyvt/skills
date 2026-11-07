# 楼幢关联弹窗字段与样式调整
园区公共收益项目完成「楼幢关联」弹窗（BuildingDialogAuth.vue）调整，已按设计稿与产品确认。

## 搜索条件
- 调整为3个字段，顺序：楼幢号、地块名称、是否关联物业管理区域
- 已移除「楼幢坐落」搜索项

## 列表样式
- 左右列表标题改为「待选择列表」/「已选择列表」
- 两侧列表字段统一为4列：序号、楼幢号、房屋套数、地块名称
- 两侧列表宽度一致（flex:1），容器增加外边框（1px solid #e8e8e8）与内边距
- 中间操作按钮由4个缩减为2个：移入 >、< 移出（移除全部移入/全部移出）

## 其他修改
- 统一使用columns配置，删除rightColumns
- 房屋套数字段兼容totalHouse与houseNumber两种数据来源
- 查询参数同步移除position字段
- 房屋套数列由固定 width: '80px' 改为 minWidth: '90px'，避免表头「房屋套数」被截成「房屋.」（来源会话：4d5ba10a-398d-499d-aa18-07403294d1a3）

## 涉及文件与归属
- 涉及文件：d:\repository\园区公共收益\zhi2-web-admin\src\views\components\BuildingDialogAuth.vue、d:\repository\园区公共收益\zhi2-web-admin\src\views\property\complexBuildingAuth\detail.vue、d:\repository\园区公共收益\zhi2-web-admin\src\components\zs-sort-dialog\zs-sort-dialog.vue
- 所属项目：园区公共收益；来源会话：61675c7d-cc31-40dd-b7a9-a334676d6bb6；验证证据：extracted source=cursor project=园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "park_building_dialog",
  "source_extraction_id": "8bfd291190be428f900378f2cf4f9dbf",
  "version": 2,
  "memory_type": "entities"
}
-->