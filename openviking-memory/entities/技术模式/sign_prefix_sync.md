# sign.js 加签脚本 API 前缀双写同步约定
园区物管2.0 的 public/sign.js 放弃运行时注入 API 前缀，改为写死常量 SIGN_API_BASE 并与 VITE_APP_BASE_API 双处同步。

## 问题背景
- sign.js 在 Vite 打包流程之外（public/assets/js，不进打包），读不到 import.meta.env / define 注入
- 原先靠 index.html 的 meta 标签 + window.__APP_BASE_API__ 传 API 前缀，链路分散易漏改

## 解决方案
- 在 sign.js 写死常量 SIGN_API_BASE = 'api/v2.0'，与 env/.env 的 VITE_APP_BASE_API 保持一致
- resolveSecretKeyUrl() 按该常量拼出 /api/v2.0/secret/key
- 删掉 index.html 的 app-base-api meta 与 vite.config.js inject.data 的 appBaseApi
- 约定：改环境 API 前缀须同时改 sign.js 的 SIGN_API_BASE 和 VITE_APP_BASE_API 两处（sign.js 注释已标注）

## 关键事实
- sign.js 请求 /secret/key 获取加签密钥，密钥需带 token 放 header，响应体需 base64 解码才是真结果
- 所属项目：产品2.0；来源会话：2cd9858a-f845-438d-8395-c6461b78ce48；代码基线：0ec4b79

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sign_prefix_sync",
  "source_extraction_id": "065add8eab774fc2a55b7e59c38e0390",
  "version": 1,
  "memory_type": "entities"
}
-->