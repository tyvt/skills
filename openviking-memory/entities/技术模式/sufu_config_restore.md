# 苏服办分支接口配置恢复
苏住房C 苏服办（SFB）相关配置已从 05b4b4f4 误删前的版本恢复，涵盖环境变量、代理、签名、登录与接口调用等。

## 已恢复配置类别
- 环境变量与开发代理：.env.development / .env.production / .env.test 中全部 VITE_APP_SFB_*、vite.config.ts 的 /sfb-gateway 代理
- 网关签名：index.html 中 SM3 签名脚本 + 苏服办 JSSDK
- 登录流程：src/utils/sfb.js、App.vue、security.js（loginByTicketSfb）、user.js（sfbToken）
- 接口调用：api/index.js（zsSource: 'v2'）、api/v1Instance.js（zsSource: 'v1'）
- 类型声明与业务入口：src/env.d.ts、My_Suzhufang.vue 苏服办登录、goMenu 登录拦截、PhoneCall / AboutUs / ZsRichText 拨号

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：vite.config.ts、index.html、src/utils/sfb.js、App.vue、security.js、user.js、api/index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：e8713fef-c64a-4733-b0ee-f3615b219169；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sufu_config_restore",
  "source_extraction_id": "7078ae91ae8c4d12956f0dcd2e68e7a4",
  "version": 1,
  "memory_type": "entities"
}
-->