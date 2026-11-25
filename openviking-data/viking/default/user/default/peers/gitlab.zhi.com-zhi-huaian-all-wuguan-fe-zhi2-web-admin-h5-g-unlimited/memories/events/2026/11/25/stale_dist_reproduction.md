# Summary
On 2026-11-25 a completion-state general-vote detail page on the test environment showed 2 「表决明细」 blocks, confirming bug 6522; the cause was that the dist served on port 8157 was built at 09:39, before the `detail.vue:103` fix, so the browser ran the stale buggy bundle. The test env held 3 completion-state (bizState=2) NORMAL records to verify with.
# 2026-11-25 (Wednesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: Let me probe the decision list API on the test env (read-only) for completion-state NORMAL data.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: Test env has 3 NORMAL records, several with bizState=2 (completion state). Let me extract the key fields cleanly.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: Found 3 completion-state NORMAL records on test env. Let me open one directly via the detail route (path-segment id + `?formMode=view`, per handoff).
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: "表决明细" appears 2 times. But the test env serves the **local dist** (which may not include our uncommitted fix). Let me inspect the actual DOM structure to see if these are two real blocks or a tab + one block.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: The test env currently shows **2 real "表决明细" blocks** — the bug reproduces. But localhost:8157 serves the local `dist`, which may be stale (build not run). Let me check the source fix and whether dist is built.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited]**: The fix is in source (line 103 hides the first block for bizState=2), but the local `dist` was built at 09:39 — before the fix — so the browser shows the buggy 2 blocks. I need to rebuild dist with the fix, then re-verify. Let me check the build setup.

<!-- MEMORY_FIELDS
{
  "event_name": "stale_dist_reproduction",
  "goal": "Reproduce duplicate block bug",
  "summary": "On 2026-11-25 a completion-state general-vote detail page on the test environment showed 2 「表决明细」 blocks, confirming bug 6522; the cause was that the dist served on port 8157 was built at 09:39, before the `detail.vue:103` fix, so the browser ran the stale buggy bundle. The test env held 3 completion-state (bizState=2) NORMAL records to verify with.",
  "ranges": "101-111",
  "source_extraction_id": "54aef2698f6f4a73a4f2400bed449fa5",
  "version": 1,
  "memory_type": "events"
}
-->