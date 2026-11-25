# OpenViking 配置
OpenViking 是本地记忆/检索服务，ov.conf 位于 ~/.openviking/ov.conf，由 github.com-tyvt-skills 维护，启动脚本与看门狗也在该目录下。

## 模型配置
- 2026-11-25 起 vlm 段：主模型 auto/hy4flash-free（免费），credentials 兜底 auto/hy4flash（积分版），免费额度不足时由原生 credentials failover 自动切换。
- 2026-11-25 起 query_planner 段：同 vlm，主 auto/hy4flash-free、兜底 auto/hy4flash；此前 vlm=workbuddy/deepseek-v4.1-flash、query_planner=auto/deepseek-v4.1-flash。
- embedding 为本地 ollama/bge-m3-ov，非 deepseek；全量仅上述两处 LLM 调用曾用 deepseek-v4.1-flash。
- VLMConfig 支持 credentials 有序 failover（index 0 优先）与 failback，VLMCredential.model 可覆盖指向不同模型，故可在配置层实现"免费主 + 积分兜底"。
- vlm 曾绑定 auto/hy3 的说法已过时（STALE），以实时 ov.conf 为准。

## 运维与仓库
- 实际 server 为 python.exe（监听 1933、加载 ov.conf），可用 start-ovserver-hidden.vbs 无窗口拉起；看门狗在掉线且 health 失败时拉起，有 cooldown。
- ~/.openviking 是 git 仓（master），但从未配置 remote，无法 push；仓库内约 254 个预存脏文件为记忆数据，非配置改动。
- 改动前备份 ov.conf.bak-20261125-hy4flash；2026-11-25 本地提交 da4bf09（仅 ov.conf，未碰脏文件），用户选择暂不推送，本地 ahead 1。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "openviking_config",
  "source_extraction_id": "9034f4386f4e4087a78ab07938116721",
  "version": 1,
  "memory_type": "entities"
}
-->