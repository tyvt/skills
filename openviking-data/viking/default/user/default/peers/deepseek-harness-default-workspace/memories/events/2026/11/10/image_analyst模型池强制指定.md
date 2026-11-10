# Summary
用户于2026-11-10要求所有会话的image_analyst工具强制使用cursor/deepseek-v41-flash-1017，去除hy4free等备用模型。助手修改langgraph-orchestrator项目的config.yaml，将image_analyst模型池改为仅cursor/deepseek-v41-flash-1017，并经op=list与实跑验证（返回头model=cursor/deepseek-v41-flash-1017）确认全局生效。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: image_analyst强制所有会话都是用cursor/deepseek-v41-flash-1017
...
**assistant [peer=deepseek-harness-default-workspace]**: 找到了。把 `image_analyst` 的模型池改成只有 `cursor/deepseek-v41-flash-1017`（去掉 hy4free 等，这也符合历史记忆里 hy4free 视觉稳定 502 的结论）。
**assistant [peer=deepseek-harness-default-workspace]**: 验证：跑 `op=list` 确认 image_analyst 池只剩该模型。
**assistant [peer=deepseek-harness-default-workspace]**: 已生效，`image_analyst` 池现在只有 `cursor/deepseek-v41-flash-1017`。

实跑一次验证链路，用一张本地图片测 `image_analyst`：

<!-- MEMORY_FIELDS
{
  "event_name": "image_analyst模型池强制指定",
  "goal": "强制image_analyst单模型",
  "summary": "用户于2026-11-10要求所有会话的image_analyst工具强制使用cursor/deepseek-v41-flash-1017，去除hy4free等备用模型。助手修改langgraph-orchestrator项目的config.yaml，将image_analyst模型池改为仅cursor/deepseek-v41-flash-1017，并经op=list与实跑验证（返回头model=cursor/deepseek-v41-flash-1017）确认全局生效。",
  "ranges": "0,13-17",
  "source_extraction_id": "6ee4809ca7674e2badc2feb6bc3b17a3",
  "version": 1,
  "memory_type": "events"
}
-->