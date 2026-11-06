# 楼盘表视图勾选房屋数文案修复
修复 ScopeSelectDialog 在楼盘表视图勾选时 sumLabel 显示"已选房屋0户"的文案错误。

## 问题根因
- zs-table 的 @selection-change 更新 tableSelection 完整行对象
- BuildingTable 的 @checked 走 getCheckedData 只更新 selection 的 houseId 数组
- sumLabel 原先只用 tableSelection.length，楼盘表视图 tableSelection 为空

## 解决方案
- sumLabel 与 submitForm 对齐：楼盘表（Number(this.cardValue) === 0）时用 selection 的 id 去 fullHouseData 解析房屋对象统计户数与用途分布
- 列表视图仍用 tableSelection

## 涉及文件
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/BuildingTable.vue

## 验证与归属
- 来源会话：d72ba8af-0d4f-4b21-8c49-8ed7640dbfdb
- 所属项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_selection_label",
  "source_extraction_id": "b09225a3568c454faf9481dce0c632cd",
  "version": 1,
  "memory_type": "entities"
}
-->