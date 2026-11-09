# 禅道 Bug 6173
苏州市房地产监测V3 价格备案申请维护户室时页面抖动缺陷，根因为 SingleSelect.vue 自定义定位与 Element UI Popper.js 双定位机制冲突，经三次修复最终解决。

## 根因（最终确认）
- SingleSelect.vue 的 applyPopperStyle + getMaxLayerZIndex 在每次下拉打开时经 rAF+$nextTick 触发
- getMaxLayerZIndex 对 .v-modal/.el-dialog__wrapper/.el-select-dropdown/.el-popper 做 querySelectorAll + getComputedStyle，强制整页同步重排
- 随后在 Popper.js 定位之后手写 width/minWidth/zIndex，z-index 取"当前最大层 +10"基于自身上一轮值反馈放大，与 Popper.js 单一数据源互相覆盖 → 抖动
- GIF 逐帧核对显示下拉最终位置稳定（23 帧底部边缘恒为 859px），证实是重排/闪动而非翻位错误
- 第三次修复确认残留根因：SingleSelect.vue 的 applyPopperStyle 经 rAF+$nextTick 调 getMaxLayerZIndex，z-index 取当前最大层+10 基于自身上次抬高值反馈放大，与 Popper.js 单数据源互相覆盖导致抖动；queuePopperStyle/cancelQueuedPopperStyle/popperFrameId 亦残留未删
- 旧修复 a2f07fde0 仅加 1px 去抖但五个定时器 [0,32,80,160,320]ms 仍调用 updatePopper()；f5b858bd0 删定时器但保留 applyPopperStyle，根因均残留故测试复开

## 修复（第三次，最终）
- 对齐 MultiSelect.vue，把下拉定位交回 Element UI / Popper.js 单一数据源
- 删除 applyPopperStyle/getMaxLayerZIndex/queuePopperStyle/cancelQueuedPopperStyle/popperFrameId
- 仅保留 visible-change 事件透传（flowable 待办/流程/已办三页依赖），7 增 / 53 删
- 提交子模块 fix/bug-6173-select-jitter=5065633b2 → 合并 develop/v3.0.0=37e25da4d；父仓库 gitlink=2dc46e8，均推送远程
- 隔离 Playwright harness 验证无抖动；ESLint 0；build 通过；nginx 8098 冒烟正常（网关 8080 下线 502 与改动无关）

## 验证与状态
- 2026-11-04 tiany 标记解决，2026-11-09 lichandan 以「此现象仍存在」重开
- 同日第三次修复完成：彻底删除 applyPopperStyle 自定义定位，交回 Popper.js 单一数据源
- 禅道 DBX 事务化回写 resolved/fixed/trunk，resolvedBy=tiany，assignedTo=lichandan，resolvedDate 2026-11-09 19:58:49，zt_action 89715
- 网关 8080 关闭无法端到端复验；建议确认测试环境 58.210.252.230:9002 用 37e25da4d 重新构建部署（参考 bug 6084 旧缓存包教训）
- worktree D:\repository\苏州市房地产监测V3-wt-bug-6173 已 git worktree remove --force + prune 清理

<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6173",
  "source_extraction_id": "17e8f311c35f49688f7ec37d8b0ab647",
  "version": 4,
  "memory_type": "entities"
}
-->