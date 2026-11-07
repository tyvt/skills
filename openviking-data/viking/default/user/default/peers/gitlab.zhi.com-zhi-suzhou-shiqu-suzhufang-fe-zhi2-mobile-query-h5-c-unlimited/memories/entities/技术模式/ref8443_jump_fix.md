# ref8443跳转逻辑修复
苏住房C H5 ref8443 构建的历史页/填报页/详情页跳转逻辑排查与修复（2026-11-06）。

## 问题背景
- 用户反馈填报页面汛后没有跳转到对应填报或详情页面，要求全部排查一遍

## 排查出的跳转 Bug 与修复
- 历史页「继续填报」：`tab==='mid'?goMid():goPre()` 导致汛后 tab 跳成汛前表单；改为按 tab 分派的 `goFill()`（pre→pre, mid→mid, post→post）
- 历史页「查看详情/查看草稿」：详情目标硬编码 `kind=pre`；改为 `kind=${tab.value}` 跟随当前 tab
- 填报页提交/暂存：`navigateTo` 回历史导致重复压栈；改 `redirectTo` 回历史
- 求援表单提交：橙按钮无 handler 无反应；提交 → 求援工单详情（对齐参考站 `go("rescue-detail")`）
- 详情页「上报/立即受理」：用 `navigateBack` 从独立进入时回错页；改为 `reLaunch`/`redirectTo` 回历史（对齐参考站 `go("history")`）

## 全量跳转矩阵验证
- pre 继续填报 → inspection/index?kind=pre
- post 继续填报 → inspection/index?kind=post（原 bug 已修）
- mid 继续填报 → inspection/index?kind=mid
- post 查看详情 → detail/index?...&kind=post
- 查看草稿 → detail/index?...&kind=<当前tab>
- 求援详情 → detail/index?...&kind=rescue
- post/mid 提交 → history/index
- rescue 提交 → detail/index?...&kind=rescue
- detail 上报/立即受理 → history/index
- mid 紧急求救 → rescue/index
- rescue 返回 → inspection/index?kind=mid

## 验证与归属
- 验证证据：2026-11-06 会话消息 0-67（Lead 报告，助手排查修复）
- 结构+布局 gate 7/7 通过；像素 gate 无回归（5.06%–9.32%）
- 本地提交 `8349156 fix(ref8443): tab-aware history jumps...`（未推送）
- 确认生产（非 ref8443）默认历史页跳转未受影响
- 所属项目：苏住房C（zhi2-mobile-shimin）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_jump_fix",
  "source_extraction_id": "e6976f4e59f24b80b343c3ab24a61785",
  "version": 1,
  "memory_type": "entities"
}
-->