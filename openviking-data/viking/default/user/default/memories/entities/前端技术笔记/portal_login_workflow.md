# 门户联调取登录态避免反复试密码
排查门户跳转管理端需门户登录态，但试错密码会锁dev账号30分钟，应优先用未鉴权接口或e2e凭据而非改密码登录。

## 问题根因
- 门户与管理端是两套后端（门户.../web.v2.../api/v3.0/portal/**，管理端.../web.v3.../api/v3.0/**），token不通用
- 门户dev环境大量接口未开鉴权（/portal/user/page、/portal/config/page、/portal/application/page、/portal/function/list、/portal/dept/list、/portal/platformConfig/getInfo等可直接读）
- 多组密码试错会把dev账号临时锁定30分钟，本批为拿登录态重置过门户userId=11密码，代价远大于收益

## 解决方案
- 优先用未鉴权接口取链路信息（/portal/function/list、/portal/config/page等），所需字段基本都在里面
- 必须登录时用仓库e2e既有凭据：门户账号密码取zhi2-web-admin/e2e/.env.e2e的PLAYWRIGHT_LOGIN_PASSWORD（门户明文比对），管理端密码要AES-CBC加密（src/utils/passwordEncrypt.js的key，iv A-16-Byte-String）并配/api/v3.0/code明文验证码
- 不要用「改密码→登录→再改回去」方式拿登录态，也不要连续试多组密码
- 登录态拿到后立刻记录真实redirectUrl、ticket有效期（60s）、参数落点，别反复重跑
- 探针脚本放临时目录（如%TEMP%\portal-probe.mjs），不留仓库

## 验证与归属
- 验证会话：session-eb30f683-df51-4286-8b54-7cbdea56c804（基线65275e9），runtime-probe结论列出两套后端token不通用、dev大量门户接口未鉴权、门户明文密码vs管理端AES加密；子代理补充真实redirectUrl是一次性ticket(60s)+timestamp+nonce+redirect无token，副作用提示重置userId=11密码与多组试错锁账号30分钟
- 涉及文件：zhi2-web-admin/e2e/.env.e2e、zhi2-web-admin/src/utils/passwordEncrypt.js、zhi2-web-admin/src/api/portal/home.js
- 所属项目：zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "portal_login_workflow",
  "source_extraction_id": "35a40b74c09b4248958c07f3ca6c79bd",
  "version": 1,
  "memory_type": "entities"
}
-->