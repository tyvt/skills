# 静态资源误代理多余v3.0层修复
苏州市房地产监测V3 中静态资源被错误代理至含多余 /v3.0 路径且网关无文件服务，通过调整 vite 代理与新增环境变量规范路径修复。

## 问题根因
- `/zhi2-dev`等静态资源被错误代理至含多余`/v3.0`的路径
- 本地8080网关未配置文件服务

## 修复方案
- `vite.config.js` 改静态资源独立代理不拼 `/v3.0`
- `env/.env` 新增 `VITE_APP_FILE_PROXY_ADDRESS` 指向远程dev文件服务
- `resolveServerAssetUrl.js` 将 `/v3.0/zhi2-dev/...` 规范为 `/zhi2-dev/...`

## 涉及文件
- zhi2-web-admin/src/components/AnnexUpload/components/ImageGrid.vue
- zhi2-web-admin/src/utils/resolveServerAssetUrl.js
- zhi2-web-admin/vite.config.js
- zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- zhi2-web-admin/docs/price-filing-backend-issues.md

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/142.md
- 来源会话ID：9fca34d7-37be-413a-b809-d8a56f769025
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "static_asset_proxy",
  "source_extraction_id": "0925c1b461604fd789523e8d04997112",
  "version": 1,
  "memory_type": "entities"
}
-->