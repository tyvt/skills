# SzForm Empty Validation Caused No Frontend Location
In 苏州市房地产监测V3 project, suzhou2016/mixins/szForm.js checkValidate() empty implementation caused no frontend validation on save and SzContent scroll to .is-error not triggered.

## Root Cause
- szForm.js checkValidate() empty implementation skipped frontend validation
- SzContent scroll to .is-error not triggered on save

## Fix
- Sz* components derive field name from v-model to render data-field anchor (components/fieldAnchor.js)
- SzContent.getFormData() validates per chapter, highlights first unfilled item, scrolls and interrupts save
- Required fields registered in suzhou2016/validation.js CHAPTER_REQUIRED by branch validation
- Channel 2 fallback intercepts backend errors

## Verification
- Evidence: src=苏州市房地产监测V3-rest/023.md
- Files: utils/request.js, contractContent.vue, contract/index.vue, indexFrame.js, SzContent.vue, szForm.js, chapter3.vue, mixin.js
- Project: 苏州市房地产监测V3; source session: 2ad932d3-7ddf-426e-a8a3-320e8d8f9b66; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "szform_validation_fix",
  "source_extraction_id": "189598b2f6764b21a56e2b7829ae5bc5",
  "version": 1,
  "memory_type": "entities"
}
-->