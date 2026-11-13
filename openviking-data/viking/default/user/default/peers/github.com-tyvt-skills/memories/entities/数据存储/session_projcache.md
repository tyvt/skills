
# session_projcache
DSH 的会话统计数据存储，位于 ~/.dsh/storages/session_projcache，含逐会话真实计时字段。

## Description
- 存储每个会话的 sessionStats，提供墙钟与各阶段真实耗时（非 token 估算）。
- 路径为 ~/.dsh/storages/session_projcache。

## 字段结构
- wallMs：总墙钟耗时（毫秒），近似等于 llmMs 加 toolMs
- llmMs：LLM 推理耗时
- toolMs：工具调用耗时（含等待用户与后台任务）
- ttftMs：首字延迟（time-to-first-token）
- decodeMs：解码耗时
- steps：会话步数
- toolCalls：工具调用次数

## 用途
- 用于会话耗时根因审计；toolMs 可结合事件日志逐工具配对时间戳细分为 orchestrate、ask_user_question、job_output 等耗时。
- 2026-11-12 审计（最终定稿口径）表明：今日 45 个会话、墙钟合计 861 分钟（此前 44/818 为昨日快照、51 为含跨天历史天口径，均不一致已统一）。
- 25/45 会话存在单步并发工具调用，Σtool/Σorchestrate 含并行重叠为 sum 上界，关键路径应取 max 而非 sum。
- orchestrate 真失败（isError:true，整段跑满 300s 返回错误无产出）= 4 次，sum 上限 ≈ 20min；分布 e86ca4e5×1、ec65ff86×1、ecff3d5d×2，集中于 3 个会话（ecff3d5d 占一半），属局部故障点。
- orchestrate 慢但成功（300s 且有部分结果轨迹，不算浪费）：03b85096、2b06b6fa、83dc76df×2、961f43eb、e86ca4e5 各 1；其中 03b85096 的 1431s 是多次串跑累计，非单次 300s 超时。
- ask_user 总等待 87.7min/83 次（含并发打点，早前口径 80 次）；P50=27s、P90=126s（早前审计）；≥300s 长尾 = 2 次（dde42845=11.3min、ec65ff86=17.6min），合计 28.9min，占 ask 总等待 33%，为高影响长尾。
- job_output 与 ask_user_question 为宿主内置工具（host 级），不在 dsh 插件 checkout 内，其等待已含于 toolMs 内不可单列，插件层无法直接修改其逻辑。


<!-- MEMORY_FIELDS
{
  "category": "数据存储",
  "name": "session_projcache",
  "source_extraction_id": "4bf3994e2b2f41d69b4e97f5c39863c4",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->