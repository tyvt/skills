# Summary
2026-11-09，助理经独立 worktree（分支 feat/targetyld-dynamic）修改 config.js、final_portfolio_v3.py 生成源、README.md、_selftest.js、holding.sqlite 库内 cfg，修 CRLF 致主脚本正则失配及测试#25 写死 fixed 问题，自测全过，fast-forward 合并回 main（提交 5e721c3c）并删 worktree；面板以库内 cfg 为准，刷新生效。
# 2026-11-09 (Monday) ChatLog:
**user [peer=github.com-tyvt-financial-data-lake]**: 把 targetYldMode 改回 dynamic：固定 4.8% 作为一个“安全底线”是可以的，但作为唯一标准太粗暴。如果你坚持用 fixed，那就接受“兴蓉、唐山港永远买不了”的现实，直接无视它们。
...
**assistant [peer=github.com-tyvt-financial-data-lake]**: 改动涉及生成源、产物和运行时库内配置，我按规则新建独立 worktree 处理代码部分。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 三处文件已改，现在跑自测并核对生成源与产物一致。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 自测脚本报"找不到主脚本"，我先确认是脚本既有问题还是本次改动引起。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 自测失败是既有问题：worktree 里 `index.html` 被 checkout 成 CRLF，而 `_selftest.js` 的主脚本正则只认 `\n`。我顺手修这一行兼容性，让验证能跑。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 自测 1 项失败：测试 #25 硬编码了「config.js 是 fixed」的旧假设。我把它改成不依赖具体模式的差异检测。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 自测全部通过。现在提交 worktree 改动、合并回 main、清理 worktree。
**assistant [peer=github.com-tyvt-financial-data-lake]**: `git merge` 撞上了残留的 `index.lock`，worktree 已删除但合并没完成。我先诊断锁的来源再重试。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 锁是 9:50 会话启动时遗留的 0 字节陈旧锁，且无 git 进程占用。清理后重试合并。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 合并完成。现在同步 `holding.sqlite` 的库内配置（面板运行时以库为准），先确认页面持久化方式。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 现在同步库内配置并做最终一致性校验。
**assistant [peer=github.com-tyvt-financial-data-lake]**: 已改完并验证通过，但有个**必须告诉你的技术后果**：改回 `dynamic` 并不会让兴蓉、唐山港变得可买，反而会让买入清单整体更严。

## 已落地的改动

| 文件 | 改动 |
|---|---|
| [config.js](<分析产出/持仓面板/config.js>) | `targetYldMode: fixed → dynamic`，移除 `targetYldFixed`，`_doc` 写明「4.8% 仅作安全底线、不作唯一买点」 |
| [final_portfolio_v3.py](<分析产出/final_portfolio_v3.py>) | 生成源同步改，否则下次重跑会覆盖回 fixed |
| [README.md](<分析产出/持仓面板/README.md>) | 遗留的「买入线 5%+ / 默认下限 5%」校正为 4.8% |
| [_selftest.js](<分析产出/持仓面板/_selftest.js>) | 修 CRLF 导致主脚本正则失配；测试 #25 改为不写死 fixed/dynamic 的差异检测 |
| [holding.sqlite](<分析产出/持仓面板/holding.sqlite>) | 库内 `cfg` 同步（`fixed→dynamic`、去掉 `targetYldFixed`），`cfgSyncedAt` 已更新——面板以库为准，不同步等于没改 |

`targetYldFloor` 保留 **4.8**，`yldPadPct` 保留 **1.0**，`targetYld` 保留 4.8，8 只名单/权重完全没动。

**验证**：自测「全部通过」；生成源与产物逐字段一致；库内 cfg 与 config.js 全等（9 只），`configStale` 不会误报。走独立 worktree `数据湖-wt-targetyld-dynamic`（分支 `feat/targetyld-dynamic`），已 fast-forward 合并回 main（`5e721c3c`）并删除 worktree；单 HTML + sqlite 无构建步骤，刷新页面即生效（若仍显示旧配置，用「设置 → 从 config.js 同步」）。

## 需要你知道的后果

面板里 dynamic 的公式是 `targetYld = max(targetYldFloor, 近3年股息率均值 + yldPadPct)`，买入硬门槛是 `当前股息率 ≥ targetYld`（[index.html](<分析产出/持仓面板/index.html>) 第 1461–1487、2130 行）。所以：

- **结果永远 ≥ 4.8%**。兴蓉 `3.23%`、唐山港 `4.15%` 依然被挡在门外——这是「4.8 作安全底线」的必然结果，不是 fixed 特有的。
- **`+1.0` 安全垫会把高股息标的的目标线抬得更高**，比 fixed 4.8 更难买。按筛选 CSV 的三年均值近似：唐山港均值 5.06 → 目标 6.06（目标买价 ≈3.30 元 vs 现价 4.82）；格力 7.75 → 8.75（≈34.3 vs 38.96）。fixed 4.8 下格力目标价虚高到 62.5 元的荒谬确实消失了，但代价是「可买」变少。

也就是说，dynamic 解决的是「不再用同一把 4.8 的尺子量所有标的」，而不是「让低股息标的也能买」。真正决定兴蓉、唐山港命运的是 `targetYldFloor` 和 `yldPadPct`，不是 mode。

<!-- MEMORY_FIELDS
{
  "event_name": "dynamic配置改动落地",
  "goal": "落地dynamic配置改动",
  "summary": "2026-11-09，助理经独立 worktree（分支 feat/targetyld-dynamic）修改 config.js、final_portfolio_v3.py 生成源、README.md、_selftest.js、holding.sqlite 库内 cfg，修 CRLF 致主脚本正则失配及测试#25 写死 fixed 问题，自测全过，fast-forward 合并回 main（提交 5e721c3c）并删 worktree；面板以库内 cfg 为准，刷新生效。",
  "ranges": "0,16-72",
  "source_extraction_id": "fb8bc616e68c4a0ab1879bf653f720e6",
  "version": 1,
  "memory_type": "events"
}
-->