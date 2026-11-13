# Summary
2026-11-13，助理发现 route_miss 白名单（第182行）漏掉 pwsh，导致 pwsh 误选未被记为 MISS；pwsh 会真的执行命令而非生成代码。修复后矩阵复测 pwsh 误选被正确记为 miss=True。提交 f8dec839。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 三态设计和 MISS 去向做得对，但 n=1 的 100% MISS 已经足够强到“先修 prompt 再观察”，不需要等 30 条；批量重放脚本脱离会话上下文、需要新增 replay 态、且成本不为零，应该在“修 prompt + 真实流量”验证无效后再做。比批量数据更优先的，是先查 op:full vs op:tool 的比例——它决定分流到底跑没跑，而这个答案比 30 条 MISS 数据更根本。
...
**assistant [peer=github.com-tyvt-skills]**: 结果出现了新情况：3/5 正确，但两个 MISS 都选择了 `pwsh`——而 `miss=False`，说明我的 `route_miss` 漏判了 `pwsh` 这种情况。

这是一个真实缺陷：`route_miss` 只检查 `code_editor`/`planner`，没把 `pwsh` 算进去。
...
**assistant [peer=github.com-tyvt-skills]**: 确认缺陷在第 182 行：白名单漏了 `pwsh`。而 `pwsh` 恰恰是最危险的误选——它会真的执行命令，而不是生成代码。

修正它。
...
**assistant [peer=github.com-tyvt-skills]**: 13 passed。现在重跑矩阵，看 `pwsh` 误选是否被正确捕获。
...
**assistant [peer=github.com-tyvt-skills]**: `pwsh` 误选现在被正确记为 `miss=True`，修复生效。

但那两条请求仍然选 `pwsh`，说明 prompt 对“修报错”这类仍然不够。我加一条针对性的约束。

先看那两条为什么选 pwsh，检查具体 trace。

<!-- MEMORY_FIELDS
{
  "event_name": "路由漏判pwsh修复",
  "goal": "修复路由缺陷",
  "summary": "2026-11-13，助理发现 route_miss 白名单（第182行）漏掉 pwsh，导致 pwsh 误选未被记为 MISS；pwsh 会真的执行命令而非生成代码。修复后矩阵复测 pwsh 误选被正确记为 miss=True。提交 f8dec839。",
  "ranges": "0,31,35,41,45",
  "source_extraction_id": "c1d7fca67ce54bb28f26babf48b5d049",
  "version": 1,
  "memory_type": "events"
}
-->