# dsh 技能目录
DSH skills 仓库当前链接 16 个 skill，dsh 目录下另有 9 个插件，使用高度集中在禅道分析与 Git 交付链上。

## 使用频率（口径：加载过该 skill 的会话数）
- 统计基数为 1099 个存在 skill 记录的会话，取自 session_projcache 投影的 `sessionStats.val.skills` 布尔标记，属累计加载会话数。
- 头部：zentao-analyzer 471、worktree-snapshot 321、submodule-commit 244、agent-browser 234、long-term-memory 208、web-deploy 131。
- 中段：repo-safety 119、captcha-recognizer 97、dsh-token-policy 81、decision-options 41。
- 中低频：openviking-memory 34、clarify-first 33、szfc-page-guard 32、tool-call-hygiene 30、token-frugal 26、token-optimizer 24、deploy-env 20、openviking-rule-search 17、frontend-page-guide 12、tdd 8。

## 零使用与历史遗留
- 零加载记录：office、office-docx、office-pptx、office-xlsx、dsh-schedule-task、openviking-skills、ov-experience-memory、diagnose-windows-sandbox-acl，多为升级后新增技能。
- long-term-memory、szfc-page-guard、frontend-page-guide 有历史使用记录，但不在当前 16 个已链接 skill 中。

## 数据口径限制
- 数据源为 C:\Users\Administrator\.dsh\storages\session_projcache\sessions 下的 3063 个会话投影 JSON。
- 投影文件 mtime 集中在近期，ALL/30 天/7 天三档数值几乎一致，无法切出「最近 N 天」趋势，只能反映整体分布。
- 本次为只读分析，未改动任何文件，临时脚本已清理。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "program",
  "name": "dsh_skill_catalog",
  "source_extraction_id": "4ddeb1b085934b51bff5365817431cec",
  "version": 1,
  "memory_type": "entities"
}
-->