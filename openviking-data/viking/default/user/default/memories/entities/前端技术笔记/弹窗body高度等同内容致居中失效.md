# 弹窗body高度等同内容致居中失效

根因为弹窗 `body` 高度与内容一致使 `align-items: center` 无效，内容贴顶。关键修复为 `body` 设 `min-height: 148px`、收紧顶部 `header`、移除 `success-content` 上下 `padding` 以统一控制垂直居中。

**验证证据**：extracted source=cursor session=b185be66-bd45-4dfc-803b-68a0ab11cd87

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/detail.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/components/SelectJudgesDialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/components/PrintDialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/credit/extract/components/PrintDialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailDialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue

**所属项目**：园区物管2.0
**来源会话**：b185be66-bd45-4dfc-803b-68a0ab11cd87
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "category": "",
  "name": "dialog_body_center",
  "source_extraction_id": "1bff9247b411402ebbcf245405c1569f",
  "version": 1,
  "memory_type": "entities"
}
-->