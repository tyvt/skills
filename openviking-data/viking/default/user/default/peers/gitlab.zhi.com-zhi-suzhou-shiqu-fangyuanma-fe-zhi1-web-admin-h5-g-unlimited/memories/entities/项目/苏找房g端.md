# 苏找房G端 (zhi1-web-admin-h5-g-unlimited)
苏州市房地产市场和交易管理中心G端（政府/管理端）前端项目，对应 GitLab 项目 gitlab.zhi.com-zhi-suzhou-shiqu-fangyuanma-fe-zhi1-web-admin-h5-g-unlimited。

## 仓库与构建
- 技术栈：Vue CLI（vue.config.js），使用 process.env.VUE_APP_ 环境变量（非 Vite 的 import.meta.env.VITE_APP_）
- 当前分支：suzhou-shiqu-suzhaofang-main-v2.0.11
- 未配置 ESLint（无 eslint 依赖/配置/lint 脚本），以 npm run build 作为编译验证
- package-lock.json 被 .gitignore 的 *-lock.* 忽略（本仓约定）

## 关键接口与文件
- src/api/system.js:61 定义 getRegisterToken，在 login.vue:371（register 流程，未登录场景）实际调用
- login.vue:211 引入 getRegisterToken
- 请求库为标准 axios，params 自动 URL 编码（含 +/=）

## 安全整改（禅道任务2421，2026-11-12）
- 漏洞 VUL-20261104155309778683：/auth/getToken 零鉴权签发 token，任意用户可登录
- 新增 src/utils/getTokenCipher.js：crypto-js AES/CBC/PKCS7，明文「13位毫秒时间戳|32位hex随机nonce」，标准 Base64；key/iv 须 CryptoJS.enc.Utf8.parse 成 WordArray 且校验16字节
- getRegisterToken 改为 params:{ cipherText }；login.vue 的 register() 加 try/catch 兜底提示
- 三份 .env 新增 VUE_APP_GET_TOKEN_AES_KEY / VUE_APP_GET_TOKEN_AES_IV（值由运维/Nacos 下发，本仓为 csgh1543dg1hdg15 / ksfhsghudg11fb15）
- 新增 crypto-js 依赖（^4.2.0）；提交 f9a97bea7 推送至 suzhou-shiqu-suzhaofang-main-v2.0.11
- 禅道任务2421评论 action 92178 回写前端整改说明，任务保持 doing 未置完成

## 打 Tag 约定
- tag 命名格式为日期式 `yyyyMMdd`（既有 `20251111`、`20251021`、`20251020` 等）
- 既有轻量 tag 也有附注 tag；最近 `20251111` 为附注 tag（带说明），约定沿用此格式
- 实例：2026-11-12 getToken AES 密文校验修复提交 f9a97bea7 打附注 tag `20261112`，说明 `20261112 2026-11-12 getToken 接口增加 AES 密文校验(VUL-20261104155309778683)`，已推送 origin 且本地/远程一致

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏找房G端",
  "source_extraction_id": "7349cea5db22451c8c99b509004f65ea",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangyuanma-fe-zhi1-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->