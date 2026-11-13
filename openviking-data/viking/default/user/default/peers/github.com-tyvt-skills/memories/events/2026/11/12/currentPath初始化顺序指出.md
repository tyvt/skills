# Summary
2026-11-12，用户在八审中指出 §3.4 的 currentPath 初始化取 repoRoot or exec.cwd 会导致相对 cd 解析错误，建议改为 exec.cwd ?? repoRoot ?? undefined 并处理 cd 无参数与 Set-Location -Path。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...py" .sessions` 应被 (d) 拦。

---

## 🟡 建议级

### 3. currentPath 初始化顺序应 `exec.cwd` 优先，`repoRoot` 仅 fallback

§3.4 写：

```
currentPath = repoRoot or exec.cwd          # 初始工作目录
```

命令实际在 `exec.cwd` 下执行，若两者都存在却取 `repoRoot`，相对 `cd` 会解析错。例：`exec.cwd = repo/sub`，命令 `cd .sessions && cat bill.json`：

- 正确：`repo/sub/.sessions` → inSessions=true → 拦；
- 按 `repoRoot=repo` 解析：`repo/.sessions` → 仍含 `.sessions`，碰巧对；但 `cd ../.sessions` 等会错。

更典型的 `cd sub` 从 `repo/sub` 出发，正确是 `repo/sub/sub`，按 repoRoot 是 `repo/sub`，可能误判。

**建议**：`currentPath = exec.cwd ?? repoRoot ?? undefined`；两者都无时，cd 相对路径不可靠，保守置 `inSessions=true` 或禁用 cd 跟踪并拦读取类，不要 undefined。...

<!-- MEMORY_FIELDS
{
  "event_name": "currentPath初始化顺序指出",
  "goal": "指出初始化bug",
  "summary": "2026-11-12，用户在八审中指出 §3.4 的 currentPath 初始化取 repoRoot or exec.cwd 会导致相对 cd 解析错误，建议改为 exec.cwd ?? repoRoot ?? undefined 并处理 cd 无参数与 Set-Location -Path。",
  "ranges": "13-17",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->