# 取消候选人对话框中照片和日期的必填要求
在登记场景中移除照片和任命日期的 required 验证的规范。

## 描述
- 在 `autonomy/record/components/CandidateDialog.vue` 中，针对物管会/业委会登记，`photo` 和 `appointmentStartDate` 原本为 `required: true`。
- 验证规则已移除，它们不再是必填项。
- 适用于备案 (registro) 的添加/编辑场景。

## 涉及的文件
- `CandidateDialog.vue`, `MemberInformationDialog.vue`, `MemberInformationTable.vue`
- `autonomy/record/components/detail.vue`, `autonomy/change/industry/detail.vue`
- `autonomy/change/property/detail.vue`, `directDetail.vue`, `enums.js`

## 验证
- 来源: cursor session=14cca6c3-1374-4ef4-99d2-752064a64d18

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_dialog_validation",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->