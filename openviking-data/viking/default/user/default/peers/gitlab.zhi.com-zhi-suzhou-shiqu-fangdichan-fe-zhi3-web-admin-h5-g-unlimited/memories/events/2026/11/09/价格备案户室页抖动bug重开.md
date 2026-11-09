# Summary
禅道 bug 6173「价格备案申请：维护户室时页面会抖动」于 2026-11-04 由 tiany 标记解决，2026-11-09 被 lichandan 以「此现象仍存在」重开。旧修复仅加 1px 去抖未删除定时器链，抖动依旧。
# 2026-11-09 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6173
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: Bug 6173 was previously "resolved" by tiany but reopened today ("此现象仍存在"). Let me read the full prior fix note, view the GIF attachment, and check git history for the earlier fix.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: ## 禅道 6173 修复已完成（待你确认推送/回写）

**重开原因定位**：bug 6173「价格备案申请：维护户室时页面会抖动」在 2026-11-04 曾由 tiany 标记解决，2026-11-09 被 lichandan 以「此现象仍存在」重开。旧修复（提交 `a2f07fde0`）只在「自己写 inline style」这一层加了 1px 去抖，但 [SingleSelect.vue](<zhi2-web-admin/src/components/zs-select/SingleSelect.vue>) 里 `[0,32,80,160,320]ms` 五个定时器每次仍**无条件调用 `select.updatePopper()`**，再叠加 `window` resize/scroll 监听与 `getMaxLayerZIndex()` 的全表 `getComputedStyle` 强制同步布局；Element UI 的 Popper.js 每次 `updatePopper()` 都会写回 `transform/top/left`，与自定义 `position:fixed` 互相覆盖，两套定位机制反复打架并造成主线程 jank，这才是抖动依旧的根源。GIF 逐帧核对显示下拉最终位置其实稳定（23 帧里底部边缘恒为 859px），也印证了问题是重排/闪动而非翻位错误。

**修复**：与同目录 [MultiSelect.vue](<zhi2-web-admin/src/components/zs-select/MultiSelect.vue>) 对齐，把下拉定位**交回 Element UI / Popper.js 单一数据源**——删除自定义 fixed 定位、定时器链、`updatePopper()` 调用与 scroll/resize 监听；仅在展开时用一次 rAF 补宽度与层级，且值不变不写。文件由 169 行精简到 112 行（35 增 / 92 删）。

**验证证据**
- 单文件 `eslint src/components/zs-select/SingleSelect.vue` 退出码 0；完整 `npm run lint` 的基线报错（存量格式类 4998 errors）中该文件零命中。
- `npm run build` 退出码 0（仅存量 Sass `@import` 弃用告警）；`dist/assets/SingleSelect-BPmXyjKf.js` 含 `queuePopperStyle`、不含 `lastPopperPlacement`/`schedulePopperSync`。
- nginx 站点 8098 实测：`/assets/SingleSelect-BPmXyjKf.js` HTTP 200，返回新代码且无旧逻辑；未启动任何 dev server。

**落地与并行任务**：在独立 worktree `苏州市房地产监测V3-wt-bug-6173`（分支 `fix/bug-6173-select-jitter`）开发，已合并回 `develop/v3.0.0` 并删除。期间并行任务 #6285 已把 `0144a81` 推到 `origin/develop/v3.0.0`，因此修复以 cherry-pick 叠加到 `#6285` 基线 `d806d63` 之上：子模块 `f5b858bd0`、父仓库 gitlink `d140832`，两者内容都保留。另：`szfc-v3-wt-bug-6285` 目录已由该任务自行删除，我的 `git worktree prune` 只清理了残留元数据。

**需要如实说明的一次事故**：清理 worktree 时，其 `node_modules` 联接指向了主工作区根 `node_modules`，导致根目录依赖被清空；已立即用 `npm install --offline` 从缓存完整恢复（615 项，`vite`/`rolldown` 均在），随后主工作区构建与 8098 站点验证均通过，未影响源码与提交。主工作区原有的 `env/.env`、子模块 `eslint-rules/` 删除与 `public/version.json` 等他人未提交改动全程未改动、未纳入提交。

代码目前**只提交在本地、尚未推送**（父仓库 `ahead 1`）。按约定，推送与回写禅道属于需要你确认的外部写操作：

<!-- MEMORY_FIELDS
{
  "event_name": "价格备案户室页抖动bug重开",
  "goal": "记录bug重开",
  "summary": "禅道 bug 6173「价格备案申请：维护户室时页面会抖动」于 2026-11-04 由 tiany 标记解决，2026-11-09 被 lichandan 以「此现象仍存在」重开。旧修复仅加 1px 去抖未删除定时器链，抖动依旧。",
  "ranges": "0,13,128",
  "source_extraction_id": "5ec96396f72f454792a0ffe026232e78",
  "version": 1,
  "memory_type": "events"
}
-->