# 门户与后台接口族混淆致1400方法不支持
登录后请求 /v2.0/portal/user/getInfo 返回 code:1400、msg「HTTP请求方法不支持」，登录停留原页。

## 问题现象
- 门户 getInfo 走 GET + 特定前缀/重写规则，前端若通过 portalApiRewrite 拼出的路径落进后台拦截器（或方法被改写成 POST），服务端回报 1400 而非 401/404
- 易被误判为 token 失效

## 根因与排查
- 门户接口与后台接口是两套约定，前缀/重写规则不同
- 需核对 utils/portalApiRewrite.js 重写结果（实际 URL 与方法）与 request.js 的请求方法改写/加解密白名单
- 确认 portal 前缀接口既未被改写路径、也未被统一改成 POST

## 修复要点
- 必要时给 portal 接口单独划出分支，不与登录后业务请求共用同一套改写规则
- 改完在浏览器 console 网络面板确认最终 method 与 URL，再刷新登录验证
- 同步自查 store/modules/user.js、api/index.js 里对该接口的调用点

## 涉及文件与归属
- 涉及文件：portalApiRewrite.js、store/modules/user.js、api/index.js、request.js、login.vue、env/.env（均在 d:\repository\产品2.0\zhi2-web-admin\src 下）
- 所属项目：产品2.0；来源会话 2caa4ea9-415d-4bd1-9439-0264ee8f6342；代码基线 1d563df

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_api_1400",
  "source_extraction_id": "ec9ce0013b2443a8a8fee4d4e2edd636",
  "version": 1,
  "memory_type": "entities"
}
-->
