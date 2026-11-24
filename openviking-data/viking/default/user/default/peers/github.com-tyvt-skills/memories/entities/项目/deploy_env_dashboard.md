# deploy-env 部署看板与收敛器
skills 仓 deploy-env 目录下的本地 nginx 前端部署注册表，2026-11-24 由 github.com-tyvt-skills 升级为「部署看板 + 收敛器」，是站点与代理地址的单一事实来源。

## 组成与运行
- dashboard/api.py（约 355 行）提供 /api/state：SQLite 查询、nginx conf 磁盘扫描、HTTP/TCP 并行探活、ov_privacy 密码注入；index.html 渲染环境卡片（CRLF 行尾），另有 SKILL.md 与 install-autostart.ps1。
- 端口 18098（原定 8098/8099 被 legacy 站点占用，苏州市房地产监测V3 占 8098），地址 http://127.0.0.1:18098/；ROOT 须以仓库根为基准（误取自身目录会指向空库），预热约 6 秒。
- 计划任务 deploy-env-dashboard 登录触发、以 pythonw 静默自启（无控制台、显式工作目录）。
- 2026-11-24 取消「未收录」区块与后端 orphans 扫描（部署即收录、损坏人工删记录，保留探活），并移除 nginx UI 仅作静态服务。
- registry.sqlite 已入库并受 git 跟踪（运行时 last_health_at 回写还原不提交）；迁移新增 3 列与 events 事件流水表、迁移前留备份；sync.ps1 片段命名 `<project>-<env>.conf`，模板仅 portal、fdc。

## 环境模型与网关
- 每项目固定 5 槽位：本地、公司开发、公司测试、客户测试、生产，端口按 port_base+0..4 分配并各自代理不同网关；注册站点 10→26 个，env 取 local/dev/test/uat/prod，sites-enabled 30 个文件均为真实活站点、占 8090-8104。
- 网关归类：dev.zhi.com 结尾为公司开发，test.zhi.com 为公司测试，本地须 localhost 或 127.0.0.x；据此批量修正 8 行 env（园区公共收益→dev；太仓一网通办H5、无锡市区G、无锡市区小程序嵌入H5、江阴公共收益、泰兴G、淮安物管、防汛C端→test），portal/fdc-v3 五槽模板与 192.168/公网网关行未动。
- fdc-v3 严格 5 槽 8100/8101/8102/8103/8104：合并残留行 local-8098（8098）已删除，客测网关 http://58.210.252.230:9002 归位 uat（8103）；迁移脚本仅重映射已存在的 id=24，不会重建 8098。

## 看板渲染与收敛
- 项目名取工作区目录名：dist 结尾取父目录（D:\repository\太仓G\dist → 太仓G），否则取自身，空 dist 回退 conf 名；曾误取为「分析产出」「repository」。
- 排序按 dist 构建时间倒序（updated_at 均为收录同一时刻不可用）；dist 与构建时间都放在项目分组标题层（空值回退 `-`）；排版卡片网格 280px、长路径省略号 + 悬浮 title、表格固定列宽无溢出，多卡片行省略号截断属预期。
- 20 秒内存缓存 + 后台刷新线程，/api/state 即时返回，?refresh=1 强制刷新（会触发后端慢探活）；selftest 由 4 例扩至 7 例（显示名/回退/刷新端点）7/7 PASS，并用 agent-browser 截图复核命名、排版与槽位归类。
- 探活由串行改并行（26 站点串行最坏约 100 秒会让 /api/state 超时）；/api/state 返回 200 时含 26 站点、9 个未收录 conf、20 条事件。
- 收敛安全：nginx -t 失败自动还原备份并 exit 1，nginx 调用需显式 -p 前缀；退化检测仅「此前通、sync 后不通」算失败，deployed=0 跳过 reload；include 须锚点插入 sites-enabled include 之后（http 上下文内）、禁止追加文件末尾；与注册表端口冲突的片段归档待人工、不自动覆盖；listen 按行首解析，fixture 用真实 conf 换行且不占运行端口；SYNC_OK 为 1 个片段部署 + 25 个因 legacy 端口冲突归档、reload 后存量站点探活全 200，负向测试确认还原备份/不 reload/exit 1。

## 写回与提交
- upsert_env.py：5 环境白名单、端口全局唯一、单事务写锁 + SELECT/UPDATE 幂等、拒明文密码、DB 路径可注入；api.py:277 的 POST /api/registry/upsert 复用本机 + token 鉴权并与 CLI 共用写回函数；SKILL.md:33 补「复现查询流程」「验证后回写/会话纠错」两节；密码链路 privacy_upsert→secret_ref→secrets/inject；新端点需重启 deploy-env-dashboard 才生效（自启进程曾跑旧代码）。
- 验证全绿：编译 PASS、新增/幂等不重行、非法 env 拒绝、端口冲突拒绝、明文拒绝、API 无 token=403 有 token=200 且落库正确；selftest.py PASS 2/2，selftest_dashboard.py 有 2 个预存 FAIL（state-no-plaintext、accounts-rendered）。
- 测试抓到两处缺陷：--role 被 argparse 前缀匹配吞成 --role-label（账号未入库）、env_registry.project 为 NOT NULL 未给默认；修复后全部通过。
- 提交：51d1152d「部署注册表看板与 nginx 冲突收敛」34 文件 +1238/−1（提交时未推送），入库看板/迁移收录脚本/sync/selftest/SKILL.md/.gitignore/registry.sqlite，10 个 env-sites conf 记为 rename 到 sites-archive/ 并纳入 16 个冲突归档片段，secret_ref 仅引用、.token/*.bak/__pycache__ 未入库；9f2150bc「看板静默自启与五环境视图」4 文件、d72eab21（构建时间上移、8 行 env 纠偏、持仓面板移除）4 文件、d55ae787（AGENTS.md P0 段、upsert_env.py、api.py 端点、SKILL.md 两节）4 文件、c065a3c7「移除 fdc-v3 8098 合并残留，9002 网关归位 uat(客测)」均已推 origin/main 且本地与远端一致。
- 持仓面板项目已不存在：从 env_registry/projects/deploy_events/env_accounts 四表清除，删 sites-archive/持仓面板-local.conf 与 migrate_projects.py:26 登记项，仅保留 selftest_dashboard.py 路径测试夹具；已停 python api.py 释放 18098，清理 .bak/$env:TEMP 截图/__pycache__；~/.dsh/AGENTS.md 实际在 git 仓内（dsh/AGENTS.md）；曾提出 WASM CDN 纯前端查 sqlite，因探活与磁盘扫描需求最终保留后端。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "b9188677ec4241fd8365f5bfb5524f8e",
  "peer_id": "github.com-tyvt-skills",
  "version": 7,
  "memory_type": "entities"
}
-->