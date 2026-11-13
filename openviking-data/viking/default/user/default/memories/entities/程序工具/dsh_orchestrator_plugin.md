# dsh orchestrator 插件
dsh（DeepSeek Harness）的编排插件，提供 callPython 能力并管理 Python 调用的超时、停滞与预警。
## 配置项
- stallMs：硬停滞超时，由 45000 改为 120000，解锁 plan_review 静默推理误杀
- timeoutMs：调用硬超时；warnCapMs：预警阈值，默认 240000（P90 依据），设为 0 可禁用
## 拒绝与预警标记
- 超时 reject 前置 `[orchestrate/timeout] elapsed=Ns op=...`，停滞 reject 前置 `[orchestrate/stall]`
- callPython 透传 payload.op（`const op = payload?.op || 'full'`），原消息主体保留
- warnCapMs 到点只打 `[orchestrate/warn] elapsed=Ns op=...`，不终止调用、不改返回
## 已知问题
- plan_review 机器审核通道在 dsh 环境不可用：reviewer 的 Flash 模型（网关仅有 Flash 级）返回空（model:null, ok:false）
## 验证与归属
- 假 bridge 超时实测 `[orchestrate/timeout]`、warnCapMs=500 实测 `[orchestrate/warn]` 均通过
- 涉及文件：orchestrator/lib/index.js、orchestrator/lib/config.js、orchestrator/cordis.patch.yml
- 所属项目：dsh；来源会话：2026-11-12

<!-- MEMORY_FIELDS
{
  "category": "程序工具",
  "name": "dsh_orchestrator_plugin",
  "source_extraction_id": "c34ec82b95544a2b95ac7d8de15df2b3",
  "version": 1,
  "memory_type": "entities"
}
-->