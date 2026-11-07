# 泰兴小程序员工端 ZsButton 主题色统一
泰兴小程序员工端 `ZsButton` 因读不到页面 `--primary-color` 而回退业主端深蓝，已修复为天蓝色 `#1677ff`。

## 问题根因
- `ZsButton` 是独立自定义组件，读不到页面上的 `--primary-color`，回退到全局 `page` 的业主端深蓝 `#0A3D62`
- 在页面根节点加 `@include staff-page-theme` 对组件内部无效

## 修复方案
- 在 `ZsButton` 组件根节点注入员工主题变量
- 对 `type="primary"` 通过内联 `style` 直接绑定 `#1677ff`（小程序端最可靠）
- 新增 `src/staff/styles/theme.js`，与 `theme.scss` 保持颜色一致

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证方式：重新编译后在小程序打开「修改密码」页，保存按钮应显示天蓝色 `#1677ff`，不对可清缓存
- 涉及文件：`src/staff/components/ZsButton/ZsButton.vue`、`src/staff/styles/theme.js`、`theme.scss`、`src/staff/pages/profile/change-password.vue`、`src/staff/pages/profile/personal-info.vue`
- 所属项目：泰兴小程序；来源会话ID：d75b7b33-1f22-4fb0-8e53-852cff55d9e9

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "taixing_zsbutton_fix",
  "source_extraction_id": "8d6dfc27e44d45308822b25218938937",
  "version": 1,
  "memory_type": "entities"
}
-->