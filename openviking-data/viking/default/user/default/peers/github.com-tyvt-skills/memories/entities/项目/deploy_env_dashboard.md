# deploy-env 部署看板
skills 仓 deploy-env 目录下的本地 nginx 前端部署看板，也是 github.com-tyvt-skills 维护的内部部署环境管理看板与凭据库，2026-11-24 升级为部署看板与收敛器的一部分，是站点与代理地址的单一事实来源之一，提供五环境槽位视图。

## 运行与入口
- dashboard/api.py（约 355 行）提供 /api/state：SQLite 查询、nginx conf 扫描、HTTP/TCP 并行探活、ov_privacy 密码注入；index.html 渲染环境卡片（CRLF 行尾），另有 SKILL.md 与 install-autostart.ps1。
- 端口 18098（原 8098/8099 被 legacy 占用，苏州市房地产监测V3 占 8098），地址 http://127.0.0.1:18098/；ROOT 须以仓库根为基准（误取自身目录会指向空库），预热约 6 秒。
- 计划任务 deploy-env-dashboard 登录触发、pythonw 静默自启（无控制台、显式工作目录）；2026-11-24 取消「未收录」区块与后端 orphans 扫描（部署即收录、损坏人工删记录、保留探活），移除 nginx UI 仅作静态服务。
- 20 秒内存缓存 + 后台刷新线程，/api/state 即时返回，?refresh=1 强制刷新（触发慢探活）；探活由串行改并行（26 站点串行最坏约 100 秒会超时），当时 /api/state 返回 200，含 26 站点、9 个未收录 conf、20 条事件。
- 注册表 34 个环境，registry.sqlite 受 git 跟踪；2026-11-25 清理后 build_state 下 16 条均为 nginx 命中（ok）；如需完全对齐可运行 sync.ps1 或 gen_nginx_sites.ps1（本会话未执行）。

## 凭据与账号
- 密码丢失根因：api.py 从内存 _SECRET_CACHE reveal，进程重启即清空导致账号密码「都没了」；根因行号已核实（137/139 含脱敏掩码）；隐私库盘点 8 个 target、已解析 4 条明文。
- 两表新增 password_plain 明文列；10 行斜杠式错配引用改为 canonical viking 格式；连字符键与斜杠式 secret_ref 错配涉及 pwd-county/-fangxun/-super。
- 2026-11-24 按历史补凭据：23 条账号写入 env_accounts（0→23），3 种密码以共享隐私项保存、secret_ref 占位符引用（路径 deploy_env/<key>/<env>/<role>/password）；看板显示 12 个环境账号（掩码）。
- 历史账号线索：fdc-v3 管理端与区县测试、防汛C端测试、苏住房/产品2.0（zhi2-web-admin）管理端与企业端；portal 为短信登录（手机号+身份证后四位+短信码）无传统账密；补历史账号 5 个（管理员 2、业务测试 2、fdc-v3 local 1）。
- privacy 库 deploy_env-pwd-county/-fangxun/-super 可解明文；密码经隐私库解析后注入看板内存供 reveal，明文仅在内存/环境变量流转、不落盘，agent-browser 截图确认 12 环境可见。

## 渲染与自测
- 项目名取工作区目录名：dist 结尾取父目录（D:\repository\太仓G\dist → 太仓G），否则取自身，空 dist 回退 conf 名；曾误取「分析产出」「repository」。
- 排序按 dist 构建时间倒序（updated_at 均为收录同一时刻不可用）；dist 与构建时间放项目分组标题层（空值回退 `-`）；卡片网格 280px、长路径省略号+悬浮 title、表格固定列宽无溢出。
- selftest 由 4 例扩至 7 例（显示名/回退/刷新端点）7/7 PASS，agent-browser 截图复核命名、排版与槽位归类；2026-11-25 新增 conf-path-env-sites 用例。
- 既存前端 bug：reveal() 用 btn.nextElementSibling 承载明文，但「显示」按钮是 <td> 最后一个元素、无 nextElementSibling，点击不显示密码（JS 抛错）；与数据补充无关，API reveal 已验证正确。
- 2026-11-25 根因：看板在 sites-enabled 找 {项目}.conf，多环境片段在 D:\nginx\conf\env-sites\{项目}-{环境}.conf；project_key（如 suzhufang-g）与中文项目名不一致也误判缺 conf；已改 conf_path_for 优先 env-sites 并按 display_name/project/project_key 与 listen 端口回退匹配。

## 当前状态与交接
- 2026-11-25 目标：看板展示全部历史账号+密码、密码明文持久化在数据库，selftest 与 agent-browser 实机验证通过后由用户确认；用户决定去掉「显示」按钮、改为端口内明文直显（密码随 state 返回、前端直接渲染、移除 reveal 按钮与逻辑），涉及前端改动须先走计划门。
- 明文直显计划经 plan_review 审核 PASS（v2，score 78、P0=0），用户确认，frontmatter status: approved；计划文件 session-6d359f6f-91fe-4089-b8f5-5a3f2cf3c99d.md。
- 改造进度：api.py 已加 password 字段，no-store 与 index.html 明文渲染未完成；待办顺序：修错配引用与补解 → 明文入库并改 api.py 展示 → 补历史凭据（管理账号+业务测试账号）→ selftest + agent-browser 验证 → 收尾。
- P0 交接：文档 D:\plan\skills\handoff\chain-20261124-deploy-plainpwd\hop1.md（9 节，第 4 节列 7 项未完成、第 5 节含 chain 元信息）；下一跳 15:57:23 触发 hop2，prompt 只含交接路径、读第 9 节、chain 元信息与四项改造目标。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "363bea0625064692b5f456f96fc875d9",
  "peer_id": "github.com-tyvt-skills",
  "version": 9,
  "memory_type": "entities"
}
-->