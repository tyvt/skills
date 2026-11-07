# vite文件代理复用接口代理地址
苏州市房地产监测V3 的 vite.config.js 中 getFileProxyTarget 直接返回 VITE_APP_PROXY_ADDRESS，使开发服务器 /zhi2* 文件代理与接口代理同目标。

## 问题背景
- 原 getFileProxyTarget 读取 VITE_APP_FILE_PROXY_ADDRESS 并剥离 /v3.0 后缀
- deploy/nginx.conf 原已指向 fdc_api_gateway 无需变动

## 修复方案
- getFileProxyTarget 直接返回 VITE_APP_PROXY_ADDRESS，不再读取旧变量及剥离后缀
- env/.env 中旧变量 VITE_APP_FILE_PROXY_ADDRESS 可清理

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/330.md
- 涉及文件：vite.config.js、src/utils/resolveServerAssetUrl.js、deploy/nginx.conf
- 所属项目：苏州市房地产监测V3；来源会话：be25274a-6970-4bda-b365-0ac3a21f1320；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "vite_file_proxy_target",
  "source_extraction_id": "8eb23ada33d04411a8df7adbe568f048",
  "version": 1,
  "memory_type": "entities"
}
-->