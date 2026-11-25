# deploy-env 提交与清理记录
deploy-env 相关 Git 提交和项目清理决策，保留可追溯的提交号、文件范围与已推状态。

## Git 提交
- 51d1152d「部署注册表看板与 nginx 冲突收敛」34 文件 +1238/−1（提交时未推送），入库看板/迁移收录脚本/sync/selftest/SKILL.md/.gitignore/registry.sqlite，10 个 env-sites conf 记为 rename 到 sites-archive/ 并纳入 16 个冲突归档片段，secret_ref 仅引用、.token/*.bak/__pycache__ 未入库。
- 9f2150bc「看板静默自启与五环境视图」4 文件、d72eab21（构建时间上移、8 行 env 纠偏、持仓面板移除）4 文件、d55ae787（AGENTS.md P0 段、upsert_env.py、api.py 端点、SKILL.md 两节）4 文件、c065a3c7「移除 fdc-v3 8098 合并残留，9002 网关归位 uat(客测)」均已推 origin/main 且本地与远端一致。

## 清理与决策
- 持仓面板项目已不存在：从 env_registry/projects/deploy_events/env_accounts 四表清除，删 sites-archive/持仓面板-local.conf 与 migrate_projects.py:26 登记项，仅保留 selftest_dashboard.py 路径测试夹具。
- 已停 python api.py 释放 18098，清理 .bak/$env:TEMP 截图/__pycache__；~/.dsh/AGENTS.md 实际在 git 仓内（dsh/AGENTS.md）。
- 曾提出 WASM CDN 纯前端查 sqlite，因探活与磁盘扫描需求最终保留后端。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "提交记录",
  "name": "deploy_env_commits",
  "source_extraction_id": "c22a6b38e8e84968b7382f215bcb18d7",
  "version": 1,
  "memory_type": "entities"
}
-->