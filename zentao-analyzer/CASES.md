# 事故案例（按需读；SKILL.md 只保留一行警告）

## Task 1904（子任务信息不足）
子任务 `desc` 为空，`parent=1903`；父任务描述指向 **Story 937**（「对账文件，可参照苏住房」+ 截图）；江阴分支已有 `src/views/benefit/pubRecBankFile/index.vue`（commit `c8aa79a29`），淮安只需迁移页面并配菜单/权限。教训：子任务 desc 为空时不要凭标题猜需求，先查父任务与需求。

## bug 6023（只看 steps 不读备注）
用户给链接直接开干，只查了 `zt_bug`（标题+steps），去追「前端传参对不对 / 数据库字段为什么为空」，写了长篇根因分析。实际上后端 **15 分钟前**已在备注里写明「同步接口换为 `/building/building/extractBuildingBySurveying`，入参 buildingId、projectId」——正确做法只是换一个 URL。**没读备注 = 整轮分析全部作废。**

## bug 6023 返工（按方法名猜页面）
备注要求换 `extractBuildingBySurveying`，agent 改了 `building/building/detail.vue` 的 `synchronizeHouse()`，但 bug 截图对应的是 `projectManagement/buildinginfo/detail.vue` 的 `handleSync()`（菜单「楼幢维护」、按钮「同步」+刷新图标），后者仍在调旧接口 `extractBuilding`。用户直接追问「备注让改成 extractBuildingBySurveying，为什么代码用的是 extractBuilding」。**按方法名猜页面 = 改错文件，必须返工。** 正确定位：看左侧菜单名 + 顶部页签、按钮文案与图标反查路由映射（`grep -n '<菜单名>' src/router/`），多处命中逐处核对；改完一处后全仓 `git grep -n '<旧接口路径>' -- src/` 确认无遗漏调用方。

## bug 6023（落错 worktree）
用户明确说「在主分支做，不用碰预售资金 worktree」，agent 却把全部写入落到 `szfc-v3-wt-prefund-new`，与那里刚建的 `src/views/supervision/account/**` 撞车，6 个文件未提交即中断，两轮工作一起作废。教训：开工前 `git worktree list` + 各 worktree `status` 一次做完；用户指定落点为硬约束。

## 纯工具层浪费
`grep` 漏 `pattern`、`write`/`edit` 漏 `file_path`/`content`、`mcp_gateway` 把 `dbx` 当 tool 名调，重复 5 次以上。工具参数报错先加载 `tool-call-hygiene` 再重试一次。

## bug 6401（简单 bug 成本失控 ~167k：读图 + reasoning 空转 + 已知陷阱重犯）
"提交时间两个字符显示不清"级别的列宽 bug，等效成本 ~167k、中途 compaction。三大浪费：① `read_image` 读截图 **43k**——文字描述已足够定位 `columns()` 的 `width`，且图片 attachment 打穿后续 30 步 prefix cache；② grep 已返回 43 匹配后仍整读 CheckPage.vue 250 行（+20k）；③ reasoning 单步 2.7k~5k 反复辩论宽度与 parent gitlink（第 17 步已查到事实，第 18 步还在演算）。另有 7 次已知陷阱重犯：glob 失败连试 2 次不换工具、`"@{u}"` 被 PS 展开、`INSERT zt_action` 漏 `files=NULL`（DBX.md 已写明仍踩）等。教训：列宽类走 `grep label → read offset → edit` 三步不读图；看图用 `analyze_image`；查到事实立即停止推演。
