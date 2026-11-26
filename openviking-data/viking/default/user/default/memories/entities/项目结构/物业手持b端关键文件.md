# Property Handheld B Terminal Key Files
Property Handheld B Terminal repository contains core workbench, inspection, facility, and H5 handoff files.

## Key Pages
- Workbench entry: `src/pages/workbench/index.vue`.
- Webview carrier page: `src/pages/webview/index.vue`; registered in `pages.json`.
- Inspection record list and add page: `src/pages_facility/record/index.vue` and `src/pages_facility/record/add.vue`; the add page contains step add/delete logic.
- Read-only inspection record detail and facility device detail entry: `src/pages_facility/record/detail.vue` and `src/pages_facility/facility/facilityDetail.vue`.
- H5 base config and workbench jump helpers: `src/env/mp.js` exports `H5_BASE`; `h5RouteMap` and `openH5` are in `src/pages/workbench/index.vue`.

## Shared Components
- Image upload component: `src/components/ZsUploader/ZsUploader.vue`.
- Dialog component: `src/components/ZsDialog/ZsDialog.vue`.

## Verification and Attribution
- Verification evidence: extracted source=cursor project=物业手持B端.
- Files referenced in the source extraction: `src/pages/workbench/index.vue`, `src/pages_facility/record/index.vue`, `src/pages_facility/record/add.vue`, `src/pages_facility/record/detail.vue`.
- Project: 物业手持B端.
- Source session ID: `44acf323-b57a-4493-a6bb-8786b84965af`.
- Code baseline: none.

<!-- MEMORY_FIELDS
{
  "category": "项目结构",
  "name": "物业手持B端关键文件",
  "source_extraction_id": "bc6d452cfd124739aafa9f85145de753",
  "version": 2,
  "memory_type": "entities"
}
-->