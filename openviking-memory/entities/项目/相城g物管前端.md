相城G（苏州相城武港）物管平台的前端子模块，对应独立 GitLab 项目与 dev 部署域名。

## 项目信息
- GitLab 项目标识 `gitlab.zhi.com-zhi-suzhou-xiangcheng-wuguan-fe-zhi1-web-admin-h5-g-unlimited`。
- dev 部署地址 `http://unlimited.g.h5.admin.web.v1.wuguan.xiangcheng.suzhou.dev.zhi.com/`，2026-11-25 验证可访问（HTTP 200）。
- 本地实机验证使用端口 8171（另开浏览器会话），用于验证「小区信息」导入成功态弹窗。
- 用户 2026-11-25 提供的部署面板登记账号：用户名 `KSXM`、密码 `{{ov_privacy:default:viking://~/privacy/credential/deploy_env.xiangcheng-g.dev#/values/password}}`。
- 与太仓物管前端（见「zhi1-web-admin（太仓物管前端）」）为不同项目，勿混淆。

## 登录验证要点
- 该 dev 站点登录需要图形验证码（GET /prod-api/code，返回 code 与 uuid），须先通过验证码识别再回写面板。
## 验证环境与经验
- 校验：2026-11-27T06:09:07+08:00 端口8171、KSXM账号及privacy脱敏引用齐备，属真实会话记录且无矛盾证据；非代码修复类，按现状一致判有效。

- 登录流程：`/code` + vision + `POST /auth/login` 走通；浏览器内 `fetch /prod-api/code` 与页面 uuid 同源同步；先点 Close 关改密弹窗、填明文密码、验证码每次重取、优先 find placeholder/text（避免 PowerShell 吞 @ref）。
- 专属 agent-browser 会话先 session list，不用 default/AGENT_BROWSER_NAMESPACE。
- 路由接口 `GET /prod-api/system/menu/getRouters` 返回 `/#/xmxx/lz/buildinginfo`（勿用 `/getRouters`）。
- 本地验证环境已就绪：nginx 8171、面板登记、登录/token 验证、AES 参数与 privacy 注入均完成；代码在 dev 分支。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "相城G物管前端",
  "source_extraction_id": "4100fd7d52464db790d0a249a0c9f03b",
  "version": 4,
  "memory_type": "entities"
}
-->