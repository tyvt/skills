# agent-cost-hygiene
已被删除的旧 skill 空壳，内容与 token-frugal、tool-call-hygiene、dsh-token-policy、token-guard 大面积重叠。

## 描述
- 曾覆盖读文件策略、截断即换、构建顺序、收口时机、vision 去重、环境预检。
- 未链接到 ~/.dsh/skills，实际不生效，属拆分后遗留的旧壳。

## 删除状态
- 已在 HEAD 提交 8872b3b4 中删除，删除时间 2026-11-24 09:13:06 +0800。
- 2026-11-24 核实：磁盘与 git 均无该目录，仅有过期记忆事件仍引用。
- 曾在提交 21766e33 中存在，后从仓库移除。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术工具",
  "name": "agent_cost_hygiene",
  "source_extraction_id": "17096213d6dc41d9bc2f2738dac17f1d",
  "version": 1,
  "memory_type": "entities"
}
-->