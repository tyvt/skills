# Vite proxy key missing leading slash causes proxy failure
Vite proxy match function uses req.url.startsWith(key), and when VITE_APP_BASE_API lacks leading slash the rule cannot match.

## Root Cause
- doesProxyContextMatchUrl uses req.url.startsWith(key) for matching
- req.url always starts with /
- When VITE_APP_BASE_API is api/v2.0 without leading /, context fails to match

## Solution
- Add normalizeProxyContext in vite.config.js to normalize context to /api/v2.0 to match request path

## Verification and Attribution
- Evidence: src=产品2.0/037.md
- Files: zhi2-web-admin/vite.config.js, src/api/index.js, src/utils/request.js, package.json, node_modules/vite related chunks
- Project: Product 2.0
- Source session ID: 317d62ff-fec1-4cf3-a02d-1ac604d82396
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：317d62ff-fec1-4cf3-a02d-1ac604d82396


<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "vite_proxy_key_slash",
  "source_extraction_id": "3c9ed998705f417e8c48593f229edd2c",
  "version": 1,
  "memory_type": "entities"
}
-->
