# 企业端人员详情审批流接入
产品2.0 企业端 `staffManagement/detail.vue` 已对齐 toB 版实现审批流。

## 审批流接入
- 绑定审批业务码：备案 `cyryba`（`PERSONNEL_AUDIT_BUS_CODE`）、变更 `cyrybg`（`PERSONNEL_CHANGE_BUS_CODE`）
- 通过 `:bus-code="auditBusCode"` 传给 `operation-btn-group`，支持附件、流程查看

## 按钮逻辑
- `add` / `edit`：保存并提交
- `view` + 待确认（`businessStatus=1`）：保存并提交、删除、审核流程查看
- `view` + 正常（`businessStatus=2`）：变更、注销
- `view` + 已注销（`businessStatus=3`）：删除

## 新增能力
- 顶部 `HeadTitle` 展示人员编号、业务状态
- 「审核流程查看」抽屉（`ApprovalProcess`）
- 变更单（`isChange`）的详情加载与提交

## 涉及文件与来源
- 文件：`detail.vue`、`OperationBtnGroup/index.vue`、`detailMixins.js`（路径 `zhi2-web-admin/src/views/company/staffManagement/` 等）
- 来源会话：2f709dc5-4ae2-4b08-9df3-6698a076d982；项目：产品2.0

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "staff_detail_approval_flow",
  "source_extraction_id": "5ef37f2bef0b4636adaf69344fa6f3fd",
  "version": 1,
  "memory_type": "entities"
}
-->
