# ZenTao Bug 7025
The home-page key-data navigation card title on zhi2-web-admin (Suzhou Housing G) wrapped and was obscured by its value when the left menu was expanded; hop2 on 2026-11-26 completed the fix, commit/push and ZenTao write-back, ending the chain on Section 4 clearance rather than a hop limit.

## Symptoms
- ZenTao link http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7025; chain_id=bug7025-key-data-nav.
- With the left menu expanded, the title "专业化物业管理住宅小区面积（万㎡）" wrapped and its last line "(万㎡)" was obscured by the value container; with the menu collapsed the title was single-line (expected).
- Tester screenshot 1614×894 at 1614px viewport with menu expanded; local reproduction showed the card narrowing, label about 71px wide and wrapping to 4 lines.

## Root Cause
- `KeyDataNav.vue:382-394` `.kd__label` lacked nowrap/ellipsis alongside `.kd__value`; parent `SectionCard.vue:126-128` overflow-y:hidden clipped/obscured the wrapped last line.
- DOM geometry measured label bottom 345 and value top 347 with no literal overlap; visual recognition had misread it, so precise crop comparison was needed and the parent fixed height/overflow was authoritative.
- Login reproduction: arithmetic CAPTCHA (9+4=13); the covered `data-testid="login-submit"` was bypassed with a direct JS click; menu toggling used `.hamburger-svg`.

## Fix and Commit
- The fix changed only 3 CSS lines at `KeyDataNav.vue:382-389`; the commit staged only that file, leaving the 3 other dirty files untouched.
- Verification gate was completed in hop1 and not rerun: eslint exit 0, baseline and post-change builds exit 0, agent-browser live screenshot placed in-session and user `verify_ok3` confirmation.
- Submodule HEAD `5c5afbafe609d7ec7eabfeb62d0af1c1c8bf5a55` (short `5c5afbafe6`) and parent gitlink `d64cc6b4f4` were pushed with both ends' `git ls-remote` SHAs matching; post-commit build `version.json.gitHash=5c5afbafe` == HEAD (Sass deprecation warnings only).

## Write-back and Cleanup
- In the new ZenTao DB, an idempotency check found no prior comment; a committed transaction set `zt_bug#7025` to resolved/fixed, resolvedBy=tiany, assigned back to openedBy=lichandan, with `zt_action#100555` comment containing `<img>{24646.png}</img>` and attachment fileID=24646 linked to the bug.
- Deploy panel correction: the stale `frontend_url` 8101 was changed to local=8165 and test=8167, with other fields unchanged.
- Cleanup, done only after the image was in-session and landed in ZenTao: browser sessions `b7025*` closed, `zentao-7025/` directory and all `bug7025-*.png` deleted.
- Handoff: hop1 wrote a 9-section document `D:/plan/苏住房G/HANDOFF-CHAIN-bug7025-key-data-nav-hop1-20261126-1700.md` and scheduled `schedule-b4d95690...` at 17:01:43; hop2 finished all 7 Section-4 todos with no hop3. The `maxHops:10` frontmatter conflicted with Section 48/AGENTS.md "no hop limit, judge by Section 4 clearance", so the latter was followed.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7025",
  "source_extraction_id": "4856e58eda7d41659d931018e4fc07f3",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->