# Summary
用户决定先对 workbuddy 系模型做全量实测（35题），cursor 系暂缓。助手据此对6个未测 workbuddy 模型（hy4free、glm-5.2、kimi-k3.1-pro、kimi-k2.8-preview、step-5-preview、mimo-v2.6-pro）启动全量评测。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 先测workbuddy全量，cursor暂缓
**assistant [peer=github.com-tyvt-skills]**: 明白：**workbuddy 全量实测，cursor 暂缓**。

workbuddy 系共 14 个（含 workbuddy-ai/hy3）。已测过全量的 3 个（deepseek-v4.1-flash / glm-5.3-flash / hy3），已快筛的 4 个（v4-pro / space-bunny / glm-5.3 / minimax）。剩未测：**hy4free / glm-5.2 / kimi-k3.1-pro / kimi-k2.8-preview / step-5-preview / mimo-v2.6-pro**（6 个）。

"全量"= 跑完整 35 题。我用现有 run-bench 全量套件跑这些 workbuddy 未测模型最规范（结果落 bench-full.json，scorer 可算）。但 run-bench 的 full 套件从 screen 通过者取模型，且 CANDIDATES 固定。我改用一个独立全量脚本跑这 6 个未测 workbuddy 模型 × 35 题，并发+日志+成本控制，结果单独存，不污染主 bench-full。

先建 todo 并写全量脚本。

<!-- MEMORY_FIELDS
{
  "event_name": "workbuddy优先全量评测决定",
  "goal": "确定评测范围",
  "summary": "用户决定先对 workbuddy 系模型做全量实测（35题），cursor 系暂缓。助手据此对6个未测 workbuddy 模型（hy4free、glm-5.2、kimi-k3.1-pro、kimi-k2.8-preview、step-5-preview、mimo-v2.6-pro）启动全量评测。",
  "ranges": "0-1",
  "source_extraction_id": "2eb52604871c41f0ad5bf857ccd3a747",
  "version": 1,
  "memory_type": "events"
}
-->