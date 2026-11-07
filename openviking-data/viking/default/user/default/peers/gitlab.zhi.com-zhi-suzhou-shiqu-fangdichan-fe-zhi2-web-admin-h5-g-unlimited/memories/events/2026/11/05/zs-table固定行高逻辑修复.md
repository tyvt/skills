# Summary
2026-11-05 修复 zs-table 的 getBaseTableHeight 中 fixedViewportRows 分支：原 `Math.max(renderedRows,1)` 按实际行数撑高表格导致不滚动，改为固定 `displayRows=this.tableTr`(5)，使 HomeTodoTable 待办列表超过 5 行时表体内滚动、表头固定；npm run build 通过（exit 0），产物输出 D:\repository\门户\dist。
# 2026-11-05 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 限制5条，超过5条，加滚动条
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 我看到您想给"待办事项列表"表格加限制：**默认只显示 5 条，超过 5 条时出现滚动条**。

我先确认几个细节再动手：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 好的，我先在工作区定位这个"待办事项列表"页面。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 找到了核心组件 `HomeTodoTable.vue`。注意到工作区里有两个目录：`zhi2-web-admin`（主）和 `zhi2-web-admin-wt-payfund`（一个 payfund 的 worktree，属于别的任务）。我应在主工作区 `zhi2-web-admin` 修改。先读组件。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 这个组件已经通过 `visibleRows`（默认 5）、`fixed-viewport-rows`、`row-height=48`、`header-height=48` 这些属性在做了。看起来限制 5 行的能力已经存在。我需要确认 `zs-table` 的 `fixed-viewport-rows` 是否真的实现了"超出 5 行滚动"。让我查看 zs-table 组件实现。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: zs-table 已支持 `tableTr` + `fixedViewportRows` 固定可视高度并内部滚动。组件里已传 `:table-tr="visibleRows"`（=5）、`fixed-viewport-rows=true`、row-height/header-height=48。理论上已经实现"限5行、超出滚动"。

我需要确认两件事：①`visibleRows` 传入的是不是固定 5；②`zs-table` 在 `tableTr>0 && fixedViewportRows` 时是否真的产生滚动。先看 zs-table 关键计算逻辑和相关行、以及 HomeTodoTable 的父组件传参。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 关键发现：第 673-675 行——当 `fixedViewportRows=true` 时，`displayRows = Math.max(renderedRows, 1)`，也就是**按实际数据行数撑高**，而不是固定显示 5 行。这跟"超过 5 条出现滚动条"的诉求正好相反：数据越多表格越高，不会滚动。

要满足"限 5 行、超出内部滚动"，应该让 `displayRows` 在 `fixedViewportRows` 时取 `Math.max(rowCount, this.tableTr)` 还是固定 `this.tableTr`？为了可视高度固定为 5 行且不足 5 行也保留空白（fixedViewportRows 的注释正是"数据不足仍保留空白区"），应为 `displayRows = Math.min(...)`？不对，需要固定为 `tableTr` 行高。

逻辑应改为：`fixedViewportRows` 时 `displayRows = this.tableTr`（固定高度 5 行），这样数据超过 5 行时表格高度不变 → 内部滚动；数据不足 5 行时也保留 5 行高度。我看一下 `fixedViewportRows` 注释和 `countRenderedTreeRows`，以及确认 el-table 是否设了 height 产生滚动。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 注释明确写"固定为 tableTr 行高，数据不足仍保留空白区"。但实现（第673-675）用 `Math.max(renderedRows, 1)`，即行数越多越高，与注释意图不符。这是一个 bug。正确修复：`fixedViewportRows` 时应固定 `displayRows = this.tableTr`。

我确认一下 `tableHeight` 是否绑定到 el-table 的 height（产生内部滚动）。看 line 200-215 和模板绑定。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 确认：`:height="effectiveTableHeight"` 绑定到 el-table 的 `height`，只要 height 固定为 5 行高度，el-table 就会内部滚动（表头固定）。所以只需修正 `getBaseTableHeight` 中 `fixedViewportRows` 分支为固定行数。

修复：把第 673-675 的 `displayRows` 在 `fixedViewportRows` 时设为 `this.tableTr`（固定 5 行高度）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 现在确认 `HomeTodoTable` 的父组件确实传入了合适的 `visibleRows`（默认已是 5，但要确认没被覆盖成大值）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 两处使用都未传 `visibleRows`，采用默认值 5。符合需求。

现在验证构建。先确认 zs-table 是否被其他固定行数场景（不传 fixedViewportRows）使用，避免回归——那些仍走 `Math.min(tableTr, renderedRows)`，行为不变，安全。

运行构建验证。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 构建只输出 Sass `@import` 弃用警告（既有问题），未见报错。确认构建产物是否成功生成。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: dist 不存在，说明构建可能未走到产出阶段或输出目录不同。查看完整构建结果尾部与是否有 error。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 构建脚本 `vite-build.mjs`，`--logLevel error` 时正常不输出。检查该脚本的产物目录。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 脚本在低内存环境会调 heap。构建静默可能是 spawnSync 输出被吞或者产物位置不同。我直接检查 vite 配置的 outDir，并看是否有构建产物、以及构建退出码。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 构建成功，`EXIT=0`，仅有既有警告（Sass @import 弃用、SVG、chunk 大小等），无编译错误。确认产物目录。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: dist 未在项目内，查看 vite 配置的 outDir（可能在仓库根或其他位置）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: outDir = `rootDir + "/dist"`，rootDir 可能是仓库根。查一下。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 产物在仓库根 `D:\repository\门户\dist`。确认。

<!-- MEMORY_FIELDS
{
  "event_name": "zs-table固定行高逻辑修复",
  "goal": "记录修复结果",
  "summary": "2026-11-05 修复 zs-table 的 getBaseTableHeight 中 fixedViewportRows 分支：原 `Math.max(renderedRows,1)` 按实际行数撑高表格导致不滚动，改为固定 `displayRows=this.tableTr`(5)，使 HomeTodoTable 待办列表超过 5 行时表体内滚动、表头固定；npm run build 通过（exit 0），产物输出 D:\\repository\\门户\\dist。",
  "ranges": "0-40",
  "source_extraction_id": "dca305e411d6418ca595c5206749d40d",
  "version": 1,
  "memory_type": "events"
}
-->