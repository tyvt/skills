# 微信基础库3.8.6+与旧uni-app不兼容致登录报错
苏住房C微信小程序基础库 3.8.6+ 与旧版 uni-app 编译器不兼容，登录页多 input 触发 clickCheckTask 报错 Cannot read property '0' of null。
## 问题现象
- 登录页多个 input 触发 clickCheckTask 时报错 Cannot read property '0' of null
- 仅登录相关业务逻辑受影响，非登录业务逻辑无此错误
## 根因
- 微信小程序基础库 3.8.6+（项目调试用 3.16.2）与旧版 uni-app 编译器（3.0.0-3080720230703001）存在兼容性缺陷
## 涉及组件与文件
- 登录页与公共组件：login/index.vue、AgreementCheck.vue、VerifyCode/index.vue、ImgCode/index.vue
- 全局配置：App.vue、pages.json、package.json、api/security.js
## 验证与归属
- 验证证据：苏住房C/037.md
- 来源会话ID：2a7afd34-614f-40f8-8140-36dc5cc4cbe3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wechat_uniapp_incompat",
  "source_extraction_id": "d6a463af3a394dfc9c190fb365e5731a",
  "version": 1,
  "memory_type": "entities"
}
-->