# 图片代理统一为接口代理地址
苏州市房地产监测V3 的 `vite.config.js` 中 `getFileProxyTarget` 改为直接返回 `VITE_APP_PROXY_ADDRESS`，使图片/文件代理与接口代理走同一目标。

## 改动要点
- `vite.config.js` 的 `getFileProxyTarget` 现直接返回 `VITE_APP_PROXY_ADDRESS`（接口代理地址）
- 不再读取 `VITE_APP_FILE_PROXY_ADDRESS`，也不再剥离 `/v3.0` 后缀
- `env/.env` 里的 `VITE_APP_FILE_PROXY_ADDRESS` 已不生效，可按需清理

## 影响范围
- 开发服务器 `/zhi2`、`/zhi2-dev`、`/zhi2-test` 的图片/文件代理与接口代理走同一目标
- 部署侧无需改动：`deploy/nginx.conf` 中 `/api/v3.0/` 与 `/zhi2*/` 本就都指向 `fdc_api_gateway`
- 重启 dev server 后生效

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/vite.config.js、zhi2-web-admin/src/utils/resolveServerAssetUrl.js、deploy/nginx.conf
- 所属项目：苏州市房地产监测V3；来源会话：be25274a-6970-4bda-b365-0ac3a21f1320；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "image_proxy_unified",
  "source_extraction_id": "acb7ffa51f20469db8357a6725c45321",
  "version": 1,
  "memory_type": "entities"
}
-->