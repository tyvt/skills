# 平台配置短信登录开关驱动登录页
园区公共收益项目在 platformConfig 新增布尔开关控制登录页是否展示短信登录方式。

## 配置定义
- platformConfig/detail.vue 新增「是否开启短信登录」配置，取值 1 开 / 0 关
- app.js 的 getInfo 接口缓存 smsLoginStatus 供全局读取

## 登录页行为
- login.vue 依据 smsLoginStatus 切换登录方式
- 开启时走手机号 + 短信验证码流程

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/views/system/platformConfig/detail.vue、src/views/login.vue、src/views/LoginForm.vue、src/views/home/ForgotPassword.vue、src/store/modules/user.js、src/views/companyLogin.vue、src/utils/auth.js、src/views/register/components/accountInfo.vue
- 所属项目：园区公共收益；来源会话：75dc4e9d-04cf-42a2-9e3f-7822ba6d3b69

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sms_login_switch",
  "source_extraction_id": "92149c6e2514408ab4051677278e5d51",
  "version": 1,
  "memory_type": "entities"
}
-->