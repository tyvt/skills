# plan_review卡住stall熔断排查
langgraph 编排中 plan_review 长时间无输出时，按 stall 熔断规则先核实状态与进程存活，再判断是冷启动慢还是死锁。

## 现象
- plan_review 卡住 120s，python 启动阶段完全无输出
- python 进程 20520（11:01 启动）在排查时仍然存活

## 排查步骤
- 按 stall 熔断规则先查 `.task-state` 与编排器状态，不盲目重试
- `.task-state` 中没有本次 plan_review 的状态文件
- 用探针确认进程是否仍在推进，避免把冷启动误判为死锁

## 判断结论
- 初判为 langgraph 冷启动慢而非死锁，需继续探测其推进情况
- 经验：无状态文件但进程存活时，优先怀疑冷启动，不要直接重试或杀进程

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "plan_review卡住stall熔断排查",
  "source_extraction_id": "ec1637439e6048ec90f8d51510ed5f12",
  "version": 1,
  "memory_type": "entities"
}
-->