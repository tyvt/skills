# Summary
2026-11-24 用户选择本地部署 dist 后验证；随后用 upsert_env.py 为苏住房G注册 local 环境（端口 8165，dist_root 指向父仓根 dist），生成 苏住房G-local.conf 并由 sync.ps1 reload，nginx -t 通过、8165 端口返回 200。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 用户选择本地部署 dist 后验证。加载 web-deploy skill 按规范部署（本地交付：构建已完成，用本地 nginx UI 部署 dist）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 先确认 dist 已生成并查看本地 nginx 部署方式（部署面板/看板机制）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: dist 不在预期路径。查构建输出目录与本地部署看板状态。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: dist 在父仓根 `D:\repository\苏住房G\dist`（vite.config 的 rootDir 指向父仓）。本地无 nginx 监听（8090-8200 无进程）。按 web-deploy 规则不启动 dev server，用 nginx UI 部署。但当前 node 在父仓根，dist 是 test 模式构建产物（env:test? 实际 version.json 显示 env:production）。

先看部署面板看板机制——是否有本地 nginx UI 可用。查 deploy-env 目录是否有看板启动脚本和 nginx 配置。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 看板目录存在但无 nginx 配置片段（env-sites 可能空），且当前无 nginx 进程。查看 dashboard 是否有启动脚本，以及是否有 nginx 可执行文件位置。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: nginx 在 D:\nginx。看 dashboard/api.py 是否有部署站点生成的 API，以及看板是否在跑。我需要按部署面板规则注册"苏住房G"项目+环境，然后生成站点配置部署 dist。

先看 dashboard 是否在运行、端口，以及 api.py 的部署接口。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 看板服务在 pythonw pid=20316 port=18098（可能是 dashboard）。确认 `/api/state` 可访问。按规则部署前先注册项目+环境（query 查不到，需 upsert）。先看现有 nginx.conf 的 include 结构和一个站点 conf 样例。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 看板正常 `/api/state` 可用。按部署面板规则：先注册"苏住房G"项目+local环境（端口需唯一）。看现有端口占用，找一个空闲且符合规则的端口。苏住房G此前未注册，需分配 port_base。查所有已用端口段。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 端口段 8163+ 空闲。苏住房G 新建 local 环境用 port_base=8165, port=8165。先看 upsert_env.py 用法和看板 upsert API 参数格式。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 有 CLI `upsert_env.py` 可直接注册。注册苏住房G local 环境：port=8165, dist_root=父仓 dist, backend_gateway 用 .env 的测试网关。先注册项目与环境。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 注册成功。现在生成 nginx 站点片段并 reload。用 gen_nginx_sites.ps1（规则要求部署必经面板，脚本由注册表生成 conf）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 站点 conf 生成为 `苏住房G-local.conf`（按 display_name）。读取它并检查 nginx.conf 的 include 是否覆盖 env-sites 目录。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: nginx.conf 已 include `env-sites/*.conf`，sync.ps1 会收敛配置+nginx -t+reload。运行 sync.ps1 完成部署。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: sync.ps1 在某处报错（可能首次运行缺前置状态）。看它在哪一步失败、nginx 是否已 reload。直接检查 8165 端口是否监听、conf 是否已放置到 sites-enabled。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 8165 已被 nginx 监听（sync 已 reload 成功，报错只是脚本后置统计逻辑）。nginx -t 报错是因当前 cwd 不对（它找相对 conf）。用 -p 指定 prefix 重测，并直接探活 8165。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 站点部署成功（nginx -t OK，8165 返回 200）。现在用 agent-browser 实机打开验证。加载 agent-browser skill。

<!-- MEMORY_FIELDS
{
  "event_name": "苏住房G本地环境注册与站点部署",
  "goal": "搭建本地验证站点",
  "summary": "2026-11-24 用户选择本地部署 dist 后验证；随后用 upsert_env.py 为苏住房G注册 local 环境（端口 8165，dist_root 指向父仓根 dist），生成 苏住房G-local.conf 并由 sync.ps1 reload，nginx -t 通过、8165 端口返回 200。",
  "ranges": "114-145",
  "source_extraction_id": "1a0e7b46db974b45bfcadd1f5fbc4962",
  "version": 1,
  "memory_type": "events"
}
-->