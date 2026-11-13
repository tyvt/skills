# planner execute 工具
dsh/langgraph-orchestrator 编排中的 execute 工具，在 graph execute 阶段负责产出作答与规划内容。

## 角色与定位
- 在 LangGraph 多模型编排中作为 execute 工具承担实际作答职责
- 曾误判为"占 graph execute 50.6% = 分流失效总根源"，后经二分拆分推翻该定性

## 输出特征
- execute 中 median completion 2313 tokens、max 8192（n=37）
- 输出量约为 file_reader（116）的 20 倍，高于 code_editor（1530）与 plan_reviewer（2206）
- 51% 的 planner 执行输出 ≥2k tokens，属长篇作答而非寒暄

## 二分拆分结论
- 28/43（65%）为 prompt_tokens<400 的纯模型知识作答，本来不需要工具，属合理
- 15/43（35%）带上下文但规划器仍自答，属真失效候选，仅占 graph execute 的 17.6%

## 后续归因课题
- 对 15 条真失效候选需做 2×2 归因（本该走工具/本来不需工具 × 答题合格/不合格）
- 判别维度：偏好问题（该转交却自答→修 PLANNER_SYSTEM）vs 质量问题（转交无用→评估工具选择影响）

<!-- MEMORY_FIELDS
{
  "category": "技术架构",
  "name": "planner_execute_tool",
  "source_extraction_id": "8d82e959132c4b4c9c268a96335b9804",
  "version": 1,
  "memory_type": "entities"
}
-->