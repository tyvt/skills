# 微信登录请求被中途取消
昆山市民小程序微信登录调用 getInfoByCode 报错 MiniProgramError: Request aborted，属请求被取消而非业务错误。

## 错误现象
- 报错：`MiniProgramError: Request aborted`
- 对应请求：`GET /estate/wechatOauth/getInfoByCode?code=...`
- 作用：用 `wx.login` 拿到的 `code` 经 `wxLogin.js` 的 loginWithWxCode 去后端换 accessToken 与用户信息

## 常见原因
- 重复触发登录导致请求互相打断（最可能）

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：src/utils/wxLogin.js、App.vue、home.vue
- 所属项目：昆山市民；来源会话ID：abc57820-2b35-4849-8e23-0d665121c69f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "wxlogin_request_aborted",
  "source_extraction_id": "a93b55d09bbe4c6588e6a370b98e3c85",
  "version": 1,
  "memory_type": "entities"
}
-->