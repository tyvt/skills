# 密码表单WXSS通配符编译错误修复
苏住房C小程序中 `PasswordForm.vue` 因引入 `form.scss` 使用子选择器 `> *` 触发微信WXSS不支持通配符报错，已通过条件编译修复。

## 问题根因
- `PasswordForm.vue` 引入 `@/styles/form.scss`，其中使用子选择器 `> *`
- 微信小程序 WXSS 不支持通配符 `*`，编译到 `PasswordForm.wxss` 约第184行报错

## 修复内容
- 在 `form.scss` 用 uni-app 条件编译区分平台
- H5 / App 保留 `> *`（行为不变）
- 各端小程序（MP）改为 `> view`（与 `virtualHost` 下根节点为 `view` 一致）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`PasswordForm.vue`、`@/styles/form.scss`、`PasswordForm.wxss`、`form.scss`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：3f6a535b-0e0d-41d1-aacb-0ee81bac9792；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "passwordform_wxss_fix",
  "source_extraction_id": "b1410b6d519f499da0178d453601d9b1",
  "version": 1,
  "memory_type": "entities"
}
-->