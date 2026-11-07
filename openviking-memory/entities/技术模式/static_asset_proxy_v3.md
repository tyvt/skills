# 静态资源代理误拼 /v3.0 且网关无文件服务
苏州市房地产监测V3 的 zhi2-web-admin 中静态资源误代理至含多余 /v3.0 路径且本地 8080 网关未配置文件服务，通过独立代理与路径规范化修复。

## 问题根因
- /zhi2-dev 等静态资源误代理至含多余 /v3.0 路径
- 本地 8080 网关未配置文件服务

## 修复方案
- vite.config.js 使静态资源走独立代理不拼 /v3.0
- env/.env 新增 VITE_APP_FILE_PROXY_ADDRESS 指向远程 dev 文件服务
- resolveServerAssetUrl.js 将 /v3.0/zhi2-dev/... 规范为 /zhi2-dev/...
- 访问应通过 http://localhost:8081/zhi2-dev/... 而非带 /v3.0 网关地址

## 涉及文件
- zhi2-web-admin/src/components/AnnexUpload/components/ImageGrid.vue
- zhi2-web-admin/src/utils/resolveServerAssetUrl.js
- zhi2-web-admin/vite.config.js
- zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- zhi2-web-admin/docs/price-filing-backend-issues.md

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/184.md
- 来源会话ID：9fca34d7-37be-413a-b809-d8a56f769025
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "static_asset_proxy_v3",
  "source_extraction_id": "dbef7d368b1740119fb77620e86c1a0f",
  "version": 1,
  "memory_type": "entities"
}
-->