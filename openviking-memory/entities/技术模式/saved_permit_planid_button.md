# 保存的申请因缺少 planId 导致查看按钮变灰

在 Suzhou Real Estate Monitoring V3 项目中，已保存的许可申请的“查看”按钮处于禁用状态，因为详情并不总是返回 `planId`。

## 问题根因
- 保存的申请详情接口可能不返回 `planId`
- “查看”按钮仅依赖本地的 `planId`，导致灰色状态

## 解决方案
- `PermitPlanPanel.vue` 接受 `planId` 或 `presalePermitId` 来启用按钮
- `permitConstants.js` 新增 `extractPlanId()` 以统一解析该字段
- `detail.vue` 和 `plan/detail.vue` 集成了该函数并具备加载回退

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/198.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: PermitPlanPanel.vue, detail.vue, plan/detail.vue, detailMixins.js, form.js, ruoyi.js, permitConstants.js, e2e/fixtures/presale-permit-helpers.js
- 会话: 954f078a-f048-4ccb-a30d-b2fce225de05; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "saved_permit_planid_button",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 2,
  "memory_type": "entities"
}
-->