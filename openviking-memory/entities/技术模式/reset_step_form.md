# 巡检步骤弹窗重置不全
`resetStepForm` 仅清理 `stepFormImages` 而未清空其余表单字段，导致泰兴小程序巡检步骤弹窗在真机环境状态残留。
## 问题根因
- `resetStepForm` 函数仅清理 `stepFormImages` 字段，未重置其他表单状态。
- 巡检步骤弹窗在真机环境出现状态残留，引发异常。
## 解决方案
- 需补全该函数对全部表单状态的重置逻辑。
## 验证与归属
- 验证证据：src=泰兴小程序/001.md
- 涉及文件：src/staff/pages_facility/record/add.vue、src/components/ZsDialog/ZsDialog.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/components/ZsTextarea/ZsTextarea.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、src/staff/pages_facility/issue/components/ReplyDialog.vue、src/App.vue
- 来源会话ID：78ffd4e2-d969-438b-a172-f36dd0d6fbad
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reset_step_form",
  "source_extraction_id": "c7a57cf5e1504976a95d5381a79c5cc8",
  "version": 1,
  "memory_type": "entities"
}
-->