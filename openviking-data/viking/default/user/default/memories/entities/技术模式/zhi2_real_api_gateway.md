# 苏住房防汛C端真实接口网关与登录流
苏住房防汛C端H5（zhi2-mobile-query-h5-c-unlimited，来源会话 2026-11-11）切到真实接口测试时探明的网关地址、代理坑与登录流程。

## 真实网关地址与代理坑
- 真正 API 网关：`c.h5-zhishu.shimin.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com`（去掉 `unlimited.` 前缀）
- `vite.config.ts` 默认 `VITE_API_PROXY_TARGET` 指向 `unlimited.c.h5-zhishu...`，实为前端 SPA 本身，`/api` 返回 404，dev 下到不了后端
- 修正：本地 `src/.env` 把 `VITE_API_PROXY_TARGET` 改为真正的网关，保留 `VITE_API_BASE_URL=/api`、`VITE_PROJECT_ID=suzhufang`、`VITE_DATA_MODE=remote`
- `src/.env` 已被 `.gitignore` 忽略（第 11 行），本地切真实接口安全、不入库

## 接口存活与鉴权
- `GET/POST /api/v3.0/portal/appLogin/apps` 在网关返回 500（路由存在、能到后端），说明接口是活的
- 无 token 或假 Bearer 均 500，需有效登录态 Bearer token 才能返回数据

## 登录流程（verify 模式）
- 需图形验证码：`portal/appLogin/captcha` 返回 uuid + 图片（4 位），页面挂载即拉取且强制
- 再传 phone + 证件号后几位（idNumberSuffix），最后 SMS 验证码
- 用户曾提供 SMS 码 `123456`，但缺 phone 与 idNumberSuffix 无法登录
- 登录为短信三重校验，无头环境无法拿 token，故无法由助手直接拉真实数据
- `portal/appLogin/captcha` 无 token 也 500，疑似网关边缘拒 plain http，需 https 复测

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_real_api_gateway",
  "source_extraction_id": "4886d7741fe5483f8673715398c4384b",
  "version": 1,
  "memory_type": "entities"
}
-->