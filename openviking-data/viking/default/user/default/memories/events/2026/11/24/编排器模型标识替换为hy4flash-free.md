# Summary
2026-11-24 用户要求把编排器（dsh/langgraph-orchestrator）中所有 deepseek-v4.1-flash 模型移除并改为 hy4flash-free 变体；实施为 config.yaml 中 15 处模型 id 全量替换（workbuddy/deepseek-v4.1-flash → workbuddy/hy4flash-free，auto/deepseek-v4.1-flash → auto/hy4flash-free）。用户明确选择 free 变体以保持通道前缀与免费定位；网关实测注册有 auto/hy4flash-free、workbuddy/hy4flash-free、workbuddy/hy4flash（非 free）、workbuddy-ai/hy4flash-free，无 auto/hy4flash 非 free 变体。router.py 的 DEEPSEEK_FLASH 峰时跳过策略因 id 不再命中而自动 no-op，未改代码；config 每次调用按请求加载，无需重启 Web。此前记忆中的「主控模型池首选 workbuddy/deepseek-v4.1-flash」「planner 池首 deepseek」等已过期。
# 2026-11-24 (Tuesday) ChatLog:
**user**: 2026-11-24 将编排器（dsh/langgraph-orchestrator）里所有 deepseek-v4.1-flash 模型移除，改为 hy4 flash（hy4flash-free 变体）。请记录这一配置变更，供后续会话参考。
**assistant**: 2026-11-24 实施：编排器 config.yaml 中 15 处 deepseek 模型 id 全量替换——workbuddy/deepseek-v4.1-flash → workbuddy/hy4flash-free，auto/deepseek-v4.1-flash → auto/hy4flash-free。用户明确选择 free 变体（保持通道前缀与免费定位）。网关实测注册有 auto/hy4flash-free、workbuddy/hy4flash-free、workbuddy/hy4flash(非free)、workbuddy-ai/hy4flash-free，无 auto/hy4flash 非free 变体。config 按请求加载（api.py run_tool 内 load_config），无需重启 Web。router.py 的 DEEPSEEK_FLASH 峰时跳过策略因 id 不再命中而自动 no-op，未改代码。...

<!-- MEMORY_FIELDS
{
  "event_name": "编排器模型标识替换为hy4flash-free",
  "goal": "统一编排器免费模型通道",
  "summary": "2026-11-24 用户要求把编排器（dsh/langgraph-orchestrator）中所有 deepseek-v4.1-flash 模型移除并改为 hy4flash-free 变体；实施为 config.yaml 中 15 处模型 id 全量替换（workbuddy/deepseek-v4.1-flash → workbuddy/hy4flash-free，auto/deepseek-v4.1-flash → auto/hy4flash-free）。用户明确选择 free 变体以保持通道前缀与免费定位；网关实测注册有 auto/hy4flash-free、workbuddy/hy4flash-free、workbuddy/hy4flash（非 free）、workbuddy-ai/hy4flash-free，无 auto/hy4flash 非 free 变体。router.py 的 DEEPSEEK_FLASH 峰时跳过策略因 id 不再命中而自动 no-op，未改代码；config 每次调用按请求加载，无需重启 Web。此前记忆中的「主控模型池首选 workbuddy/deepseek-v4.1-flash」「planner 池首 deepseek」等已过期。",
  "ranges": "0-3",
  "source_extraction_id": "266e30ba55914128804a7266270dd40f",
  "version": 1,
  "memory_type": "events"
}
-->