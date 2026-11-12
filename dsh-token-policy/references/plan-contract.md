# 交接契约：plan.json

> 便宜模型先产出本契约，旗舰「计划审阅官」据此审阅（见 `dual-model-prompts.md`）。
> 关键设计：**`open_contracts` 是把「猜外部契约」暴露给旗舰的抓手** ——
> 凡计划里出现、但仓库零引用的接口/字段/枚举，都必须进这里，旗舰据此执行 R2 打回。

## Schema

```json
{
  "task": "…",
  "root_cause": "一句话，必须可被代码/日志证伪",
  "steps": [
    {"id": 1, "type": "explore", "action": "…", "verify_with": "命令"},
    {"id": 2, "type": "decide",  "question": "…", "resolve_by": "命令/事实来源"},
    {"id": 3, "type": "edit",    "files": ["src/App.vue"], "verify_with": "命令"},
    {"id": 4, "type": "commit",  "scope": ["src/App.vue"], "verify_with": "git status --short"}
  ],
  "write_scopes": ["src/App.vue"],
  "acceptance": [{"criterion": "…", "check": "命令"}],
  "open_contracts": [{"what": "/v2.0/security/auth/getInfo", "status": "unverified"}]
}
```

## 字段约束

| 字段 | 约束 |
|---|---|
| `root_cause` | 必须能被某条命令或日志输出证伪，不接受「可能是」 |
| `steps[].type` | 只能是 `explore` / `decide` / `edit` / `commit`；`explore` 与 `decide` 必须拆成两步（对应打回条件 R6） |
| `steps[].verify_with` | 每条 explore/edit/commit 都要给可执行命令；decide 用 `resolve_by` 指向事实来源 |
| `write_scopes` | 与 steps 里实际要改的文件完全一致；越界即 R4 打回 |
| `acceptance` | 每条都要有可执行 `check`，不接受「应该正常」类描述（R3） |
| `open_contracts[].status` | 初始一律 `unverified`；只有附带验证命令且命令通过后才可改 `verified` |

## 审阅联动

- 旗舰对每条 `open_contracts` 用只读命令 grep 一次：仓库有现存引用/测试 → 可降级为已核实；
  全仓零引用 → 保持 `unverified`，按 R2 要求计划改为「先探测再使用」。
- 旗舰 output 的 `approved_scope` 必须回填 `write_scopes` 与 `max_files`，作为执行模型的硬边界。
