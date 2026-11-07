# getFileProxyTarget返回接口代理地址
苏州市房地产监测V3 的 vite.config.js 中 getFileProxyTarget 改为直接返回 VITE_APP_PROXY_ADDRESS，使文件代理与接口代理同目标。

## 变更内容
- `vite.config.js` 的 `getFileProxyTarget` 直接返回 `VITE_APP_PROXY_ADDRESS`，替代原 `VITE_APP_FILE_PROXY_ADDRESS`
- 不再剥离 `/v3.0` 后缀，使开发服务器 `/zhi2`、`/zhi2-dev`、`/zhi2-test` 文件代理与接口代理同目标
- `env/.env` 中 `VITE_APP_FILE_PROXY_ADDRESS` 可清理

## 部署影响
- `deploy/nginx.conf` 的 `/api/v3.0/` 与 `/zhi2*/` 均指向 `fdc_api_gateway`，部署无改动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/130.md
- 涉及文件：vite.config.js、deploy/nginx.conf、src/utils/resolveServerAssetUrl.js
- 所属项目：苏州市房地产监测V3；来源会话：be25274a-6970-4bda-b365-0ac3a21f1320；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "fileproxy_target_change",
  "source_extraction_id": "c528e142327a41bfb03c13f6bb4bbae9",
  "version": 1,
  "memory_type": "entities"
}
-->