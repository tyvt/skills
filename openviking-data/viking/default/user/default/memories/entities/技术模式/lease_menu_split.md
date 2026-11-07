# 租赁合同录入与备案菜单拆分
苏州市房地产监测V3 按接口文档将租赁合同备案前置菜单拆分为“录入”与“备案”两个独立菜单的前端实现要点。

## 租赁合同录入（leaseContractEntry，无审批流）
- 列表 apiSuffix 改为 entryPage（全部有效数据）；保留产权核验新增、编辑、删除（仅待提交）
- 详情 :show-submit="false" :show-approval="false"；附件区与附件抽屉 busCode 均改为 zlhtlr，要件随 /save 的 attachmentList 挂载；已备案后仍可打印

## 租赁合同备案（leaseContract，有审批流）
- 列表接口走 /page（仅审核中/已备案）；新增入口改为「选择录入数据」弹窗（新组件 SelectEntryDialog.vue，调 /selectableEntryPage，仅待提交数据，支持备案编号/签订日期筛选）；移除编辑/删除按钮与多选列；移除无效「业务状态」筛选；选中后携带 leaseContractId 以 formMode=view 进详情
- 详情 :show-edit="false" :show-save="false"（不调 /save）；拆为两个附件区

## 验证与归属
- 前端共改6个文件：SelectEntryDialog.vue、leaseContractConstants.js、LeaseContractAddAppendix.vue、index.vue 等
- 所属项目：苏州市房地产监测V3；来源会话ID：67cf2f7e-1814-4fa2-bdbe-e15987a18993；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_menu_split",
  "source_extraction_id": "6b04a545eba749769f2ebbcc33cd448f",
  "version": 1,
  "memory_type": "entities"
}
-->