# 账号密码登录输入框聚焦报错修复
苏住房C小程序账号密码登录页因 uni-easyinput 误用 focus() 方法报错，已通过属性控制修复。

## 问题根因
- uni-easyinput 的 focus 是布尔 prop，无 focus() 方法，调用 this.$refs.inputRef.focus() 实际调用 false 导致 t.call is not a function

## 修复内容
- 在 ImgCode 组件中通过 :focus 属性控制聚焦，利用 inputFocus 变量结合 $nextTick 切换
- 验证码错误后刷新图片并聚焦输入框，符合微信小程序推荐方式

## 涉及文件与归属
- 涉及文件：pages_main/login/index.vue、components/ImgCode/index.vue、hooks/useSubmitLock.js、api/security.js
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：ab7bb862-0a23-40aa-ab1b-fe4173708a80；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "login_focus_fix",
  "source_extraction_id": "f9a8a8092b644e0e884293a518ae4796",
  "version": 1,
  "memory_type": "entities"
}
-->