# Summary
将 planner 主选模型由网关不存在的 openrouter/tencent/hy3-preview:free 改为 workbuddy/hy3；原配置导致每次规划瞬间失败并回退到最贵的 cursor/grok-4.7@256k（17次调用41283tokens），改后实测 plan via workbuddy/hy3 生效 (2026-11-12)。
# 2026-11-12 (Thursday) ChatLog:
**user**: 2026-11-12 模型池配置优化：1) planner 主选 openrouter/tencent/hy3-preview:free 在 magpie 网关(127.0.0.1:3425)根本不存在，导致每次规划瞬间失败回退到最贵的 cursor/grok-4.7@256k(17次调用41283tokens)；改为 workbuddy/hy3(网关真实存在)后轨迹实测 plan via workbuddy/hy3 生效。2) image_analyst 单点 cursor/deepseek-v41-flash-1017，追加 auto/deepseek-v4.1-flash 兜底(推翻2026-11-10的不留备用设定)。3) code_editor 原池全是flash/light无强模型，主选改为 cursor/composer-2.5(网关唯一非flash强代码模型)，后接glm-5.3-flash/deepseek-v4.1-flash。另：workbuddy-ai/hy3 与 free hy3 在56条真实调用里均0次，hy3 12%命中率告警在本编排器不成立；真正成本大户是grok规划。config.yaml备份 .bak-20261112-modelpool。配置改动无需重启Web(Python子进程每次读config.yaml)。

<!-- MEMORY_FIELDS
{
  "event_name": "planner主模型更换",
  "goal": "修复规划模型回退",
  "summary": "将 planner 主选模型由网关不存在的 openrouter/tencent/hy3-preview:free 改为 workbuddy/hy3；原配置导致每次规划瞬间失败并回退到最贵的 cursor/grok-4.7@256k（17次调用41283tokens），改后实测 plan via workbuddy/hy3 生效 (2026-11-12)。",
  "ranges": "0-3",
  "source_extraction_id": "cf3093cc10fb43a6aaf641367c48477d",
  "version": 1,
  "memory_type": "events"
}
-->