# 物业费简易申报步骤条纵向布局
苏住房G 物业费简易申报编辑页因步骤条与提示框横向 flex 导致窄屏换行溢出，改为纵向布局并复用新增页样式类。
## 问题现象
- feeDeclare2/detail.vue 编辑态 .step-container 横向 flex 且 align-items:center，提示框被挤在步骤条右侧，窄屏下提示文字压成多行/溢出。
- el-alert__title 默认不换行，长提示直接截断。
## 解决方案
- .step-container 改 flex-direction: column，步骤条单独占一行、提示框另起一行。
- 步骤条包进 .step-list 占满整行宽度，并移除最后一步末尾多余箭头图标（与新增页一致）。
- 提示框用 .step-alert 并 margin-top:16px 与步骤条拉开距离。
- 给 .el-alert__title 补 white-space: normal 与 line-height:22px 使长文案换行。
- 只改编辑页页内块样式，不动公共 index.scss 步骤条规则（避免影响注册流程）。
## 验证与归属
- 验证：会话 95c50023 最终结论：.step-container 改 column、步骤条入 .step-list、移除步骤2末尾箭头、提示框 .step-alert+margin-top:16px、el-alert__title 加 white-space:normal 与 line-height:22px。
- 涉及文件：property/feeDeclare2/detail.vue、property/feeDeclare2/index.vue、styles/index.scss、maintenance/maintenanceProject/detail.vue；所属项目：苏住房G；代码基线：e590ffa；来源会话ID：95c50023-25aa-4e3d-9f36-efb4f3b27858。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare_step_layout",
  "source_extraction_id": "f784251e7b6a453dbf14488ca4fe0ff8",
  "version": 1,
  "memory_type": "entities"
}
-->