# Contract Dynamic Component Prop Mapping
In Suzhou Real Estate Monitoring V3, after removing global registration, dynamic components rely on prop-passed mapping to eliminate unknown component warnings.
## Root Cause
- `contractContent.vue` originally depended on global `Vue.component` and `require.context` for dynamic components
## Solution
- `contractContent.vue` added `chapterComponents` prop to receive component mapping
- `contract/index.vue` and `stock/contract/detail.vue` use `import.meta.glob` to build mapping and remove `Vue.component` and `require.context`
- Pass via prop to eliminate unknown component warning
## Verification
- Evidence: src=苏州市房地产监测V3-rest/051.md
- Files: contractContent.vue, pre/data.js, contract/index.vue, indexFrame.js, pre/chapter1.vue, stock/contract/detail.vue, package.json, main.js
- Source session: fe9ef9d6-919d-4d8f-b826-5f333b310c11; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contract_dynamic_component",
  "source_extraction_id": "e5022fce1d6e4a71b2e61d2235605578",
  "version": 1,
  "memory_type": "entities"
}
-->