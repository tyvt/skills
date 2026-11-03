# Network Error 映射文案指网络层失败
昆山市民请求拦截器将 `Network Error` 映射为「后端接口连接异常」，该报错属网络层失败而非业务 code 错误。

## 问题背景
- `src/request/index.js` 响应拦截器对 `error.message === 'Network Error'` 映射为「后端接口连接异常」。

## 含义说明
- 该报错指请求未连上服务端（域名不可达、证书或宕机），属网络层失败而非业务 `code` 错误。

## 验证与归属
- 涉及文件：d:/repository/昆山市民/src/request/index.js、src/pages_home/home.js、src/api/modules/estate.js、src/stores/vote.js、src/env/mp.js、src/pages_home/home.vue、src/api/modules/myhouse.js、src/stores/user.js
- 来源会话ID：33ab37e2-0079-458d-a791-5eab0baa4197
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "network_error_mapping",
  "source_extraction_id": "9f5ed67ac35144b098b3ed9d8f44d21c",
  "version": 1,
  "memory_type": "entities"
}
-->