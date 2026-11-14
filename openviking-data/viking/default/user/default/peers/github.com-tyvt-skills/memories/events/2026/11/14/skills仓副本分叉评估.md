# Summary
2026-11-14 对比后发现 skills 仓 `dsh/profiles/web/cordis.patch.yml`（1055 行）与 live 版（1418 行）结构差异约 409 行：repo 版是"迁移到 D 盘统一管理"时期的旧快照（commit 64b66a72/3373301），缺 preset-full-tools 与批 1 的 schedule disabled，仍含已淘汰的 composer-2.5/hy4free 模型，因此不是 live 的直接部署源。据此决定不拿 repo 版做基线、也不用 live 全量覆盖，只在 repo 版 preset-standard 的 tool-workflow 处增量加 `disabled: true`，使提交范围精确对应批 2。
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: 找到了！仓库里有 `D:\repository\skills\dsh\profiles\web\cordis.patch.yml` —— 这是受管副本（skills 仓里维护的 web profile 配置源）。我需要看它当前内容与 `~/.dsh/profiles/web/cordis.patch.yml` 是否一致（部署源 vs 运行副本关系）。

对比两个文件的 preset-standard tool-workflow 状态。
**assistant [peer=github.com-tyvt-skills]**: 关键差异：**repo 版（1055 行）与 live 版（1418 行）结构大不同**，且 repo 版里 tool-workflow 状态分布也不同（L280 enabled、L512 disabled、L854 enabled）——只有 3 处，与 live 的 5 处（含 full-tools）不符。

这说明 repo 版**不是 live 的直接部署源**，两者已严重分叉（live 有 full-tools 等批 1 新增，repo 版没有）。直接拿 repo 版覆盖 live 或用 live 覆盖 repo 都会破坏。

我必须先搞清两者关系：repo 版是否落后（没同步批 1 的 full-tools），还是它们本就独立。查 repo 版有无 preset-full-tools、批 1 的 schedule/goal disabled。
**assistant [peer=github.com-tyvt-skills]**: 关键结论：**repo 版 `dsh/profiles/web/cordis.patch.yml` 是旧快照——不含预设（preset-full-tools 0 次），也没有批 1 的 schedule disabled**。它是很早的"迁移到 D 盘统一管理"版本（commit 64b66a72/3373301），**已与 live 严重脱节**。live 才是真实运行配置（含批 1、批 2 全部改动）。

所以正确做法不是拿 repo 版做基线，而是：**把 live 当前配置（已含批 1+批 2）同步为 repo 版的新内容**，作为统一管理的权威副本提交。但要谨慎——这会引入 live 相对 repo 的所有差异（不止批 2 一行，还有批 1 full-tools、以及 dsh 运行时的格式化等）。

这需要你确认范围，不能擅自把一大堆 live 差异一次性塞进仓。先量化差异有多大。
**assistant [peer=github.com-tyvt-skills]**: 差异 **409 行**，且不止批 2——live 有大量 repo 没有的配置演进（full-tools 预设、hy4free 模型已淘汰改新模型、mcp toolSurface off、recall 预算、批 1 schedule disabled 等；repo 还有已淘汰的 composer-2.5/hy4free 模型）。

一次性把 live 全量覆盖 repo 风险高（会卷入很多历史演进，远超本次批 2 范围），且与"仅提交批 2 改动"的意图不符。

我应该**只把批 2 这一处语义改动**写进 repo 版——在 repo 版的 preset-standard 里给 tool-workflow 加 disabled。这样提交范围精确对应本次变更，不裹挟历史漂移。先确认 repo 版 preset-standard 内 tool-workflow 的确切位置（前面看到 L280 enabled 可能是 standard、L512 disabled 是别的 preset）。

核实 repo 版三处 tool-workflow 各自所属 preset。
**assistant [peer=github.com-tyvt-skills]**: repo 版结构清晰：preset-standard（L280 workflow enabled）是本次要改的。ptc 已 disabled（既有）、cordis enabled。

我在 repo 版 preset-standard 的 tool-workflow（L280-281）后加 `disabled: true`——只改这一处，精确对应批 2。先读确切块再 edit。
**assistant [peer=github.com-tyvt-skills]**: 已读到 repo 版 preset-standard 块（L280-281）。在 repo 版这里加 `disabled: true`，只改这一处对应批 2。
**assistant [peer=github.com-tyvt-skills]**: repo 版也有 2 处相同结构（standard 和 cordis 可能）。用 Python 按行号精确改（standard 在 L280）。

<!-- MEMORY_FIELDS
{
  "event_name": "skills仓副本分叉评估",
  "goal": "评估受管副本与运行时差异",
  "summary": "2026-11-14 对比后发现 skills 仓 `dsh/profiles/web/cordis.patch.yml`（1055 行）与 live 版（1418 行）结构差异约 409 行：repo 版是\"迁移到 D 盘统一管理\"时期的旧快照（commit 64b66a72/3373301），缺 preset-full-tools 与批 1 的 schedule disabled，仍含已淘汰的 composer-2.5/hy4free 模型，因此不是 live 的直接部署源。据此决定不拿 repo 版做基线、也不用 live 全量覆盖，只在 repo 版 preset-standard 的 tool-workflow 处增量加 `disabled: true`，使提交范围精确对应批 2。",
  "ranges": "10-22",
  "source_extraction_id": "8f195b3f72104200903c651ccab8e0e2",
  "version": 1,
  "memory_type": "events"
}
-->