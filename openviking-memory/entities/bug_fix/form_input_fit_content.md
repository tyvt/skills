# FormInput fitContent Bug
FormInput misreads $el when fitContent is not true, causing Vue warning; fix measures width only when fitContent true.

## Problem
- FormInput triggered Vue warning by accessing `$el` when `fitContent` was not true

## Fix
- Only measure width when `fitContent` is true
- Read `clientWidth` via outer `span` `inputWrap` ref to avoid unmounted access

## Attribution
- Source session: b7e96737-7bf9-4f61-9517-70baf4f0966c
- Project: 苏州市房地产监测V3
- Files: contract/components/formInput.vue, hashTitle.vue, chapter2.vue, formComp.js, originalTip.vue, contractContent.vue, chapter3.vue, index.vue

<!-- MEMORY_FIELDS
{
  "category": "bug_fix",
  "name": "form_input_fit_content",
  "source_extraction_id": "6c363dc7a77448a1a17cc850c32df4b1",
  "version": 1,
  "memory_type": "entities"
}
-->