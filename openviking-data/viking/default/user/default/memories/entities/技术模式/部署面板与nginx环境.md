# 部署面板与nginx环境
zhi3-web-admin-h5 部署面板的环境注册、nginx 站点生成流程与复现环境坑点。

## 环境注册
- 部署面板支持 local/dev/test/uat 多环境；uat（客测）代理到真实测试环境 58.210.252.230:9002。
- 2026-11-27 用户确认实施方案并提供客测凭据与注册请求；uat 环境已注册，凭据经 dashboard inject 端点写入并可在面板显示（端点字段名需先查 schema）。
- 9002 需验证码算术题登录；此前凭据不可解、本地 8080 后端停止导致复现受阻，属技能允许的退出条件。

## Nginx站点生成
- 站点由 `gen_nginx_sites.ps1` 从 registry 生成到 env-sites；`sync.ps1` 先 Remove-Item 再生成，中途失败会删光已生成 conf。
- fdc-v3 专用模板把 `/api/v3.0/` 改写为 `/v3.0/`，但 9002 网关原生只服务 `/api/v3.0/`，改写导致 405；正确做法是原样透传 `/api/v3.0/`。
- 实测 9002：`/v3.0/code` 405、`/api/v3.0/code` 200；captcha 接口须用 `/api/v3.0/code`。
- 8103 端口已被遗留「昆山物管」站点占用，产生冲突，需另选空闲端口。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "部署面板与nginx环境",
  "source_extraction_id": "1e3c306705ff400ca5f07fd77aa5614e",
  "version": 1,
  "memory_type": "entities"
}
-->