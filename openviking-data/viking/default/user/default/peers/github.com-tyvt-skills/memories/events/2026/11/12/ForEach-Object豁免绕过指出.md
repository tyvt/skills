# Summary
2026-11-12，用户在八审中指出 dsh-orchestrator-gate 设计文档 v8 的 §3.4 将 ForEach-Object 列入查找豁免，导致 Get-ChildItem | ForEach-Object { python cost_bill.py } 被放行，构成实际绕过，建议移出豁免或按执行拦。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: # 八审意见：dsh-orchestrator-gate 设计文档 v8

## 总体评价

**七审的 3 条 🟠 和 4 条 🟡 已全部落实**：编号订正为 M1~M5/S1~S5、§3.4 补 bash/terminal、cd 链改为 currentPath 精确判定、公共前置堵 `npm run <script> --version`、Where-Object 脚本块归查找类、注明 cd 失败固有限制、isAbsolute 用 node:path。设计已**具备开始编码的条件**。

但 §3.4 的"查找豁免"和 currentPath 初始化还有**两个实际绕过/误伤**，落地前建议修。按严重程度：

---

## 🟠 重要级

### 1. `ForEach-Object` 被列入查找豁免 → `ForEach-Object { python cost_bill.py }` 可绕过

§3.4 (c)：

```
isSearchHead = head ∈ {find, ls, dir, Get-ChildItem, Where-Object, Select-Object, ForEach-Object}
hasExecToken = 该段含 {--exec, -exec, ..., -Command, Invoke-*, Start-Process}
if isSearchHead and not hasExecToken: pass
```

`ForEach-Object` 的脚本块可以执行任意命令：

```
Get-ChildItem | ForEach-Object { python cost_bill.py }
```

- head = `ForEach-Object` ∈ isSearchHead；
- 段内不含 `-exec/-Command/Invoke-*/Start-Process`；
- 满足 isSearchOnly → **放行**，但脚本块实际执行了 `python cost_bill.py`。

这是 §3.4 硬拦的直接绕过。`ForEach-Object` 本质是 pipeline 执行器，不是"查找/过滤"。

**建议**：把 `ForEach-Object` 从 isSearchHead 移除；或规定"段内含 `{ ... }` 脚本块且块内含 `cost_bill.py` 或执行类 token → 按执行拦"，仅对 `Where-Object`/`Select-Object` 的简单属性比较保留豁免。...

<!-- MEMORY_FIELDS
{
  "event_name": "ForEach-Object豁免绕过指出",
  "goal": "指出设计漏洞",
  "summary": "2026-11-12，用户在八审中指出 dsh-orchestrator-gate 设计文档 v8 的 §3.4 将 ForEach-Object 列入查找豁免，导致 Get-ChildItem | ForEach-Object { python cost_bill.py } 被放行，构成实际绕过，建议移出豁免或按执行拦。",
  "ranges": "0-7",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->