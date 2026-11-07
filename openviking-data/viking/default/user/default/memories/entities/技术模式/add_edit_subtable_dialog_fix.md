# 新增/编辑界面子表及弹窗样式修复
产品2.0 项目修复新增/编辑界面中子表及弹窗相关问题，涉及多个子表组件与租赁合同备案详情页。

## 修改文件
- subOtherTable.vue（其他资源）、subVenueTable.vue（公共场地）
- subAdvertiseTable.vue（广告位）、houseTable.vue（资产列表）
- resourcesLeaseContractFiling/detail.vue

## 主要改动
- 移除上述子表组件 border 属性，避免表格出现竖向分隔线
- 对齐 subVenueDialog 写法修复 subOtherDialog、subAdvertiseDialog：查看模式 mini 尺寸（616px），编辑模式 medium
- 详情字段统一 fullRowLayout 消除中间空白列，编辑表单增加 el-row 包裹
- 根因：子表放在禁用 zs-form 内，查看模式 fieldset disabled 导致弹窗按钮失效
- 将子表移出 zs-form，弹窗改用 el-button，查看模式按钮文案改为「关闭」

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：92e30909-1160-4e65-bfae-414e923ee760；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_edit_subtable_dialog_fix",
  "source_extraction_id": "3a07d26a6e0e40bea701d7282e393f25",
  "version": 1,
  "memory_type": "entities"
}
-->