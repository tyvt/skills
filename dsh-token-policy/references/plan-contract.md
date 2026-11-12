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
    {"id": 2, "type": "decide",  "question": "…", "resolve_by": "已完成 explore 的 step id 或事实来源"},
    {"id": 3, "type": "edit",    "files": ["src/App.vue"], "verify_with": "命令"},
    {"id": 4, "type": "commit",  "scope": ["src/App.vue"],
     "verify_with": "git diff --name-only <base>..HEAD 与 write_scopes 集合比对"}
  ],
  "write_scopes": ["src/App.vue"],
  "acceptance": [
    {"criterion": "…", "check": "命令", "expected": "退出码 0 / 关键输出 / diff 行数 / 与基线的差集"}
  ],
  "open_contracts": [
    {"what": "/v2.0/security/auth/getInfo", "status": "unverified",
     "probe_with": "grep 命令", "filled_by": "executor"}
  ]
}
```

## 字段约束

| 字段 | 约束 |
|---|---|
| `root_cause` | 必须能被某条命令或日志输出证伪，不接受「可能是」 |
| `steps[].type` | 只能是 `explore` / `decide` / `edit` / `commit` |
| `steps[].verify_with`（explore/edit/commit） | 都要给可执行命令 |
| `steps[].resolve_by`（decide） | 必填，指向**已完成的 explore step id** 或明确事实来源（DAG 依赖，不要求线性先读后判） |
| `write_scopes` | 与 steps 里实际要改的文件完全一致；越界即 R4 打回 |
| `acceptance[].expected` | 必填。给「怎么算通过」：退出码 / 关键输出片段 / diff 行数 / **与既有基线的差集**。详见下方「既有基线」 |
| `open_contracts[].status` | 初始 `unverified`；`probe_with` 给探测命令；`filled_by` 恒为 `executor` |

## acceptance 的 expected：必须处理「既有基线错误」

本案例的 typecheck 本来就有 20+ 既有错误，若 `acceptance` 写「typecheck 通过」就永远不满足。
`expected` 必须写成**可判定且容忍既有基线**的形式，二选一：

- **退出码**：`expected: "退出码 0"`（仅当基线本就干净时可用）；
- **与基线的差集**：`expected: "错误集与基线一致（新增错误数 = 0）"`，并在 `check` 里给出
  基线与改后两次采集的命令，用差集判定。**这是有既有错误时的唯一正确写法。**

## commit.verify_with：必须做集合比对

`git status --short` 不判定「只改了 scope 内」。升级为：

```
git diff --name-only <base>..HEAD   # 或 git show --stat
```

并与 `write_scopes` 做**集合比对**：出现 scope 外文件即视为夹带，计划不得声称 PASS。

## open_contracts：谁探测、谁回填、谁复核

责任链写死，避免无人认领：

1. **探测 = 便宜模型的活**：`probe_with` 命令作为 plan 里一个 `explore`（或 decide 的 resolve_by）步骤执行。
2. **回填 = 便宜模型做**：探测完由**执行模型**把 `status` 从 `unverified` 改为 `verified`（附命令与结果）
   或保持 `unverified`（探测失败，写进汇报第 3 项）。`filled_by` 恒为 `executor`。
3. **复核 = 旗舰在 C（汇报审阅）做**：检查 `status=unverified` 的项在汇报里都有对应说明（打回条件 C4）。

## 审阅联动

- 旗舰对每条 `open_contracts` 用只读命令 grep 一次：仓库有现存引用/测试 → 可降级为已核实；
  全仓零引用 → 保持 `unverified`，按 R2 要求计划改为「先探测再使用」（REJECT=改后重提，非终止）。
- 旗舰 output 的 `approved_scope` 必须回填 `write_scopes` 与 `max_files`，作为执行模型的硬边界。
