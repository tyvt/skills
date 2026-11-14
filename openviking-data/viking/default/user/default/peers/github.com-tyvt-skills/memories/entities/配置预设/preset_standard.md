# preset-standard
DSH 编排器的标准预设，2026-11-14 经工具裁剪后精简到 39 个工具，作为日常默认工作预设。

## Description
- 定义在 `~/.dsh/profiles/web/cordis.patch.yml`，插件为 `@deepseek-ai/dsh-agent-preset`，`config.id` 为 `standard`，order=1，共 22 个插件。
- 与 ptc(2)、minimal(3)、cordis(4)、full-tools(5) 并列为 5 个可选预设。

## 裁剪与验证
- 断言 A：新会话 schedule=0、goal=0，7 个目标工具消失。
- 断言 B：移除 7 工具后为 39 工具 / 8,025 token，省 1,275 token/步；B'：session_search/workflow/team_task/spawn 全在、多删=0；E：pwsh/read/edit/grep/glob 全在。
- `command-goal` 仍挂在预设内（dump L1043）且未 disabled，`/goal` 命令实测返回正常状态（command/done success），命令入口不依赖 tool-goal 工具。

## 结构要点
- 模型可见的 `workflow` 工具来自预设内的 `tool-workflow`（ind=10），顶层 L650 的同名副本已被 web-app 置 disabled: true，故关闭 workflow 须在预设内加 `disabled`。
- 批 1 教训：preset 内对 top-level 插件的 `disabled` 不一定生效，改动前须先核验落点。
- 批 2 拟在该预设内关 `tool-workflow`（848 token/步）。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "配置预设",
  "name": "preset_standard",
  "source_extraction_id": "ef1f782d96f343b6b5a540a2d8167db7",
  "version": 1,
  "memory_type": "entities"
}
-->