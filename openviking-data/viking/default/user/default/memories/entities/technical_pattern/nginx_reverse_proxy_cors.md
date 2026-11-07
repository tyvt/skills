# Nginx same-origin reverse proxy solves browser CORS
When an H5 app served from nginx calls a backend on a different origin, missing Access-Control-Allow-Origin headers block the calls; a same-origin nginx reverse proxy removes the need for backend CORS headers.

## Problem
- Direct browser calls from the nginx-served H5 to backend 9610 returned 200 but with no `Access-Control-Allow-Origin` header, so the browser blocked them
- OPTIONS preflight returned 403 with no CORS headers

## Fix
- Add nginx location blocks that proxy `/api-flood` to 9610 and `/api-auth` to 9211, so the H5 calls a same-origin path
- Set VITE_API_BASE_URL=/api-flood and VITE_AUTH_BASE_URL=/api-auth (relative, non-empty so the client config guard passes)
- Reload nginx with its correct prefix (e.g. `-p D:/nginx`) so the new config actually loads

## Verification
- After reload, `/api-flood` returned 200 JSON and `/api-auth` reached 9211 (400 on dummy body), confirming the proxy path works and CORS is solved

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "nginx_reverse_proxy_cors",
  "source_extraction_id": "77c34fd9b6ca444b85d55baeb884d4f7",
  "version": 1,
  "memory_type": "entities"
}
-->