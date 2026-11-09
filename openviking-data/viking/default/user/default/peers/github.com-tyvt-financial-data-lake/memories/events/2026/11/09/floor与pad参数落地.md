# Summary
2026-11-09，助理经独立 worktree（分支 feat/targetyld-floor）修改 config.js、final_portfolio_v3.py、README.md、holding.sqlite，自测全过，合并回 main（提交 89eaa08c）；本地共 30 个未推送提交，按用户选择未推送。
# 2026-11-09 (Monday) ChatLog:
**assistant [peer=github.com-tyvt-financial-data-lake]**: 按你选的参数继续调整：floor 3.0 + pad 0.5。再走一次独立 worktree。
...
**assistant [peer=github.com-tyvt-financial-data-lake]**: 参数已改。现在跑自测，并按新公式估算各标的可买性。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 自测全过、参数一致。提交合并后同步库内配置。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 已按你选的参数改完并验证通过。

## 当前生效配置

| 参数 | 值 | 说明 |
|---|---|---|
| `targetYldMode` | `dynamic` | 按个股近 3 年股息率历史定价，不再一刀切 |
| `targetYldFloor` | **3.0** | 下限（原 4.8） |
| `yldPadPct` | **0.5** | 安全垫（原 1.0） |
| `targetYld` | 4.8 | 仅保留为参考值，dynamic 下不参与计算 |

公式变为 `目标股息率 = max(3.0, 近3年均值 + 0.5)`。改动落在 [config.js](<分析产出/持仓面板/config.js>)、[final_portfolio_v3.py](<分析产出/final_portfolio_v3.py>)（生成源，否则重跑会覆盖）、[README.md](<分析产出/持仓面板/README.md>)；[holding.sqlite](<分析产出/持仓面板/holding.sqlite>) 库内 `cfg` 已同步，与 config.js 全等（9 只），`cfgSyncedAt` 已更新。

**验证**：自测「全部通过」；生成源与产物逐字段一致；第二个 worktree `数据湖-wt-targetyld-floor`（分支 `feat/targetyld-floor`）已 fast-forward 合并回 main 并删除。本地两个提交 `5e721c3c`、`89eaa08c`，按你的选择**未推送**（当前共 30 个未推送提交）。刷新页面生效，若仍显示旧配置用「设置 → 从 config.js 同步」。

## 一个需要如实说明的结果

按筛选结果 CSV 的三年均值近似估算（页面实际用东财实时序列，口径略有差异，方向一致）：

| 标的 | 当前 yld | 历史均值 | 目标 | 结论 |
|---|---|---|---|---|
| 洪城环境 | 5.35 | 4.84 | 5.34 | 可买 |
| 青岛港 | 4.97 | 4.11 | 4.61 | 可买 |
| **唐山港** | 4.15 | 5.06 | 5.56 | 不达标 |
| **兴蓉环境** | 3.23 | 3.23 | 3.73 | 不达标 |
| 其余 5 只 | — | — | — | 不达标 |

**兴蓉、唐山港依然买不了。** 下限降到 3.0 对它们没有帮助——卡住它们的是「当前股息率必须 ≥ 历史均值 + 0.5 垫」这个判定本身：这两只当前股息率低于自身历史均值（价格相对历史偏贵），任何正的安全垫都会把它们挡住。floor 只决定了均值很低的标的（如均值 2.0 → 目标 3.0）怎么兜底。

也就是说，「不再用 4.8 一刀切」已经做到，但「让低股息标的进买入清单」需要动判定逻辑，不只是调参数。

<!-- MEMORY_FIELDS
{
  "event_name": "floor与pad参数落地",
  "goal": "落地参数调整",
  "summary": "2026-11-09，助理经独立 worktree（分支 feat/targetyld-floor）修改 config.js、final_portfolio_v3.py、README.md、holding.sqlite，自测全过，合并回 main（提交 89eaa08c）；本地共 30 个未推送提交，按用户选择未推送。",
  "ranges": "74,91-100",
  "source_extraction_id": "fb8bc616e68c4a0ab1879bf653f720e6",
  "version": 1,
  "memory_type": "events"
}
-->