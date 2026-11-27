# Bug7043 Heatmap Clip Chain
Handoff chain for chain_id=bug7043-heatmap-clip, created to finish Suzhou housing flood-screen heatmap clipping for Zentao bug7043 and terminated on 2026-11-27 after all seven hop14 todos were cleared.

## Goals and Rules
- Goal: clip the heatmap to the selected district boundary while preserving the whole-city outline; real-machine screenshot confirmation authorized commit/push and Zentao resolved/fixed writeback under the confirmation-means-submit rule.
- Handoff documents use 9 sections and numbered todo clearing; termination is defined by all todos being cleared, not by hop count, and no hop is marked final.
- The document specified maxHops=10 while session rules had no maximum; the chain followed document priority for continuity but stopped only when todos were empty, and hop14 correctly scheduled no next hop.
- Forbidden repeats were login, ECharts positioning, convertToPixel evidence, DBX bug query, initial plan review, and hop6-hop12 diagnosis.
- MSYS bash did not apply TZ (a displayed 04:16 time was UTC), so Shanghai time had to be converted explicitly.

## Technical Data and Worktree
- `areaOptions[0]` is the whole-district sentinel (`value=''`, `code=320508`); street items use 9-digit `value/code`, and the whole-city fallback has `code=''`.
- hop6 verified districts shape, `index.vue` value/code semantics, `applyDistrictClip` call timing with async `areaOptions`/`districts`, and scope shape.
- The original clip gap was at `HeatMapPanel.vue:269-277`, where `raw=''` prevented clipPath generation; hop6 normalized raw/9-digit codes, cleared clipping for no district match, and added `watch.districts` at `:99-108`.
- hop6 changed `applyDistrictClip` at `HeatMapPanel.vue:269-289` without changing polygon path generation; verification passed single-file eslint, screen eslint, and `npm test` (buildTime 13:22:58, gitHash `3e7e33963`).
- Worktree: changes were in main checkout `develop/v2.6.2-suzhufang` and a screen-motion worktree; only `HeatMapPanel.vue` and `docs/flood/common-errors.md` were ours, while `ScreenHeader.vue`, `particles.js`, and `_review.json` were not included.

## Early Timeline
- Early work included DBX bug query, attachment `24727`, original plan review, eslint/build, login, whitebox `320508` clipPath, and a 46s build job `bash-e086e3b9db844cfc`.
- hop1 doc `HANDOFF-CHAIN-bug7043-heatmap-clip-hop1-20261127-1201.md` was delivered by `schedule-52199989-bb5e-4dd3-a0fa-d0948fca8a2c` to session `session-e0dc60d1`.
- hop4 produced/reviewed the rework plan, rechecked anchors, wrote a handoff, and scheduled hop5; hop5 confirmed the plan, read anchors `HeatMapPanel.vue:262/269-277/92-103` and `index.vue:340-352/35-39`.
- hop6 doc `HANDOFF-CHAIN-bug7043-heatmap-clip-hop6-20261127-1323.md` scheduled hop7 at 13:24:38 (`schedule-2377514a…`); hop7 used session `bug7043-e91695ee90b8` at `http://localhost:8165/#/safety/flood/floodScreen`, where captcha `7-1=6` failed, `2+5=7` passed, and a covered login button needed eval.
- hop7 failed validation (clip on canvas index2 but heat still spilled), saved `gusu-clip-rework-20261127-132850.png` under `$TEMP/zentao-7043/`, wrote `D:/plan/苏住房G/HANDOFF-CHAIN-bug7043-heatmap-clip-hop7-20261127-1329.md`, and scheduled hop8 at 13:30:16.

## Later Timeline and Closure
- hop8 was read-only (`render :188-239` defined zlevels 2/3/4, `applyDistrictClip:271` clipped only zlevel=2, a broad canvas eval hung and was killed); doc `D:/plan/苏住房G/HANDOFF-CHAIN-bug7043-heatmap-clip-hop8-20261127-1334.md`, hop9 at 13:34:49 (`schedule-5e1458a4-653b-40c8-95ca-75419e3ad470`).
- hop9 proved only index2 had clip-path, adding clip to index3/4 did not help, CSS 488×383 vs buffer 913×716 (≈1.871) explained the old `M418.14 370.66…` overflow, divided path `M223.44 198.07` clipped Gusu, and index2-only clip stopped ripple spill; Windows nested quotes broke commands, so outer double quotes with single-quoted JS were used.
- hop9 doc `D:/plan/苏住房G/HANDOFF-CHAIN-bug7043-heatmap-clip-hop9-20261127-1337.md` scheduled hop10 at 13:38:20; hop10 confirmed the approved plan, baseline build 11:58 exit 0, added sx/sy conversion at `HeatMapPanel.vue:303-317`, passed eslint, wrote `HANDOFF-CHAIN-bug7043-heatmap-clip-hop10-20261127-1340.md`, and scheduled hop11 at 13:40:39 (`schedule-1562ac10…`).
- hop11 was rejected with wrong submodule `16c89c9ce`/parent `1bc6f80c`, wrong screenshot fileID `24784`, and dist 13:47:57/`16c89c9ce`; hop13 (called hop12 by the reminder but hop13 by document priority) identified sx/sy, wrote `HANDOFF-CHAIN-bug7043-heatmap-clip-hop13-20261127-1416.md`, and scheduled hop14 at 14:21:47 (`schedule-5544f792…`, `session-47d24179…`).
- hop14 passed baseline job `bash-9498645142fd412a` (exit 0, 50s), rebuilt via `bash-b2f36894621b4224` (exit 0, buildTime 14:24:48, dist newer than source 14:24:15), verified with session `bug7043-fix3-e91695ee90b8` and screenshot `C:/Users/Administrator/AppData/Local/Temp/zentao-7043/flood-gusu-mapzoom-20261127-142704.png` (five format checks), then completed commit/push, Zentao correction, cleanup, and chain termination; cost triggers were hop7 154k, hop8 153k, hop9 160k, hop10 151k, hop13 1.02M.


<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "bug7043_heatmap_clip",
  "source_extraction_id": "8d1927630ae345d1939e4bb5146adec6",
  "version": 8,
  "memory_type": "entities"
}
-->