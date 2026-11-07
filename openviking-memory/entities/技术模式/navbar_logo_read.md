# Navbar Logo 改为 Store 动态读取
产品2.0 的 Navbar.vue 已将 logo 来源从静态引入改为从 store 动态读取，保留兜底。

## 改动内容
- 将 `@zhi2-web-admin/src/layout/components/Navbar.vue:180` 静态引入改为 store 动态读取
- 保留 `defaultLogo` 作为兜底（平台配置未返回 `sysLogo` 时显示）
- 从 `state.app.platformConfig.sysLogo` 读取并作为 `computed` 的 `logo` 输出
- 删除 `data()` 里冗余的 `logo` 字段，模板仍用 `:src="logo"`

## 已知限制
- 文件原有 3 条 ts-plugin 报错，本次改动未新增

## 涉及文件
- D:/repository/产品2.0/zhi2-web-admin/src/layout/components/Navbar.vue
- D:/repository/产品2.0/zhi2-web-admin/src/router/index.js
- D:/repository/产品2.0/assets/views/login.vue
- D:/repository/产品2.0/zhi2-web-admin/src/views/login.vue
- D:/repository/产品2.0/zhi2-web-admin/src/views/home/ForgotPassword.vue

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：acfae044-ec7d-4f5e-bb61-36dc593a35da；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_logo_read",
  "source_extraction_id": "3689ba371e1f48ea9ea4cc5ea35e0fbf",
  "version": 1,
  "memory_type": "entities"
}
-->