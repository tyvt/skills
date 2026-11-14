# preset-full-tools
DSH 编排器中新增的完整工具预设，作为 preset-standard 裁剪 schedule/goal 后的工具可达兜底路径。

## Description
- 定义在 `~/.dsh/profiles/web/cordis.patch.yml`，块标识为 `- id: preset-full-tools`，插件为 `@deepseek-ai/dsh-agent-preset`，`config.id` 为 `full-tools`。
- `order` 为 5，与 standard(1)、ptc(2)、minimal(3)、cordis(4) 均不冲突。

## Composition
- 逐条复制 preset-standard 的全部 22 个插件，并保留原有 `disabled`（tool-subagent 系列、tool-plugin-manager、tool-plugin-market 仍禁用）。
- 仅 `tool-schedule` 与 `tool-goal` 不禁用，因此保留完整工具能力。

## Role
- 由 `dsh-agent-preset` 在 `index.js:25` 通过 `ctx.agentPresets.register` 自注册，无需注册表枚举即可被切换。
- 用途：preset-standard 禁用 schedule/goal 后，用户可切到 full-tools 恢复这些工具。
- 2026-11-14 实测：切到该预设的会话 8ac072fd（title 测试会话）toolCount=46，schedule_*=4、goal 工具=3，精确恢复 schedule_create/edit/list/view 与 create_goal/get_goal/update_goal 共 7 个，与 standard 会话 794ca361（39 工具、schedule=0、goal=0）差集为空。
- 预设 roster 共 5 个：standard(1)/ptc(2)/minimal(3)/cordis(4)/full-tools(5)；full-tools 中 tool-schedule 与 tool-goal 均无 disabled（启用）。

<!-- MEMORY_FIELDS
{
  "category": "配置预设",
  "name": "preset_full_tools",
  "source_extraction_id": "ef1f782d96f343b6b5a540a2d8167db7",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->