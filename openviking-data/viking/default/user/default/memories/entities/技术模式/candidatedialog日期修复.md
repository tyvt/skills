# 已备案物管会委员信息任职起止日期修复
园区公共收益项目已备案物管会详情页（`sourceType == '1'`）查看委员信息时，任职起止日期仅显示开始日期的问题修复。

## 问题原因
- 查看委员信息走 `CandidateDialog` 弹窗（非 `MemberInformationDialog`）
- 查看模式只绑定开始日期 `appointmentStartDate`，未拼接结束日期 `appointmentEndDate`，仅显示如 `2026-07-09`

## 修复方案
- 在 `CandidateDialog.vue` 查看模式显示值改为与编辑模式一致：`${this.form.appointmentStartDate || ''} - ${this.form.appointmentEndDate || ''}`
- 修复后显示完整区间，例如 `2026-07-09 - 2029-07-09`

## 涉及文件
- zhi2-web-admin/src/views/autonomy/record/components/CandidateDialog.vue
- 对比：MemberInformationDialog.vue、directDetail.vue

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：58932c77-9976-4438-bd4c-10b468124d4c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "CandidateDialog日期修复",
  "source_extraction_id": "a1302e410ccd4dc58b49c441bfc57abd",
  "version": 1,
  "memory_type": "entities"
}
-->