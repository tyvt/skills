# 禅道 bug 6950 资金拨付作废请求方式错误
惠山物管资金拨付通知详情页的作废操作前端用 GET 调后端接口，而后端只接受 POST，属一级代码错误。

## 缺陷信息
- 禅道 bugID 6950（惠山物管），类型 codeerror、严重程度 1。
- 页面 `pubAllotNotice/{id}?formMode=view`；报错：`/v2.0/benefit/pubAllotNotice/cancel/{id}` 不支持 'GET' 请求。

## 根因与修复
- 根因：`detail.vue` 第 1195 行 `method: 'get'`；同文件同类操作 `noticeDelay()`（949-957 行）用 `method: 'post'`。
- 修复：改为 POST（路径带 id、无 body）；后端源码不在前端仓库，依据运行时日志与 reviewer 的 P1 意见确认。
- 修复计划补 e2e 验证声明后过审并经用户确认；基线构建与改后构建均 exit 0。

## 状态与交接
- 2026-11-24 未完成实机验证：本地 8119 网关未切生产、前端验证门无截图，故未提交、未回写禅道。
- 未完成项写入交接文档 `HANDOFF-CHAIN-bug6950-cancel-get-to-post-hop1-20261124-1729.md`；新会话排程 2026-11-24 17:29:46（new_once，id `schedule-ff368f28…`）。

<!-- MEMORY_FIELDS
{
  "category": "任务",
  "name": "bug6950_cancel_request_method",
  "source_extraction_id": "167d821d1dd24e2d9d22c3c8445cedad",
  "version": 1,
  "memory_type": "entities"
}
-->