# 小程序 BASE_URL 禁止沿用 H5 相对路径 /api
昆山市民小程序因 mp.js 误用相对 /api 导致打包后接口地址错误，需按 envVersion 选择完整域名。

## 问题背景
- 小程序 `src/env/mp.js` 若把 `BASE_URL` 写成 `/api`，开发 H5 可由 Vite 代理转发，但小程序打包无代理，相对路径无法解析到后端。
- 表现为打包后接口地址不对，根因是 mp.js 重构误用相对 /api。

## 解决方案
- 应像 `IMAGE_BASE` 一样按 `wx.getAccountInfoSync().miniProgram.envVersion`（develop/trial/release）选择完整域名。
- 开发/体验走测试域 `.kunshan.suzhou.test.zhishusz.com/prod-api`，正式走 `https://kwt.ksjzaq.com/app/`。
- 改 env 后需 `npm run build:mp` 重新上传。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证：会话 76e058f1 用户反馈小程序打包接口不对，修复恢复 envVersion 分支表；验证证据 src=昆山市民/006.md。
- 涉及文件：src/env/mp.js、src/request/index.js、package.json、vite.config.js、src/manifest.json、src/api/index.js。
- 所属项目：昆山市民；代码基线：1e46691；来源会话ID：76e058f1-ba17-479b-89f8-7c7af2202d46。


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "mp_api_bug",
  "source_extraction_id": "c534b7c594854b9089e2fda834ef7f9b",
  "version": 2,
  "memory_type": "entities"
}
-->