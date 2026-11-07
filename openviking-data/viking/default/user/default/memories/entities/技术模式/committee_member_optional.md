# 物管会业委会备案委员字段非必填
产品2.0 的 CandidateDialog 委员信息弹窗中头像上传与任职起止日期原为必填，后改为非必填以适配物管会/业委会备案与变更。

## 背景
- 委员信息弹窗由 `MemberInformationTable` 统一承载，物管会/业委会的备案与变更共用同一套组件
- 物管会备案与业委会直接备案（`sourceType=1`）用 `CandidateDialog.vue`；业委会备案与变更的编辑用 `MemberInformationDialog.vue`

## 具体改动
- 在 `zhi2-web-admin/src/views/autonomy/record/components/CandidateDialog.vue` 移除 `photo`（头像上传）的必填校验
- 同时移除 `appointmentStartDate`（任职起止日期）的必填校验，移除后不再显示红色星号也不在提交时校验

## 涉及文件与归属
- 涉及文件：`CandidateDialog.vue`、`MemberInformationDialog.vue`
- 所属项目：产品2.0；来源会话：14cca6c3-1374-4ef4-99d2-752064a64d18；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "committee_member_optional",
  "source_extraction_id": "8c0c2de3a1064d6585289c58f4ae70f4",
  "version": 1,
  "memory_type": "entities"
}
-->
