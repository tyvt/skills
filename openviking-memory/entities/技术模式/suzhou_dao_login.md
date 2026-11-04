# 苏周到扫码登录接口与职责拆分
门户 UnifiedLogin 接入苏周到实现仅在 zhi2-web-admin 子模块（根 portal 项目无业务源码），Vue 2.7 + Vue Router 3 + Element UI + Vite，axios 经 @/api 封装；login 仅在授权回调页调用。

## 接口契约
- 三个接口均为 POST：getQrLoginParam（返回 qrCodeId、qrUrl，pageUrl 指向前端授权成功链路）
- scanLogin?qrCodeId=...（PC 端轮询，未扫码时 accessToken 为 null）
- login（入参 { code, qrCodeId } 换登录态）
- API 文件 src/api/security/suzhouDao.js：getQrLoginParam、scanLogin(qrCodeId)、suzhouDaoLogin 均 POST('/security/ctAuth/suzhouDao/...', …, { noMessage: true, skipAuthDialog: true })
- 实际前缀为 /api/v2.0（env/.env 的 VITE_APP_BASE_API，vite.config 注入）

## 请求栈与配置
- src/api/index.js 建 HttpRequest 实例
- src/utils/request.js 响应拦截在 code != 200 时 reject，401 弹窗在 skipAuthDialog: true 时跳过——门户免登录轮询必须带该配置
- publicRequestConfig = { noMessage: true, skipAuthDialog: true }

## 职责拆分
- 苏周到 H5 打开 pageUrl 上的授权回调页，在回调页 created → submitAuth() 里调用 login
- 仅当 code == 200 才 replace 到成功页（如 SuzhouDaoAuthSuccess.vue）
- 成功页只做展示与「完成」关窗，不得再调 login
- PC 主流程靠登录页轮询 scanLogin 拿 accessToken，与成功页无关
- 页面侧含二维码展示、轮询 scanLogin、带 code 的回调页与 token 落库

## 落地注意
- 扫码 H5 与回调/成功页放在当前 zhi2-web-admin 工程内
- 核对 nginx/网关前缀与 env 一致

## 涉及文件与归属
- 涉及 SuzhouDaoAuthCallback.vue、SuzhouDaoAuthSuccess.vue、UnifiedLogin.vue、src/api/security/suzhouDao.js、src/api/index.js、src/utils/request.js、env/.env
- 所属项目：门户；来源会话 f66860ed、sess_subagent_agent_8a7e60b1-abf5-46bd-becb-5f29e90346a7；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_dao_login",
  "source_extraction_id": "be485c2942c740ec95fed36871b1ab0f",
  "version": 2,
  "memory_type": "entities"
}
-->