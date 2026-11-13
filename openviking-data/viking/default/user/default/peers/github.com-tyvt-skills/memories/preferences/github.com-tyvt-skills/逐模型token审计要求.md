- 要求 token 审计输出每个实际参与模型（含 orchestrate 子模型）的输入/输出/缓存命中 token 清单，而非仅整会话合计或单一末次模型（modelSelection.lastUsed）。
- 期望所有对话（全部会话）都具备上述逐模型 token 清单。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "逐模型token审计要求",
  "source_extraction_id": "ae76bd46a6014816b3c48c3262f07956",
  "version": 1,
  "memory_type": "preferences"
}
-->