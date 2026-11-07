# 回单核销凭证删附件后查看态可点击0
凭证并存 voucherFileUrl（展示/上传 v-model）与 voucherFileId（提交主键）。删附件时若 change 回调在列表为空 early return，只清 URL 而 voucherFileId 保留；保存后后端回写 voucherFileId:0，查看态用 url||id 兜底把 0 当路径渲染成可下载链接。

## 修复要点
- 删空时同时清空 URL 与 ID
- 无附件时提交 voucherFileId: null
- 详情加载后 normalize，把 0/空 ID 视为无附件
- 查看态只绑 voucherFileUrl，不用 fileId 兜底（与「仅有 fileId 需补 URL」场景区分，避免脏 0）

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubVerificationReceipts/detail.vue
- zhi2-web-admin/src/components/zs-file-upload/zs-file-upload.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益
- 来源会话：19c456b4-3996-489a-b606-804a1309acf5
- 代码基线：08d3255

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voucher_zero_bug",
  "source_extraction_id": "ae33c8b97175451f9aa74d76c19405ac",
  "version": 1,
  "memory_type": "entities"
}
-->