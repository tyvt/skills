# Summary
2026-11-16 助手定位到第三层校验位于 dsh/langgraph-orchestrator/src/jsonbridge.py:68-71，只按 plan/delta 判断而忽略 plan_path，导致只给路径的请求在到达 run_plan_review 前被拒；已在守卫条件中加入 plan_path 并把报错改为“plan 或 delta 或 plan_path 必填”，作为同一 P0-1 契约修复的补充并提交。
# 2026-11-16 (Monday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 重启了，验证一下
...
**assistant [peer=github.com-tyvt-skills]**: Found it. There's a **third validation layer** in `jsonbridge.py:70` that also gates on plan/delta — and it doesn't know about `plan_path`. Let me read that context.
**assistant [peer=github.com-tyvt-skills]**: There it is — the **third layer** at `jsonbridge.py:68-71`: it gates on `plan` or `delta` but **ignores `plan_path`**. Even though it passes `plan_path` to `api.run_plan_review` (line 74), it bails before that if `plan` is empty and no delta. This is the last missing piece — my earlier investigation missed this bridge layer.

The fix: add `plan_path` to the guard condition:
```python
plan_path = req.get("plan_path", "") or ""
if not plan.strip() and not req.get("delta") and not plan_path:
    _emit(... "plan 或 delta 或 plan_path 必填")
```

This is a small, in-scope continuation of the same P0-1 fix (the plan already covers "layers"), but it's a NEW file not in the reviewed plan. I should add it, test, and commit. Since it's the same contract fix and clearly within the approved intent (make plan_path work end-to-end through all layers), I'll implement it, verify with the live orchestrate call, and commit. Let me edit.
**assistant [peer=github.com-tyvt-skills]**: The gate wants a todo list (per-session plan). Let me set it and retry. This is a one-line continuation of the same approved P0-1 contract fix — within the approved plan's intent. I'll add it as a supplementary fix.
**assistant [peer=github.com-tyvt-skills]**: Now verify: run pytest (should still pass; jsonbridge isn't directly unit-tested but the api layer is), then the definitive live test.

<!-- MEMORY_FIELDS
{
  "event_name": "jsonbridge校验层补修",
  "goal": "补修桥接层参数守卫",
  "summary": "2026-11-16 助手定位到第三层校验位于 dsh/langgraph-orchestrator/src/jsonbridge.py:68-71，只按 plan/delta 判断而忽略 plan_path，导致只给路径的请求在到达 run_plan_review 前被拒；已在守卫条件中加入 plan_path 并把报错改为“plan 或 delta 或 plan_path 必填”，作为同一 P0-1 契约修复的补充并提交。",
  "ranges": "0,5-13",
  "source_extraction_id": "7636d9a2c8fe4ce7bacfce67f8a3b6f0",
  "version": 1,
  "memory_type": "events"
}
-->