# zs-table-column 列宽自适应模式
表格列宽应交给组件弹性计算，避免手动写死固定 width 绕过自适应逻辑。

## 问题背景
- 房屋质量保证金-资金缴存选择账户字段名称数据没有自适应，根因是手动写了固定 width 绕过组件自动计算
- zs-table-column 写 width 走固定宽度不自适应；不写则走弹性列逻辑，按表头文字与单元格内容自动算 min-width 并均分剩余宽度

## 解决方案
- 去掉手动 width，仅保留 label 和 prop，与项目其他选择弹窗（如 depositNotice/company/components/AddDialog.vue）写法一致
- 刷新后表格铺满弹窗，列宽随内容自动调整

## 涉及文件
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/depositRegister/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue
- 参考写法：depositNotice/company/components/AddDialog.vue

## 参考信息
- 所属项目：榆林G
- 来源会话：ca119077-96d7-4634-b180-497cbdf98617

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_width",
  "source_extraction_id": "fffe5bdfa8af4c40a27e1c3777054623",
  "version": 1,
  "memory_type": "entities"
}
-->