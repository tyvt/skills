# 定金退款新增提示与监管项目选择
苏州市房地产监测V3 的定金退款详情页改造已完成，包含进页提示与监管项目弹窗选择。

## 修改内容
- 删除 `initDict` 里的 `$message.warning`，仅在新增且通知书有效日期为空时按字典 `REFUND_NOTICE_VALIDITY` 写默认日期，未配置则静默
- 监管项目字段改为可点击：`readonly` + 搜索图标，绑定 `@focus="openRegProjectWithAgreementSelect"`
- 须先选项目名称才可点（`!form.projectName || formMode != 'add'` 时禁用）
- 接口复用 `/prefund/regProject/regProjectWithAgreement` 按 `projectId` 过滤
- 新增 `setRegulatorProject`，`setPaymentNotice` 复用该方法回填监管项目三字段

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/supervision/deposit/refund/detail.vue`
- 来源会话ID：338d857d-c247-465e-90b4-4a4ce268d455
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_refund_detail_fix",
  "source_extraction_id": "e69a9aaf65ce4fd18a27899f934dccdf",
  "version": 1,
  "memory_type": "entities"
}
-->