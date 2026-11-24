# deploy-env 部署看板
本地部署环境管理看板与收敛器，基于 registry.sqlite 统一维护多项目、多环境的站点、端口与网关。
## 组成与运行
- 前端 `index.html` 与后端 `api.py`（约 358 行）组成；服务绑定 `127.0.0.1:18098`，端口占用时可回退 `18099`。
- `registry.sqlite` 为单源并受 git 跟踪；看板通过 `/api/state` 暴露状态，返回 `Cache-Control: no-store`。
- 计划任务 `deploy-env-dashboard` + `pythonw`（`install-autostart.ps1`）开机静默自启。
## 环境与端口
- 2026-11-24 注册表由 24 行迁移至 32 行，8 个 H5 项目补齐 dev/test 对端槽位，迁移前已备份。
- 端口约定 base+index：local=+0、dev=+1、test=+2、uat=+3、prod=+4。
- 8 个项目 base 从 8125 起每 5 个递增至 8160（园区公共收益 8125、防汛C端 8160 等）。
## 网关与展示
- 网关字段 `.kv.gw` 使用 `white-space:normal`、`text-overflow:clip`、`overflow-wrap:anywhere`，长域名换行完整显示。
- 2026-11-24 曾加 `peer_gateway` 对端网关列，后按“真实登记环境槽位”方案撤销，仅保留换行样式。
- nginx 线上 H5 站点为 `sites-enabled/` 手写 conf，生成器写 `env-sites/`；2026-11-24 迁移中 7 个 test 项目 conf 的 dev/test 网关错配待修。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "本地部署看板",
  "name": "deploy-env",
  "source_extraction_id": "221a47048a6d4a67b869b4aa55189906",
  "version": 1,
  "memory_type": "entities"
}
-->