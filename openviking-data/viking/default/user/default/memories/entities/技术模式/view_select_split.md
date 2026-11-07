# 双视图选房弹窗统计提交须按视图分流
ScopeSelectDialog 同时支持列表与楼盘表两种选房视图，数据形态不同，展示统计与提交取数必须同一套分流逻辑。

## 问题背景
- 弹窗支持 zs-table 列表视图与 BuildingTable 楼盘表视图，靠 cardValue 切换
- 列表视图通过 @selection-change 更新 tableSelection（完整行对象数组）
- 楼盘表视图通过 @checked → getCheckedData 只更新 selection（houseId 字符串数组）
- sumLabel 原只统计 tableSelection.length，楼盘表勾选时恒为 0，但确定按钮用 selection.length || tableSelection.length 能点

## 解决方案
- 展示统计与提交取数必须同一套分流函数：cardValue（注意 tabs 同步可能转字符串，用 Number() === 0 判等）为楼盘表时，将 selection 内 id 去 fullHouseData find 回解析成房屋对象再统计
- 列表视图仍用 tableSelection，含用途分布按 dictValue 匹配 dictLabel
- 凡弹窗内并存多种选择来源，统计、禁用态、提交三处都要走同一分流函数

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 d72ba8af 根因说明列表走 @selection-change 更新 tableSelection，楼盘表走 @checked 只更新 selection，sumLabel 只读 tableSelection 恒 0，确定按钮用 selection.length || tableSelection.length 能点
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue、BuildingTable.vue
- 所属项目：产品2.0；来源会话ID：d72ba8af-0d4f-4b21-8c49-8ed7640dbfdb；代码基线：6d7b8af

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "view_select_split",
  "source_extraction_id": "1dfa118ed8184c1497a5c2ba66117fa9",
  "version": 1,
  "memory_type": "entities"
}
-->