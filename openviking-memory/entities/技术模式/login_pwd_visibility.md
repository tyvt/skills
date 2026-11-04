# 门户登录页账号密码区块显示规则
zhi2-web-admin 登录页账号密码区块按 dev、本地 build 部署、生产白名单三档展示，避免需求混淆。

## 显示规则
- import.meta.env.DEV 为 true 时（npm run dev）始终展示账号密码区块
- 本地 build + nginx 部署（DEV=false）需放开：forcePasswordLogin 任一成立即展示——DEV、构建注入 VITE_APP_SHOW_PASSWORD_LOGIN=1、或本地地址访问（localhost/127.0.0.1/[::1]/*.local）
- 生产环境须等 loadIpWhitelistStatus 完成且当前 IP 在白名单内才展示，否则隐藏；生产域名访问保持原样，不因地本地放开而放宽
- 白名单状态须与原 loadIpWhitelistStatus 逻辑保持联动

## 本地 build 放开做法
- 新增 env/.env.localdev（置 VITE_APP_SHOW_PASSWORD_LOGIN='1'）与 npm run build:local（--mode localdev）脚本，父仓与子模块 package.json 都要加
- 本地部署流程固定为 npm run build:local → nginx root 指向 dist → 访问 http://localhost:8099；普通 npm run build 经 localhost 访问也会自动放开
- 构建后确认环境变量被正确内联（产物里无残留 VITE_APP_SHOW_PASSWORD_LOGIN 字面量）并还原 public/version.json
- 本地时登录页默认落在「账号密码登录」页签，IP 白名单校验失败也不再隐藏该区

## 注意事项
- 改需求时不要把「仅生产隐藏」「生产+白名单」「本地 build 放开」三档混为一谈
- loadIpWhitelistStatus 与白名单相关状态需保持联动

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/login.vue；env/.env.localdev；package.json；zhi2-web-admin/package.json
- 所属项目：门户；来源会话ID：1c1c985b-50bd-4717-b505-0e781560e2a9、session-993692d7-49f4-4f3a-98dc-15a82361a252；代码基线：b84b4e7、d8addc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_pwd_visibility",
  "source_extraction_id": "b52d446d4244401c9fcc19d40ef516e9",
  "version": 2,
  "memory_type": "entities"
}
-->