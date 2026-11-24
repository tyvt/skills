# Summary
2026-11-24 定位禅道 6950 根因：惠山物管资金拨付作废调用 `/v2.0/benefit/pubAllotNotice/cancel/{id}` 时，`detail.vue` 第 1195 行使用 `method: 'get'`，而后端只接受 POST；参照同文件 `noticeDelay()`（949-957 行）的 POST 写法，将其改为一行 POST 调用（路径带 id、无 body）。基线构建与改后构建均 exit 0。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6950
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: I have the bug details. Key facts:
- **Bug 6950**: 【惠山物管】资金拨付作废请求的方式错误 (codeerror, severity 1)
- Error: `'/v2.0/benefit/pubAllotNotice/cancel/{id}', 不支持'GET'请求` — needs POST
- Page: `pubAllotNotice/{id}?formMode=view`

There's a relevant memory about the pubAllotNotice void button. Let me check it and the worktree state in parallel.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: The root cause is clear: line 1195 uses `method: 'get'` but backend requires POST. Let me verify the POST pattern used elsewhere in this file and confirm the backend expectation.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Root cause confirmed: line 1195 uses `method: 'get'` while an identical sibling action `noticeDelay()` (line 949-957) uses `method: 'post'`. Backend rejects GET per the log. The fix is a one-line change.

Before editing, per the rules I need a plan approved and a browser verification path. Let me check the deployment board for the environment address (required before bug reproduction/verification).
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Baseline build passed (exitCode 0, no pre-existing compile errors). The plan passed review. Backend source isn't in this frontend repo, but the runtime error log explicitly confirms the endpoint requires POST with the path id and no body — consistent with the one-line fix.

Per the plan-approval gate, I need your confirmation before editing:
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Now the one-line fix:
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Edit done. Let me verify the change and load the browser skill for the verification gate.

<!-- MEMORY_FIELDS
{
  "event_name": "资金拨付作废接口改POST",
  "goal": "修复作废请求方式",
  "summary": "2026-11-24 定位禅道 6950 根因：惠山物管资金拨付作废调用 `/v2.0/benefit/pubAllotNotice/cancel/{id}` 时，`detail.vue` 第 1195 行使用 `method: 'get'`，而后端只接受 POST；参照同文件 `noticeDelay()`（949-957 行）的 POST 写法，将其改为一行 POST 调用（路径带 id、无 body）。基线构建与改后构建均 exit 0。",
  "ranges": "0,22,39-43,86,92-94",
  "source_extraction_id": "167d821d1dd24e2d9d22c3c8445cedad",
  "version": 1,
  "memory_type": "events"
}
-->