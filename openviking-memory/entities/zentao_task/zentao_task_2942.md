# ZenTao Task 2942
Zentao task 2942 is the rescue-workorder fill popup development task for property management area and warning-item selection.

## Requirements And Decisions
- Task 2942 (link `http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2942`; title "求援工单填报弹窗（物业管理区域 + 预警事项）") requires a popup to select "物业管理区域 + 预警事项" before filling a workorder.
- Three Zentao requirements: property users see their area's data; the property area defaults from the account's selected area, remains selectable, and choices are authorized areas; contact/phone autofill and are editable.
- Attachments fileID 24508/24509/24523 showed "请先选择预警事项", conflicting with the written "default current login area" requirement; on 2026-11-26 the user clarified there is no "current login area" field: use the property management area selected in the dropdown, login-field prefill was removed, and the core work became fixing the area dropdown data source.
- Audit: status valid, last checked 2026-11-27T00:51:38+08:00; flood C-end hit StageFilterDialog/RescueFillDialog/common/complex/page and task progress was true.

## Plan And Implementation
- A concise plan with todo_write steps and a plan file was drafted, sent to the orchestrator, approved (82 points, 0 P0), confirmed by the user on 2026-11-26, and its frontmatter was updated.
- Implementation wrote RescueFillDialog based on StageFilterDialog, fixed style references, updated index.vue and form.vue, removed form DEMO_COMPLEX; port 8150 was not listening, so a local static service was started and a browser was opened.
- The user chose to continue; the supplemental plan passed three reviews (82→86→91, all 0 P0); baseline and post-change builds were both DONE (job bash-b5b4060862cf4d5f) using a background task plus listener because the orchestrator structured channel refused.

## Related Files
- `index.vue:146-147`: property role shows the fill button and opens the dialog; `canFill=false` hides it when not logged in.
- `form.vue`: query validates and passes real complexId/eventId; lines 13-20 take login user realName/nickName/userName plus phone as editable contact/phone.

## Verification And Handoff
- hop1/2 used local 8150 plus sessionStorage to simulate property user wyqy; clicking fill opened the dialog; screenshots `task2942-dialog-20261126-104656.png` and `task2942-rescue-20261126-104402.png` are under `C:/Users/ADMINI~1/AppData/Local/Temp/`.
- hop2 screenshot passed self-check (1256×581) with popup title "填报工单", warning-item selection, property-area selection, and cancel/confirm; the user said requirements 2 and 3 were not reflected; hop3 found contact/phone autofill implemented by bug7002 logic while default login area was still missing.
- Contact/phone real-device E2E was blocked: the form page requires normal navigation after confirming from the list dialog (direct access redirects to login), and the local backend was not configured and returned "connection timed out".
- hop3 mock `/common/complex/page` returned authorized areas (观澜花园, 湖畔家园) with an injected property user; the area dropdown opened before warning selection; selecting area 观澜花园小区 and warning 台风蓝色预警, then switching warning, preserved the area; screenshot self-check was valid and nonempty.
- hop1 handoff doc `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-zentao-2942-rescue-dialog-hop1-20261126-1047.md`; hop2 was scheduled for 10:48; hop3 hard handoff doc `HANDOFF-CHAIN-zentao-2942-rescue-dialog-hop3-20261126-1106.md` (9 sections, chain_id/hop=3/maxHops=10, 4 remaining); next schedule `schedule-417f9435-a506-431f-a524-01c1acbe4f0c`, 11:07:08 (+15 seconds), new_once; pending next-hop work: form contact/phone screenshot, verification-gate confirmation, commit/push, and Zentao #2942 writeback with images; default action was to proceed unless the user said not to commit.

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2942",
  "source_extraction_id": "94e1c22f64e94304a58b58ba013cf026",
  "version": 6,
  "memory_type": "entities"
}
-->