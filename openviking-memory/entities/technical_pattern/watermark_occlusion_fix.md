# Watermark Occlusion By High Z-index Components
Detail page sticky bar and table fixed columns blocked watermark; fixed by body-level watermark.

## Description
- Project: 苏州市房地产监测V3 (zhi2-web-admin).
- Sticky operation bar (z-index:14), table fixed columns (12-13), v-loading mask (2000) higher than #app-main watermark (z-index:5) caused occlusion.
- Local watermark invisible in those areas.

## Fix
- Mount watermark layer on document.body with position:fixed, update alignment via ResizeObserver and scroll/resize.
- Global z-index:1990 to avoid blocking Element dialogs.

## Verification
- Evidence: src=苏州市房地产监测V3-rest/086.md
- Source session: 0f975e81-59d4-42d7-853f-761ce72bd1f7
- Files: AppMain.vue, detail-template.vue, index.scss, HeadTitle/index.vue, Headline/index.vue, layout/index.vue, OperationBtnGroup/index.vue, element-ui.scss

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：0f975e81-59d4-42d7-853f-761ce72bd1f7


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "watermark_occlusion_fix",
  "source_extraction_id": "00d57bddf9a64d5a9050828e7fc3d93f",
  "version": 1,
  "memory_type": "entities"
}
-->
