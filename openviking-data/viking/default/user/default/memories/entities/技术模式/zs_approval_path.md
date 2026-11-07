# zs-approval 审批请求体必须带 path
[苏房] 使用 zs-approval / ApprovalProcessDialog 提交审批时请求体必须带 path，且 path 要声明为 prop。

## 问题背景
- 使用 zs-approval 提交审批时后端接口报错或行为异常，请求体缺少 path 字段。
- 审批接口契约必须带 path（后端定位流程/来源页面），项目按路由 fullPath 传。
- 原代码仅「421 重新提交」分支写了 this.path || this.$route.fullPath，主审批 submitForm 漏了 path，且组件未把 path 声明为 prop。

## 解决方案
- 给 zs-approval 和 ApprovalProcessDialog 增加可选 path prop。
- 审批请求体统一写 path: this.path || this.$route.fullPath（含 query 完整路由路径），与重新提交分支同取值链。
- 约定：审批请求体 = path + 通用 approveMessage + 业务 approvalMessage，新增/改造审批接入点逐项核对。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 5a5032e9 用户报告 ApprovalProcessDialog 审批接口没传 path；修复为新增 path prop + 请求体补 path。
- 涉及文件：zhi2-web-admin/src/components/zs-approval/ApprovalProcessDialog.vue、zs-approval/index.vue。
- 所属项目：产品2.0；来源会话：5a5032e9-1eb3-4c40-9529-326bcd83ba44；代码基线：94b86fa–62d5fb9。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_approval_path",
  "source_extraction_id": "8ee6202f370b45028bf84c31e7c8eccb",
  "version": 1,
  "memory_type": "entities"
}
-->