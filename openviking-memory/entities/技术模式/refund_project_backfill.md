# 监管项目字段随缴款通知书回填并通栏
苏州市房地产监测V3中detail.vue监管项目字段在特定条件下插入，并随缴款通知书回填，退款说明整行通栏。

## 关键逻辑
- detail.vue中监管项目仅refundType == 'deposit'时插入
- setPaymentNotice从选中行回填regulatorProjectName/Id/Code
- setProject换项目清空关联字段
- 新增 `setRegulatorProject` 供 `setPaymentNotice` 复用回填监管项目
- 监管项目字段改为 `readonly` 并加搜索图标触发弹窗，接口 `/prefund/regProject/regProjectWithAgreement` 过滤
- `initDict` 中删除 `$message.warning`，仅新增且 `REFUND_NOTICE_VALIDITY` 为空时静默

## 展示适配
- 查看态contentInfo使用DETAIL_COL_FULL实现退款说明整行通栏
- 编辑态使用FORM_COL_FULL实现退款说明整行通栏

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/116.md；src=苏州市房地产监测V3/160.md；src=苏州市房地产监测V3/189.md
- 涉及文件：supervision/deposit/refund/detail.vue、supervision/deposit/notice/detail.vue、supervision/deposit/refund/components/PaymentNoticeDialog.vue、supervision/deposit/refund/index.vue、components/detail-template/detail-template.vue、styles/detail-form.scss、styles/index.scss、components/zs-textarea/zs-textarea.vue、utils/noticeValidity.js、supervision/utils/selectDialog/project.js、mixins/detailMixins.js、supervision/deposit/other_record/detail.vue、supervision/utils/selectDialog/paymentNotice.js
- 所属项目：苏州市房地产监测V3；来源会话：79b2f3ac-4eb2-4ae2-8e42-9d7ca8c66c0f、338d857d-c247-465e-90b4-4a4ce268d455；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_project_backfill",
  "source_extraction_id": "02e4d9002af14be89befaeb05937e6f7",
  "version": 3,
  "memory_type": "entities"
}
-->