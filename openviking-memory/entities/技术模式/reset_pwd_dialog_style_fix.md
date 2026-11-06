# 修改密码弹窗错误提示样式修复
修复园区公共收益项目修改密码弹窗中 Element UI 校验错误提示因 overflow 裁剪导致红字显示不全的问题。
## 问题根因
- Element UI 校验错误提示默认 `position: absolute`，不占文档流高度
- `zs-dialog` 的 `.dialog-box`、`.el-dialog__body` 设置了 `overflow: hidden`
- 密码规则文案较长换行后第二行被父容器裁剪，红字显示不全
## 修复方案
- `ResetPwdDialog.vue` 中 `.el-form-item__error` 改为 `position: relative`，参与布局自动撑开高度
- 覆盖弹窗内 `overflow: hidden` 改为 `overflow: visible`
- 设置 `line-height: 1.4`、`white-space: normal` 支持多行完整显示
- `ChangePasswordDialog/index.vue` 做相同处理，避免导航栏「修改密码」入口出现同样问题
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/home/ResetPwdDialog.vue、ChangePasswordDialog/index.vue、public/assets/css/element-ui.css、components/zs-dialog/zs-dialog.vue、login.vue
- 所属项目：园区公共收益；来源会话：1f25b0e2-be1a-4b0d-8237-80f1b1801e20；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reset_pwd_dialog_style_fix",
  "source_extraction_id": "d911a1df7ac94bea8711193041fef28e",
  "version": 1,
  "memory_type": "entities"
}
-->