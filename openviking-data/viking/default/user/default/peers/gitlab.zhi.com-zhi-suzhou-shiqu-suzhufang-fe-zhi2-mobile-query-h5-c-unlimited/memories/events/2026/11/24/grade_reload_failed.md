# Summary
On 2026-11-24 verification of bug 6931 showed the core function failing: three `POST /check/start` calls sent `gradeComprehensiveLevel` as empty, "1" and "2", but the deployed backend always returned "3" (市标三级) and the returned question contentId sets were identical, so changing the grade did not reload questions; the next hop must determine whether the deployed backend ignores the grade parameter or the front-end call is wrong.
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: PowerShell parse error — the script didn't run. Let me redo with a simpler path variable.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The picker label now reads "市标三级 ›" (all options + current value). Let me view the screenshot to confirm the grade changed and questions reloaded.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The score reset to 0 (answers cleared as warned), but the displayed grade still shows 市标三级 — the change to 市标一级 may not have applied. Let me inspect the code to understand whether this is a real bug or a test interaction issue.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The grade change cleared answers (reload happened) but the displayed grade stayed 市标三级. This could be a mapping issue. Let me check `gradeFieldByServiceType` and the option values.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Let me check the compiled JS (runtime uses it) and inspect the network request when changing grade.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The score reset confirms reload happened, but the grade stayed 市标三级 — a possible real bug. Let me capture the network request to see what grade value was sent to the backend.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Let me check the captured network requests for the startCheck API call to see what grade was sent and returned.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Two startCheck calls — the initial one and the grade-change reload. Let me inspect the second one's request body and response.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The grade-change request correctly sent `gradeComprehensiveLevel:"1"` (市标一级) plus all other grades. Let me check the response to see what the backend returned.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: I found a potential issue: the request sent `gradeComprehensiveLevel:"1"` but the backend returned `"3"` (reverted). Let me test with another grade to determine if this is grade-specific or systemic.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The core feature appears broken: the request sent `gradeComprehensiveLevel:"2"` but the backend returned `"3"` (registered grade), and the category still shows 市标三级. Let me verify the backend contract to determine root cause before reporting.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Let me look at the `initItems` method where grade params are consumed — checking how the 5 grade inputs are used.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The network evidence shows the backend ignores the incoming `gradeComprehensiveLevel` (sent "1"/"2", returned "3"). Let me check the backend `check/start` flow to determine if this is a real defect or environment mismatch.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: I found the likely root cause: `H5StdEvalCheckServiceImpl.start()` builds `initDto` with only `complexId`/`checkType`, not the 5 grade params. But this endpoint returned `checkRecordId:null` (local draft), so let me check the controller mapping for `check/start`.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The response was a full form with `checkRecordId:null`, not a Long ID from `/start`. Let me check which endpoint the frontend `startCheck` actually calls.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The deployed backend returns a form (local draft), but the source I read creates a record — a version mismatch. Let me find the actual backend version handling grade params.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Let me stop the broad background search and do a definitive check: compare the actual question sets (itemList) between the initial start and the grade-change request.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The question sets are **identical** across all requests — changing the grade does NOT reload questions. This is a real functional gap. Let me find the deployed backend version (returns form, not ID) to determine if grade params are wired there.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: I have decisive evidence. Let me confirm the current on-screen state before reporting.

<!-- MEMORY_FIELDS
{
  "event_name": "grade_reload_failed",
  "goal": "report failed grade reload",
  "summary": "On 2026-11-24 verification of bug 6931 showed the core function failing: three `POST /check/start` calls sent `gradeComprehensiveLevel` as empty, \"1\" and \"2\", but the deployed backend always returned \"3\" (市标三级) and the returned question contentId sets were identical, so changing the grade did not reload questions; the next hop must determine whether the deployed backend ignores the grade parameter or the front-end call is wrong.",
  "ranges": "177-231",
  "source_extraction_id": "79aee5d78263439389bc42ca9a6d3916",
  "version": 1,
  "memory_type": "events"
}
-->