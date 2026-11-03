# 流程查看点击不发请求的根因与修复
同一流程能力被多主体页复用时，若页面未传自己的业务主键，审批流组件拿不到 id 就静默不发请求。

## 问题现象
- 机构端「住房租赁机构管理→开业信息报送」页面点「流程查看」无任何网络请求，审批流抽屉打不开
- 按钮还在、点击无反应、不报错；同类根因：权限配了 company:xxx:approval 仍不调 flowViewer（三道闸是 bizState/busCode/dataId）

## 根因
- 审批流组件（OperationBtnGroup 内置流程查看/ApprovalProcess/attachmentDraw.vue）需业务主键
- 租赁端复用机构端详情组件却没传自己的业务主键，组件静默不发请求

## 修复做法
- 发起审批流前确认 busCode、bizState、dataId 三样齐备，缺 dataId 即本症状
- 同一能力被多主体页（机构端/租赁端/管理端）复用时，每个页面都要传自己的业务主键
- 修复形态：流程查看携带该页 companyRecordId 请求审批流（fix(company): 开业信息报送流程查看携带 companyRecordId）
- 复用组件时对主键缺失做显式处理（禁用按钮或提示），不要静默无响应

## 验证与归属
- 来源会话 session-89c5aa9f-2377-4a54-9569-b4a6e8387e23（基线 89e5947）
- 子模块提交 e09210bd7 fix(company): 开业信息报送流程查看携带 companyRecordId 请求审批流
- 涉及 detail.vue、OperationBtnGroup/index.vue、attachmentDraw.vue、ApprovalProcess/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_missing_id",
  "source_extraction_id": "34b9df83b44044cdbe3cd35475c05a76",
  "version": 1,
  "memory_type": "entities"
}
-->