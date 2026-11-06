# 图片代理路径修复
苏州市房地产监测V3 修复 dev 图片代理被错误拼接 `/v3.0` 导致 404 的问题。

## 问题根因
- `/zhi2-dev` 等静态资源被错误代理到 `http://192.168.1.134:8080/v3.0/zhi2-dev/...`（多一层 `/v3.0`）
- 本地 8080 网关未配置文件服务

## 修复内容
- `vite.config.js`：静态资源走独立代理，不再拼 `/v3.0`
- `env/.env`：新增 `VITE_APP_FILE_PROXY_ADDRESS` 指向远程 dev 文件服务
- `resolveServerAssetUrl.js`：自动把 `/v3.0/zhi2-dev/...` 规范为 `/zhi2-dev/...`

## 使用建议
- 重启本地 dev server 使配置生效
- 通过 `http://localhost:8081/zhi2-dev/...` 访问图片，勿直接访问带 `/v3.0` 的网关地址
- 修复后访问图片返回 200

## 验证与归属
- 涉及文件：`vite.config.js`、`resolveServerAssetUrl.js`、`ImageGrid.vue`
- 所属项目：苏州市房地产监测V3；来源会话：9fca34d7-37be-413a-b809-d8a56f769025
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_proxy_fix",
  "source_extraction_id": "40b6465dd8ab4f0bb97d559feedd42fc",
  "version": 1,
  "memory_type": "entities"
}
-->