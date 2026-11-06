# 修改密码页小眼睛切换清空密码修复
泰兴小程序「我的 → 修改密码」页点击小眼睛切换显示/隐藏时密码被清空，已修复。

## 问题根因
- 修改密码页用 `:type="visible ? 'text' : 'password'"` 切换显示/隐藏。
- uni-app/小程序中 input 的 `type` 在 `text` 与 `password` 间切换时，输入内容会被清空。

## 修复方案
- 与登录页一致，固定 `type="text"`，用 `:password="!visible.xxx"` 控制是否密文显示。
- 原密码、新密码、确认密码三个输入框均已按此方式修改。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages/profile/change-password.vue、src/staff/pages/login/index.vue、src/staff/components/ZsEye/ZsEye.vue、src/staff/components/ZsClear/ZsClear.vue
- 来源会话ID：2ba5aff9-455b-4cc2-836d-428522f5395d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_password_eye_fix",
  "source_extraction_id": "969d882027964c87a9e76ee21a7fe4b1",
  "version": 1,
  "memory_type": "entities"
}
-->