# Bug6173 下拉抖动调查
禅道 bug 6173：价格备案申请（recordPriceMngSuzhou）维护户室弹窗 PriceTableDialog.vue 中户型 zs-select 下拉打开时出现抖动，三次修复后最终解决。

## 问题根因（最终确认）
- SingleSelect.vue 保留 applyPopperStyle 与 getMaxLayerZIndex，每次下拉打开经 requestAnimationFrame+$nextTick 触发
- getMaxLayerZIndex 对 .v-modal/.el-dialog__wrapper/.el-select-dropdown/.el-popper 做 querySelectorAll + getComputedStyle，强制整页同步重排
- 随后在 Popper.js 定位之后手写 width/minWidth/zIndex，z-index 取"当前最大层 +10"会基于自己上一轮抬高值反馈放大，与 Popper.js 单一数据源互相覆盖 → 抖动
- 前两次修复（a2f07fde0 debounce、f5b858bd0 remove-timers-keep-applyPopperStyle）均未删除 applyPopperStyle，故根因残留、测试复开

## 最终修复（第三次）
- 删除 applyPopperStyle/getMaxLayerZIndex/queuePopperStyle/cancelQueuedPopperStyle/popperFrameId
- 仅保留 visible-change 事件透传（3 个 flowable 页面依赖），下拉定位/宽度/层级全部交回 Element UI / Popper.js（与 MultiSelect 一致）
- 7 增 / 53 删；隔离 Playwright harness 验证 popper 宽度=选择框、弹窗内下拉 z-index 高于遮罩、无漂移/掉帧
- ESLint 退出码 0；npm run build 通过（仅存量 Sass 弃用告警）；nginx 8098 部署冒烟正常（唯一报错为网关 8080 下线 502，与改动无关）
- 提交子模块 fix/bug-6173-select-jitter=5065633b2 → 合并 develop/v3.0.0=37e25da4d 并推送；父仓库 gitlink=2dc46e8 并推送
- 禅道回写 status=resolved/resolution=fixed/resolvedBuild=trunk/resolvedBy=tiany/assignedTo=lichandan，zt_action 89715
- 网关 8080 关闭无法端到端复验；建议确认测试环境 58.210.252.230:9002 已用 37e25da4d 重新构建（参考 bug 6084 旧缓存包教训）

## 相关代码与约束
- 正确 worktree 为嵌套父仓库 D:\repository\苏州市房地产监测V3-wt-bug-6173 + 子模块 zhi2-web-admin
- SingleSelect.vue 的 .zs-select-popper class 在 JS 中存在但无 CSS 规则；zs-dialog 未设 z-index:9999
- 历史 dialog_select_fix 宽度同步为页面级显式 width（非 JS 宽度同步），Element UI 自动设 popper min-width，JS 宽度同步冗余可删，flex 压缩场景已由页面显式 width 解决

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bug6173_select_jitter",
  "source_extraction_id": "17e8f311c35f49688f7ec37d8b0ab647",
  "version": 3,
  "memory_type": "entities"
}
-->