# 苏住房防汛C端真实接口网关与代理配置
苏住房防汛C端H5（zhi2-mobile-query-h5-c-unlimited，来源会话 2026-11-11）切到真实接口测试时探明的网关地址、代理坑与接口鉴权状态。

## 真实网关地址与代理坑
- 真正 API 网关：`c.h5-zhishu.shimin.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com`（去掉 `unlimited.` 前缀）
- `vite.config.ts` 默认 `VITE_API_PROXY_TARGET` 指向 `unlimited.c.h5-zhishu...`，实为前端 SPA 本身，`/api` 返回 404，dev 下到不了后端
- 修正：本地 `src/.env` 把 `VITE_API_PROXY_TARGET` 改为真正的网关，保留 `VITE_API_BASE_URL=/api`、`VITE_PROJECT_ID=suzhufang`、`VITE_DATA_MODE=remote`
- `src/.env` 已被 `.gitignore` 忽略（第 11 行），本地切真实接口安全、不入库

## 接口存活与鉴权
- `GET/POST /api/v3.0/portal/appLogin/apps` 在网关返回 500（路由存在、能到后端），说明接口是活的
- 无 token 或假 Bearer 均 500，需有效登录态 Bearer token 才能返回数据
- `portal/appLogin/captcha` 无 token 也 500，疑似网关边缘拒 plain http，需 https 复测
- 2026-11-25：test 环境登录接口 `/v2.0/security/auth/login` 正常（图形验证码强制开启 captchaOnOff=True），返回 accessToken 及 roles=[admin]、roleKeys=[admin]、deptId=1；但带 Bearer token 的 getInfo/treeInPermission/getKeyData/getBenefitData 全部 500「内部服务器错误」，免登录 `region/list` 返回 200 真实数据
- 2026-11-25：前端 token 存 `flood-token-v1`、登录用户存 `flood-login-user-v1`，注入后请求头带 `Bearer <token>` + projectId（`getProjectId` 取 `suzhufang`）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_real_api_gateway",
  "source_extraction_id": "cab3481dcaa34416ad9d1d2e2086f408",
  "version": 6,
  "memory_type": "entities"
}
-->