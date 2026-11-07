# 资金拨付通知书审批流绕过修复
苏住房G `benefit/pubAllotNotice` 详情页曾关闭标准审批流改用自定义提交直接备案，该问题在 `develop/v2.6.2` 合并时被还原，已重新恢复标准审批流修复。

## 问题原因
- `pubAllotNotice` 详情页关闭标准审批流组件改用自定义提交：`:showApproval="false"`、`:showSubmit="false"` 禁用标准按钮
- 自定义「提交」调用 `auditPubAllotNotice` → `/benefit/pubAllotNotice/allotNoticeSubmit/`，直接备案不走流程引擎
- 曾在 commit `58627ba64` 修复，但在 `develop/v2.6.2` 合并 v2.6.1 时被还原（`8cb6e61c1`）

## 修复方案
- 在 `pubAllotNotice/detail.vue` 移除 `:showApproval="false"` 和 `:showSubmit="false"`，恢复标准审批流按钮
- 增加 `:cancelSubmit="true"`、`:cancelApproval="true"`（与支出合同等模块一致）
- 删除自定义「提交」按钮及 `audit()` 方法，移除 `auditPubAllotNotice` 引用
- 提交后通过 `ZsSubmit` 调用 `/benefit/pubAllotNotice/submit`，并校验是否已配置审批流

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`pubAllotNotice/detail.vue`
- 所属项目：苏住房G（zhi2-web-admin）；来源会话：f617c3b3-c39f-4cb6-9983-bc3591e1a21a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "allot_audit_fix",
  "source_extraction_id": "4fe6b1917a3649f084f7bb0c722beae5",
  "version": 1,
  "memory_type": "entities"
}
-->