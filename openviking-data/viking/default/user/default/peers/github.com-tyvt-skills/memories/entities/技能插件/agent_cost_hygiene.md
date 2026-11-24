# agent_cost_hygiene
Skills 仓库中存在目录但未链接到 ~/.dsh/skills 的 DSH skill，实际不生效。

## 定位与状态
- 官方描述覆盖读文件策略、截断即换、构建顺序、收口时机、vision 去重、环境预检
- 未链接到 ~/.dsh/skills，属被拆分后遗留的旧壳，本会话无法加载

## 重叠关系
- 功能已被 token-frugal（工作流归因）、tool-call-hygiene（错误自愈）、dsh-token-policy（构建/收尾时机）、token-guard（结果裁剪）覆盖
- 在 2026-11-24 的重叠分析中被判为唯一真正可清理的组件，已于当日 09:13 +0800 由 commit 8872b3b4 删除（2026-11-24 复核：磁盘/git 均无）；功能由 token-frugal / tool-call-hygiene / dsh-token-policy / token-guard 覆盖

## 相关
- 同批未链接 skill：concise-report、cursor-model-routing、dsh-explore、memory-migration-archive、openviking-autostart、session-handoff、vite-build-profiler

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技能插件",
  "name": "agent_cost_hygiene",
  "source_extraction_id": "f606424bb52a4330b267945b793d7552",
  "version": 1,
  "memory_type": "entities"
}
-->