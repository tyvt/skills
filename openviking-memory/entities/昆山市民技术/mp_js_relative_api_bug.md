# mp.js相对路径/api致小程序打包接口失败
昆山市民小程序因 mp.js 重构后 BASE_URL 改相对路径导致打包接口失败的bug根因与修复记录。

## 问题根因
- `src/env/mp.js` 重构后 `BASE_URL` 改为相对路径 `/api`
- 小程序打包无 Vite 代理无法解析域名致接口失败

## 修复方案
- 恢复按 `envVersion` 选择完整接口地址（develop/trial/release 对应不同域名）
- 与 `IMAGE_BASE` 处理一致

## 验证与归属
- 验证证据：src=昆山市民/006.md
- 涉及文件：src/env/mp.js、package.json、vite.config.js、src/request/index.js、src/manifest.json、src/api/index.js
- 所属项目：昆山市民；来源会话ID：76e058f1-ba17-479b-89f8-7c7af2202d46；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "mp_js_relative_api_bug",
  "source_extraction_id": "caaa6f50daa5490bae09d3487c3ef499",
  "version": 1,
  "memory_type": "entities"
}
-->