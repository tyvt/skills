# 园区物管2.0 核销明细 relBusinessId 编辑保留
园区物管2.0 编辑核销明细时，relBusinessId 会在整条链路上保留并随更新接口提交，避免后端 400 校验失败。

## 问题根因
- 列表行可能有 relBusinessId，但打开编辑弹窗重新请求详情后，若详情接口未返回该字段，提交时缺失导致参数校验失败（400）。

## 修复方案
- VerificationReceiptDetailTable.vue 重写 handleUpdate，打开编辑弹窗时把行数据的 relBusinessId 一并传给弹窗。
- VerificationReceiptDetailDialog.vue 打开时用列表行 relBusinessId 预填表单；详情加载后若接口未返回则回退列表行数据。
- buildSubmitPayload 显式带上 relBusinessId，优先级：当前表单 → 原始表单 → 列表行数据。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：编辑保存后 PUT /v2.0/benefit/pubReceiptVerificationDetail 请求体包含 relBusinessId。
- 涉及文件：benefit/pubVerificationReceipts/components/VerificationReceiptDetailDialog.vue、VerificationReceiptDetailTable.vue。
- 所属项目：园区物管2.0；来源会话：1ee4f9a4-13b3-4034-ad86-3721cc8340be；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verification_detail_relbusinessid",
  "source_extraction_id": "1ded6c3f5a284e6eaec4d40de8a84dd5",
  "version": 1,
  "memory_type": "entities"
}
-->