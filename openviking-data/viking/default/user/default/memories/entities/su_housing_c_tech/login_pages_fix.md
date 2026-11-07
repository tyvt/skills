# 登录页路由缺失修复
苏住房C 小程序因 `pages.json` 登录路由被删但代码仍跳转，导致 `navigateTo:fail page is not found`，已恢复路由。

## 问题原因
- 登录页 Vue 文件存在，但 `pages.json` 对应路由被删（commit `61febf6` 为统一苏服办登录流程移除）
- 多处代码仍 `navigateTo('/pages/login/index')`，报 `page is not found`

## 修复内容
- 在 `pages.json` 恢复 4 个页面注册：`pages/login/index`（登录）、`pages/login/forget`（忘记密码）、`pages/login/password`（忘记密码）、`pages/login/success`（忘记密码）
- 重新编译/刷新开发环境后再试跳转

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages/login/index.vue`、`pages.js`
- 来源会话ID：17b77da9-0fa5-4835-918b-0363e0ec5bf1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "login_pages_fix",
  "source_extraction_id": "3161c89232f84826875c751332dafd48",
  "version": 1,
  "memory_type": "entities"
}
-->