# deploy-env 部署看板
skills 仓 deploy-env 目录下的本地 nginx 前端部署看板，2026-11-24 由 github.com-tyvt-skills 升级为部署看板与收敛器的一部分，是站点与代理地址的单一事实来源之一。

## 运行与入口
- dashboard/api.py（约 355 行）提供 /api/state：SQLite 查询、nginx conf 磁盘扫描、HTTP/TCP 并行探活、ov_privacy 密码注入；index.html 渲染环境卡片（CRLF 行尾），另有 SKILL.md 与 install-autostart.ps1。
- 端口 18098（原 8098/8099 被 legacy 站点占用，苏州市房地产监测V3 占 8098），地址 http://127.0.0.1:18098/；ROOT 须以仓库根为基准（误取自身目录会指向空库），预热约 6 秒。
- 计划任务 deploy-env-dashboard 登录触发、以 pythonw 静默自启（无控制台、显式工作目录）；2026-11-24 取消「未收录」区块与后端 orphans 扫描（部署即收录、损坏人工删记录、保留探活），并移除 nginx UI 仅作静态服务。
- 20 秒内存缓存 + 后台刷新线程，/api/state 即时返回，?refresh=1 强制刷新（会触发后端慢探活）；旧界面可刷新等待缓存或重启看板进程。
- 探活由串行改并行（26 站点串行最坏约 100 秒会让 /api/state 超时）；当时 /api/state 返回 200 含 26 站点、9 个未收录 conf、20 条事件。

## 渲染与自测
- 项目名取工作区目录名：dist 结尾取父目录（D:\repository\太仓G\dist → 太仓G），否则取自身，空 dist 回退 conf 名；曾误取为「分析产出」「repository」。
- 排序按 dist 构建时间倒序（updated_at 均为收录同一时刻不可用）；dist 与构建时间都放在项目分组标题层（空值回退 `-`）；卡片网格 280px、长路径省略号 + 悬浮 title、表格固定列宽无溢出，多卡片行省略号截断属预期。
- selftest 由 4 例扩至 7 例（显示名/回退/刷新端点）7/7 PASS，并用 agent-browser 截图复核命名、排版与槽位归类。
- 2026-11-25 新增 conf-path-env-sites 用例；用户要求修复缺 conf 后自测 `python deploy-env/selftest_dashboard.py` PASS。

## conf 定位与当前状态
- 2026-11-25 根因：看板在 sites-enabled 找 `{项目}.conf`，而多环境片段在 `D:\nginx\conf\env-sites\{项目}-{环境}.conf`（api.py:64-72）；`project_key`（如 `suzhufang-g`）与片段文件名中文项目名不一致也会误判缺 conf。
- 已改 dashboard/api.py 的 `conf_path_for`：优先 env-sites，按 `display_name` / `project` / `project_key` 与 listen 端口回退匹配。
- 2026-11-25 注册表清理后当前 `build_state` 下 16 条均为 `nginx 命中（ok）`；如 nginx 片段需与注册表完全对齐，可运行 deploy-env/sync.ps1 或 gen_nginx_sites.ps1，本会话未执行。


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "c22a6b38e8e84968b7382f215bcb18d7",
  "peer_id": "github.com-tyvt-skills",
  "version": 8,
  "memory_type": "entities"
}
-->