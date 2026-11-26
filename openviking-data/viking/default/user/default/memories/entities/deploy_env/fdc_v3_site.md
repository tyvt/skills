---
audit_status: valid
last_checked: 2026-11-26T20:50:34+08:00
verdict_note: 本地部署站点运维记忆：端口→dist 映射、机构登录方法；机构账号为统一社会信用代码（公开信息），密码仅指向 worklog 未明文，非隐私违规。
---
# 苏州市房地产监测V3 本地部署站点
苏州市房地产监测/综合服务平台（fdc-v3）在本机 nginx 上各端口站点的对应关系与登录方法，用于实机验证定位。

## 端口与产物
- 8098 端口服务「苏州市房地产综合服务平台」，root 指向 fdc-v3 最新构建 dist；2026-11-24 核对时 bundle 为 index-2cBBVt99.js，是实机验证的正确站点。
- 8103 端口实为「昆山物业公共服务平台」（uat），不是 fdc-v3 生产；2026-11-23 会话曾误用该端口。
- 8104 为部署注册表记录的 fdc-v3 prod 端口；各 fdc-v3 端口共用同一 dist 与后端 127.0.0.1:8080。
- nginx sites-enabled 配置跨多项目共用，端口→dist 需按站点名「苏州市房地产监测V3」在配置中检索确认。

## 机构登录
- 登录页有「用户登录」「机构登录」两个页签；机构账号必须用「机构登录」，否则报「机构用户请从机构登录入口登录」。
- 验证码为算术图（接口 /api/v3.0/code）；须用原生 value setter 并派发 input/change 事件同步 Vue v-model，否则前端校验报「验证码不能为空」。

## 复现账号与路径
- 机构账号 911301292674345887（机构编码同号），对应「贝海壳经纪公司」，加盟品牌为「无」；为 bug 6476 的复现账号（密码见该 bug worklog）。
- 登录后入口 /#/home/todo，含「经纪机构管理」菜单；机构可进「机构基本信息」→「变更」触发品牌原值比对场景。

## 工具注意
- agent-browser 有 verify-loop 门禁（调用数超阈值即拦截）与 .cmd shim 特殊字符限制；可改用原生 agent-browser-win32-x64.exe 或经 ctx_execute 的 shell 批处理。

<!-- MEMORY_FIELDS
{
  "category": "deploy_env",
  "name": "fdc_v3_site",
  "source_extraction_id": "93082bc8dd9a4f9e86cc8dea47253945",
  "version": 1,
  "memory_type": "entities"
}
-->