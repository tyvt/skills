# Zentao Bug 7043
Suzhou housing flood big-screen heatmap bug: selecting "Gusu District (whole district)" caused the red heat center to be offset and spill into Huqiu, Xiangcheng, and Wuzhong; the corrected fix was verified and delivered on 2026-11-27.

## Ticket
- Link: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7043; type=Page; severity=4.
- Created by lichandan; originally assigned to tiany; current status resolved/fixed, resolvedBy=tiany, assignedTo=lichandan.
- Product=79, project=141, execution=142.
- User chose "clip heatmap to selected district boundary" and required commit/push plus Zentao writeback.
- On 2026-11-27 the user rejected hop11 because "the heatmap area was offset and not in Gusu District."

## Technical Cause and Fix
- `HeatMapPanel.vue` uses ECharts `type:'heatmap'` with `pointSize:46, blurSize:62`; heat is drawn as canvas rectangles, not administrative polygons.
- `activeDistrict` was passed in but unused in `render()`, so selecting Gusu still drew the whole city and spilled outside.
- Fix applies CSS `clip-path` polygon only to zlevel=2 heat canvas, using selected district GeoJSON through `convertToPixel`; zlevels are geo=0, heat=2, effectScatter=3, label=4.
- Gusu District has one ring and no holes; the implementation supports GeoJSON ring direction with nonzero fill for holes and traverses all MultiPolygon outer rings.
- Final cause: under the big-screen scale, `getBoundingClientRect`/DOM ratio scaling (`sx≈0.654`, `sy` likewise) was wrongly applied to `convertToPixel` coordinates; the fix removes sx/sy and uses local 913-space values directly.

## Verification and Delivery
- `HeatMapPanel.vue:303-317` now drops rect/sx/sy scaling and builds the path directly from `convertToPixel`, still clipping only zlevel=2; `common-errors.md:644-647` records the corrected cause.
- Runtime verification on 2026-11-27: clipPath first point `M 417.82 373.76` matched `convertToPixel` first point `[417.82, 373.76]`; pre-fix value was scaled `M 273.11 244.31`.
- Heat center `[433.75, 407.47]` is in the same 913-space and the user confirmed the red heat was inside Gusu with no spill into neighbors.
- Single-file eslint exited 0; `npm test` exited 0; the post-commit rebuild had `version.json` gitHash `e6d52ed2c` matching HEAD.
- Submodule commit/push `e6d52ed2` and parent gitlink/push `f01df272` were verified; only `common-errors.md` and `HeatMapPanel.vue` were committed, while others' dirty `ScreenHeader.vue`, `particles.js`, and `_review.json` were left untouched.

## Zentao Update and Cleanup
- Hop11 had wrongly pushed submodule `16c89c9ce` / parent `1bc6f80c`, set resolved/fixed with wrong screenshot fileID `24784`; this was corrected in hop14.
- Zentao correction comment action `101243` attached new image fileIDs `24805` (map zoom) and `24806` (full screen), and old image `24784` was withdrawn; status remained resolved/fixed, resolvedBy=tiany, assignedTo=lichandan.
- Commit checks found ahead=0/behind=0; after checkout alignment, parent gitlink pointed to `e6d52ed2`, and remote parent was `f01df272`.
- Temporary screenshots, `.task-state/`, and the browser session were cleaned after images were present in both the session and Zentao.
- The chain was terminated with no pending items and no next hop.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7043",
  "source_extraction_id": "8d1927630ae345d1939e4bb5146adec6",
  "version": 6,
  "memory_type": "entities"
}
-->