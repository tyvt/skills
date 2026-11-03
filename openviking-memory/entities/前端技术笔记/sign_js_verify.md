# sign.js 验签与 request.js 加解密是两套独立链路
产品2.0 的 zhi2-web-admin 中，public/assets/js/sign.js 验签与 request.js 的 SM2/SM4 加解密是两套独立机制。

## 问题现象
- 浏览器控制台持续出现对 /api/v3.0/secret/key 的 404 请求
- sign.js 在页面加载时拦截全局 XMLHttpRequest 和 fetch，请求该接口取签名密钥，环境里没有此接口时 404

## 根因
- sign.js 是一层「验签」逻辑，与 request.js 里的 SM2/SM4 加解密通信（keyExchange/requestCrypto/responseCrypto）是两套独立机制
- sign.js 为业务接口自动附加 sign、nonce、timestamp 请求头

## 移除做法
- 移除验签要删三处：public/assets/js/sign.js 文件本身、index.html 里对 sign.js 和 crypto-js.min.js 的 script 引用（crypto-js 仅服务于验签）、vite.config.js 中 viteExternalsPlugin 的 crypto-js external 配置
- request.js 的 SM2/SM4 加密链路与此无关，不能连带误删
- 排查「每页都多一个请求」优先怀疑 index.html 里引的全局拦截脚本

## 验证与归属
- 删除 sign.js、清理 index.html 引用与 vite.config.js external 后，/api/v3.0/secret/key 404 消失；request.js 加密链路未动
- 涉及文件：src/utils/request.js、src/utils/crypto/keyExchange.js、public/assets/js/sign.js、index.html、vite.config.js；来源会话 79a525ee-5819-4c89-ac6f-cb0b07af846f；代码基线 adc516a

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "sign_js_verify",
  "source_extraction_id": "dce3834ae6534892beb7c0f65614063a",
  "version": 1,
  "memory_type": "entities"
}
-->