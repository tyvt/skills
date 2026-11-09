- 要求 agent 在排查问题、修复 bug、设计实现方案或给出建议之前，先主动执行 search（mode=context，purpose=coding）以确认 OpenViking 是否处理过类似问题；命中则 read 展开细节并优先沿用。
- 仅当确认记忆里没有有用信息（或命中项只是无关摘要）时，才自行排查、思考方案，并将新结论写回记忆。
- 判定“查到有用信息”的标准：注入块或搜索结果中存在同项目/同文件/同报错语义高度相关且 detail 为 overview/full 的条目才算查到；仅有标题级摘要（abstract）或无关条目视为未找到。
- 该行为应为 agent 的默认动作，不必等用户提醒，也不必非要有禅道 ID / bug 号 / 明确模块路径才查。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "Agent主动检索记忆偏好",
  "source_extraction_id": "4ada5525be5b4b738c21f776639b2af4",
  "version": 1,
  "memory_type": "preferences"
}
-->