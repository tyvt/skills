- 要求 agent 在排查问题、修复 bug、设计实现方案或给出建议之前，先主动执行 search（mode=context，purpose=coding，detail=abstract）以确认 OpenViking 是否处理过类似问题；默认仅返回标题与摘要，命中则 read 展开细节并优先沿用。
- 仅当确认记忆里没有有用信息（或命中项只是无关摘要）时，才自行排查、思考方案，并将新结论写回记忆。
- 判定"查到有用信息"的标准：搜索默认返回 abstract（标题+摘要），agent 需对潜在相关项 read 展开；read 后条目若为同项目/同文件/同报错语义高度相关且 detail 为 overview/full 才算查到；仅看标题级摘要（abstract）不足以判定，需 read 确认。
- 该行为应为 agent 的默认动作，不必等用户提醒，也不必非要有禅道 ID / bug 号 / 明确模块路径才查。
- 遇到找不到文件（如账单、脚本）或不知道某组件在哪个仓库时，必须优先调用 mcp__openviking__search，禁止盲目用 glob 或 pwsh 遍历目录。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "Agent主动检索记忆偏好",
  "source_extraction_id": "652ce6c1f5da4d959e37b2e4e2d8c060",
  "version": 3,
  "memory_type": "preferences"
}
-->