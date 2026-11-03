# 平台配置loginMethod驱动登录页三种形态
园区公共收益项目将布尔开关改为字符串`loginMethod`(字典`login_method`)，动态展示登录字段与校验。

## 配置定义
- `loginMethod`取值：`1`用户名+密码、`2`手机+短信验证码、`3`用户名+密码+短信验证码
- 系统配置页用下拉维护该字段

## 登录页行为
- `login.vue`按配置动态展示字段与校验规则
- 方式3调`POST /v2.0/security/auth/loginWithCode`，body为`{username,password,smsCode}`，响应含`accessToken`
- 后端未提供方式3时前端仍预留UI与接口封装

## 验证与归属
- 涉及文件：src/views/system/platformConfig/detail.vue、src/views/login.vue、src/api/index.js
- 所属项目：园区公共收益；来源会话：a6727568-bde2-4da6-a70a-31bf732716a4；代码基线：bd275b5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_login_method",
  "source_extraction_id": "c36c34f056dd48c9be8f216646e9ea81",
  "version": 1,
  "memory_type": "entities"
}
-->