# Summary
2026-11-12，用户在八审中指出 §3.4 的 isSearchHead 不含 grep/rg/Select-String，导致 grep "cost_bill.py" logs/ 等搜索日志字符串被误拦，建议扩查找豁免或限定拦截为执行/读取脚本。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...### 2. `cost_bill.py` 的查找豁免未覆盖 `grep/rg/Select-String` → `grep "cost_bill.py" logs/` 被误拦

§3.4 (c) 的 isSearchHead 不含 `grep/rg/Select-String`，于是：

```
grep "cost_bill.py" logs/          → head=grep，argv 含 cost_bill.py，isSearchHead=false → 拦 ❌
Select-String cost_bill.py logs/   → 同上 → 拦 ❌
```

这些是**搜索日志里的字符串**，不是执行/读取账单。而真正的账单读取 `grep "bill" .sessions/` 已由 (d) 拦截。当前 (c) 会把"在日志里搜关键词"误拦，与 §3.6 误伤控制目标不一致。

**建议**：isSearchHead 扩为 `dataReadHeads` 中的搜索类（`grep, rg, Select-String, find, Get-ChildItem, Where-Object, Select-Object`），但 `cat/Get-Content` 不算；或把 (c) 的 `cost_bill.py` 拦截限定为"执行/读取脚本"，搜索字符串不拦。同时补 selftest：`grep "cost_bill.py" logs/` 应放行、`grep "cost_bill.py" .sessions` 应被 (d) 拦。

---

## 🟡 建议级

### 3. currentPath 初始化顺序应 `exec.cwd` 优先，`repoRoot` 仅 fallback...

<!-- MEMORY_FIELDS
{
  "event_name": "cost_bill.py搜索误拦指出",
  "goal": "指出设计误拦",
  "summary": "2026-11-12，用户在八审中指出 §3.4 的 isSearchHead 不含 grep/rg/Select-String，导致 grep \"cost_bill.py\" logs/ 等搜索日志字符串被误拦，建议扩查找豁免或限定拦截为执行/读取脚本。",
  "ranges": "8-13",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->