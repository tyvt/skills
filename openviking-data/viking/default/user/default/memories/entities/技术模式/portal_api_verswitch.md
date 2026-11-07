# 门户 API 大版本切换三处同改再 npm run test
门户 monorepo 切换 API 网关版本号需父仓 env 与 nginx 及子模块 vite 代理三处同改，再打包验证，避免 dev 通而 test/生产打旧网关。

## 操作要点
- 父仓 env/.env（VITE_APP_BASE_API、VITE_APP_PORTAL_BASE_API）与 deploy/nginx.conf 的 location 前缀，和子模块 zhi2-web-admin/vite.config.js 开发代理默认值必须同一版本串（如 /v3.0）
- 只改子模块或只改父仓会导致 dev 通、test 包或生产 nginx 仍打旧网关

## 执行顺序
- 全仓 grep 旧前缀（如 /v2.0）确认无残留
- 同步改上述三处（用户口述 /v.3.0 多为笔误，以项目既有 /v2.0 形态改为 /v3.0）
- 父仓执行 npm run test 打包
- dist/ 产物 grep 新前缀并确认无旧串

## 验证与归属
- 与「portalApiRewrite / sign.js 漏改」条目互补：本次是网关版本号整包升级，不单是某个 listTree 路径
- 验证证据：会话 6d410c7e，接口 /v2.0 改 /v3.0 并用 test 打包；已改 env/.env、deploy/nginx.conf、vite.config.js，npm run test 成功，产物含 /v3.0 无残留 /v2.0
- 涉及文件：env/.env、env/.env.test、env/.env.production、deploy/nginx.conf、zhi2-web-admin/vite.config.js、package.json
- 所属项目：门户；来源会话：6d410c7e-78d3-4e44-82cf-dbbc3851e99f；代码基线：db160a9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_api_verswitch",
  "source_extraction_id": "c5ddad6824164d7095ceeab2e97eb65d",
  "version": 1,
  "memory_type": "entities"
}
-->