# 员工端按钮主题色全局统一
泰兴小程序员工端 `ZsButton` 组件因读不到页面 `--primary-color` 而回退业主端深蓝，已修复为天蓝 `#1677ff`。
## 问题根因
- `ZsButton` 是独立自定义组件，读不到页面上的 `--primary-color`，回退全局 `page` 的业主端深蓝 `#0A3D62`。
- 之前在页面根节点加 `@include staff-page-theme` 对组件内部无效。
## 解决方案
- 在 `src/staff/components/ZsButton/ZsButton.vue` 根节点注入员工主题变量。
- 对 `type="primary"` 通过内联 `style` 直接绑定 `#1677ff`（小程序端最可靠）。
- 新增 `src/staff/styles/theme.js`，与 `theme.scss` 保持颜色一致。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/staff/components/ZsButton/ZsButton.vue`、`src/staff/styles/theme.js`、`theme.scss`、`src/staff/pages/profile/change-password.vue`、`src/staff/pages/profile/personal-info.vue` 等
- 来源会话ID：d75b7b33-1f22-4fb0-8e53-852cff55d9e9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_theme",
  "source_extraction_id": "3a37b65da1f046779078aeddca3b83b5",
  "version": 1,
  "memory_type": "entities"
}
-->