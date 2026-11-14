# dsh/AGENTS.md
skills 仓库中的常驻 instructions 规则文件，每次会话由 agent-instructions 插件从文件读取注入。

## 作用
- 承载 agent 的常驻 instructions，仅作为索引入口，不堆叠大量细节
- 位于 D:\repository\skills\dsh\AGENTS.md，仓库根为 D:/repository/skills，分支 main

## 生效机制
- 修改文件即对下一次会话或后续步骤生效，不需要重启 DSH Web
- 需要重启的只有启动时读死的配置：编排器 config.yaml / graph.py、preset 与 plugin 配置装载

## 提交记录
- 2026-11-14 提交 1a34c3d5（main，ahead 5），仅含本文件与 .plan/explore-multimodel-20261114.md
- 提交时未触碰仓库内其他他人/他任务的脏文件，且未推送远程

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "规则文件",
  "name": "agents_md",
  "source_extraction_id": "07c26e4cdd224c2696b48f118c7778d5",
  "version": 1,
  "memory_type": "entities"
}
-->