# 后端公钥为空致前端启动中止
后端 /security/public-key 返回空时，前端开启 VITE_CRYPTO_ENABLED 无法生成加密请求而中止启动仅留 Loading。

## Description
- 根因：后端 /security/public-key 返回空，前端开启 VITE_CRYPTO_ENABLED 时无法生成加密请求而中止启动
- 改动 main.js:204、keyExchange.js:14：公钥空时报错并将 Loading 替换为错误重试
- 临时跳过加密：将 env/.env.local 的 VITE_CRYPTO_ENABLED 改为 false

## 涉及文件
- zhi2-web-admin 改动 main.js
- zhi2-web-admin 改动 keyExchange.js

## Relations
- 来源会话：rollout-2026-08-24T14-55-34-01a0328d-95bc-7e20-aa03-f13206d9bd95（extracted source=codex）
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "publickey_empty_fix",
  "source_extraction_id": "2fba8f8d0cda4c1c996d7f39cc34706e",
  "version": 1,
  "memory_type": "entities"
}
-->