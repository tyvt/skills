# 企业端登录后项目选择弹窗缺失
企业用户登录后「物业管理区域/项目选择」弹窗由开关控制，曾因配置关闭而缺失，后在 develop/v2.6.2 修复。

## 根因分析
- zhi2-web-admin/src/utils/projectContext.js 中开关 ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN 控制弹窗显隐
- 提交 bf2512af8（2026-07-13，说明「Disable B terminal project dialog on login to improve user experience」）将开关置为 false，主动关闭弹窗

## 修复逻辑
- develop/v2.6.2 提交 b9412a507 将开关置为 true，并设定规则：空列表不弹窗、仅 1 个小区默认选中不弹窗、多个小区无有效缓存时弹窗选择
- develop/v2.6.2-yulin 已合并（69ea69f0a），冲突文件 serviceItem/detail.vue 采用 2.6.2 修复版本；两分支当时均仅在本地未 push

## 涉及文件
- d:/repository/榆林G/zhi2-web-admin/src/utils/projectContext.js（功能开关）
- d:/repository/榆林G/zhi2-web-admin/src/views/home/bProjectDialog.vue（弹窗组件 BProjectDialog，文案「请选择后进入」）
- d:/repository/榆林G/zhi2-web-admin/src/layout/index.vue（created、syncProjectDialogVisibility、openProjectDialog 触发挂载）
- d:/repository/榆林G/zhi2-web-admin/src/utils/terminalUser.js
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/serviceItem/detail.vue（合并冲突文件）

## 参考信息
- 来源会话：b7adac16-6317-40a9-8cb6-2631f68c204c、1aa5a58c-4093-4786-81ac-e958b287e260
- 所属项目：榆林G

## 验证与归属
- 验证证据：extracted source=cursor project=榆林G


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "b_project_dialog",
  "source_extraction_id": "fffe5bdfa8af4c40a27e1c3777054623",
  "version": 1,
  "memory_type": "entities"
}
-->
