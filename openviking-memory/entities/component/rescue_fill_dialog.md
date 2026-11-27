# Rescue Fill Dialog
RescueFillDialog is the Vue popup component used by ZenTao task 2942 to select warning item and property management area before rescue workorder filling.

## Role And Structure
- Reuses StageFilterDialog, a reusable filter dialog component for pre-fill selection; reuse was confirmed by checking StageFilterDialog references, rescue APIs, and deployment config.
- Shows flood warning plus property area; at RescueFillDialog.vue:13-22 the selected area starts empty, and before the fix L48-57 required choosing a warning item first.
- complexSeq at RescueFillDialog.vue:33-45 handles the area-loading race; the existing mechanism was retained instead of adding a new one.

## Area Loading Changes
- On 2026-11-26 hop3 applied five changes: loadComplex passes useCommonApi=true.
- openAreaDropdown/toggleAreaDropdown removed the eventId gate; pickAlert no longer clears an already selected area when switching warning items.
- The area template input removed eventId-dependent disabled/placeholder text; onMounted proactively loads authorized areas once.
- The rescue area dropdown must use /common/complex/page (flood.ts:527-537), not /plan/complexPage; LoginUserInfo has no area field.

<!-- MEMORY_FIELDS
{
  "category": "component",
  "name": "rescue_fill_dialog",
  "source_extraction_id": "3d60b2cc60094be1b06db28c7afb6cb5",
  "version": 1,
  "memory_type": "entities"
}
-->