# Summary
用户猜测 config.yaml 的 pwsh 模型池顺序为 deepseek-v4.1-flash 第一优先级、glm-5.3-flash 备选，经查 config.yaml L177-183 确认：主选 workbuddy/deepseek-v4.1-flash（max_tokens 4096），备选 workbuddy/glm-5.3-flash（max_tokens 1024）。账单印证全史 753 次 pwsh 调用中 deepseek 690 次（92%）、glm 0 次（兜底从未触发）；61 次 grok-4.7 为旧期 guard/review 遗留已归零。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: workbuddy/deepseek-v4.1-flash
workbuddy/glm-5.3-flash
pwsh估计为这个顺序，deepseek第一优先级
**assistant [peer=github.com-tyvt-skills]**: 这是可直接验证的事实，不用估——查 config.yaml 的 pwsh 池实际顺序：
**assistant [peer=github.com-tyvt-skills]**: 猜测完全正确，config.yaml L177-183 实际配置就是：

```yaml
pwsh:
  models:
    - model: workbuddy/deepseek-v4.1-flash   # 主选, max_tokens 4096
    - model: workbuddy/glm-5.3-flash         # 备选, max_tokens 1024
```

两条佐证：

1. **账单印证主选垄断**：753 次 pwsh 调用中 deepseek-v4.1-flash 690 次，**glm-5.3-flash 0 次**——兜底从未触发过（那 61 次 grok 是旧期 guard 遗留，已归零）。也就是说降级路径存在但基本是死代码，deepseek-flash 一直稳。
2. **顺序合理性的注脚**：L178 注释写着「reasoning 模型 max_tokens 必须大于 reasoning 开销，否则 content 被截断成空回复」——deepseek 给 4096、glm 只给 1024，正是 11-12 那次 502 根因修复后的差异化配置。deepseek 在前不只是优先级，还带着更宽的 token 余量。

结合上一轮的量级结论：60% 的调用量压在一个 3.8s/520 token 的快模型上，主选命中率高到备选零出场——这个池子当前形态已经收敛，没有调整价值。

<!-- MEMORY_FIELDS
{
  "event_name": "pwsh模型池配置核实",
  "goal": "记录配置验证结果",
  "summary": "用户猜测 config.yaml 的 pwsh 模型池顺序为 deepseek-v4.1-flash 第一优先级、glm-5.3-flash 备选，经查 config.yaml L177-183 确认：主选 workbuddy/deepseek-v4.1-flash（max_tokens 4096），备选 workbuddy/glm-5.3-flash（max_tokens 1024）。账单印证全史 753 次 pwsh 调用中 deepseek 690 次（92%）、glm 0 次（兜底从未触发）；61 次 grok-4.7 为旧期 guard/review 遗留已归零。",
  "ranges": "9-17",
  "source_extraction_id": "e937772de43e4bc4aa8d6a405ea7d37e",
  "version": 1,
  "memory_type": "events"
}
-->