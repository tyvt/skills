# H5环境复用缓存token问题修复
昆山市民 H5 环境复用缓存旧 token 导致请求携带过期凭证的问题根因与修复。

## 问题根因
- Pinia 持久化 token：user store 开 persist，token 写入 uni.setStorageSync，刷新后恢复旧 token
- loginWithWxCode 短路：内存有 token 直接返回，不调用 getInfoByCode 换新
- 业务请求抢先：myhouse/index.vue、benefit/index.vue 在 onLoad/onShow 直接调接口，未等 loginWithWxCode()

## 修复方案
- 调整 loginWithWxCode 短路逻辑，必要时换发新 token
- 业务页面等待 loginWithWxCode() 完成后再发请求
- 修正 Pinia 持久化导致的旧 token 恢复

## 验证与归属
- 涉及文件：src/utils/wxLogin.js、src/stores/user.js、src/pages_myhouse/index.vue、src/pages_benefit/benefit/index.vue
- 所属项目：昆山市民；来源会话ID：5879f04f-c762-41db-942c-5ca6acb2e3ce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_token_fix",
  "source_extraction_id": "f93ad767e88948b5b1deeea32b5a0798",
  "version": 1,
  "memory_type": "entities"
}
-->