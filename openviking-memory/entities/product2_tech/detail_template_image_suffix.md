# DetailTemplate type:image suffix mismatch blocks extensionless image display
DetailTemplate's type:'image' only renders <img> when the suffix matches jpg/jpeg/png/gif/bmp/webp/svg; extensionless internal addresses are misjudged as attachment links and not displayed.

## Root Cause
- Original logic decides whether to render <img> or an attachment link by a file-suffix whitelist (jpg/jpeg/png/gif/bmp/webp/svg)
- Extensionless internal resource addresses match no suffix and are treated as attachment links, so images fail to display

## Solution
- Change the type from type:'image' to type:'images'
- Add a computed property stepPictureUrlList that provides a URL array
- Let resolveServerAssetUrl directly concatenate <img> for display, no longer relying on suffix matching

## Verification and Attribution
- Verification: session 321b7eb6 conclusion, src=产品2.0/057.md
- Involved files: zhi2-web-admin/src/views/dataProperty/scrappedRecord/detail.vue、src/mixins/detailMixins.js、src/views/maintenance/facility/components/FacilitySelectDialog.vue、src/mixins/form.js、src/views/dataProperty/recordProcess/components/detail.vue、src/views/property/complexDeliveryApply/components/facilityDialog.vue、src/views/maintenance/repair/detail.vue、src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue
- Project: 产品2.0; source session: 321b7eb6-d1b4-4f6b-865c-11661215d619; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "detail_template_image_suffix",
  "source_extraction_id": "2618dad3089247029330eb677f274518",
  "version": 1,
  "memory_type": "entities"
}
-->