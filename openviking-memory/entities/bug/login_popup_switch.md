# 登录选择项目弹窗开关逻辑
企业端登录后的项目选择弹窗由开关 ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN 按特定条件控制。

## 弹窗逻辑
- 仅当存在多个社区且没有有效缓存时才弹出。
- 社区列表为空或只有一个社区时不触发弹窗。
- 该逻辑建立于 develop/v2.6.2（commit b9412a507）与 develop/v2.6.2-yulin（merge 69ea69f0a，冲突文件 serviceItem/detail.vue 采用固定版本）分支。

## 涉及文件
- d:/repository/榆林G/zhi2-web-admin/src/utils/projectContext.js
- d:/repository/榆林G/zhi2-web-admin/src/layout/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/utils/terminalUser.js
- d:/repository/榆林G/zhi2-web-admin/src/views/home/bProjectDialog.vue
- d:/repository/榆林G/zhi2-web-admin/src/store/modules/user.js
- d:/repository/榆林G/zhi2-web-admin/src/views/property/serviceItem/detail.vue

## 验证与归属
- 所属项目：榆林G
- 验证证据：src=榆林G/002.md；extracted source=cursor project=榆林G
- 来源会话：b7adac16-6317-40a9-8cb6-2631f68c204c

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "login_popup_switch",
  "source_extraction_id": "db64228bcab94388b4bceb598047450a",
  "version": 2,
  "memory_type": "entities"
}
-->