# Summary
2026-11-24 读取 nginx 8101 配置，确认其代理指向 dev 网关 `suzhou.dev.zhi.com`，而禅道 6899 的 bug 数据位于测试库，结论是需临时把代理切到测试网关（备份→改→reload→验证→恢复）才能实机验证。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 继续。先用未受限的 dbx 验证「8101 代理指向 dev 库」假设——查下拉 6 事件是否在 dev 库：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 下拉 6 事件确认在 **dev 库**（苏住房dev），目标事件不在 dev 库——8101 后端连的是 dev 数据，而 bug 数据在**测试库**。继续取证：读 nginx conf 与 env 配置确认代理目标：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: conf 已确认：8101 代理指向 **dev 网关**（`suzhou.dev.zhi.com`），而 bug 数据在测试库。先查禅道 6899 工单的 steps 确认报告环境，再定验证路径：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 工单确认：报告人在「新增检查类型」事件下复现——即**测试环境**（该事件只在测试库存在）。本地 8101 代理指向 dev 网关，看不到 bug 数据。验证路径：临时把 nginx 代理切到测试网关（备份→改→reload→验证→恢复，防汛 C 端有先例）。先备份并确认 nginx 实际加载的 conf：

<!-- MEMORY_FIELDS
{
  "event_name": "nginx代理指向dev网关确认",
  "goal": "确认代理后端环境",
  "summary": "2026-11-24 读取 nginx 8101 配置，确认其代理指向 dev 网关 `suzhou.dev.zhi.com`，而禅道 6899 的 bug 数据位于测试库，结论是需临时把代理切到测试网关（备份→改→reload→验证→恢复）才能实机验证。",
  "ranges": "48-56",
  "source_extraction_id": "8fbd2340a8cf40eda6f8c7ab8cc80444",
  "version": 1,
  "memory_type": "events"
}
-->