# Summary
On 2026-11-11, an E25 entry was added to zhi2-web-admin/docs/flood/common-errors.md documenting bug 6369's .txt download regression. The entry records the trigger scenario, root cause, fix, verification status, unverified items, and residual risks. It was inserted after the E21 entry (the original /login redirect bug 6369 in the same download chain), keeping the 6369 story together in the ledger.
# 2026-11-11 (Wednesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: The 8 errors (lines 24–62) are in the original `GET`/`DELETE` helpers — **pre-existing**, untouched by my edit. My changes (the `saveBlobToFile` helpers at ~72 and `downloadGet` at ~214) produced **zero** new lint errors. Per the project rule I run targeted eslint, not full lint; these pre-existing style issues are out of scope for this bug fix.

Now I must update the flood common-errors ledger. Let me read it.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: E21 is the original bug 6369 (the `/login` redirect). The `.txt` regression is the follow-up. Let me read the rest of the ledger to find the latest entry and the right place to add a new one.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: This is bug 6369's second regression. The ledger already has E21 (the `/login` redirect, same download chain). I'll add a new E25 row to the summary table and a detailed section documenting the `.txt` root cause and fix. First, the summary table row:
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Now insert the detailed section right after the E21 entry (keeping the 6369 story together):

<!-- MEMORY_FIELDS
{
  "event_name": "flood_ledger_e25_added",
  "goal": "Document E25 in error ledger",
  "summary": "On 2026-11-11, an E25 entry was added to zhi2-web-admin/docs/flood/common-errors.md documenting bug 6369's .txt download regression. The entry records the trigger scenario, root cause, fix, verification status, unverified items, and residual risks. It was inserted after the E21 entry (the original /login redirect bug 6369 in the same download chain), keeping the 6369 story together in the ledger.",
  "ranges": "14,16,20,22",
  "source_extraction_id": "8a7d300965db42f5b0abfae30df1cfee",
  "version": 1,
  "memory_type": "events"
}
-->