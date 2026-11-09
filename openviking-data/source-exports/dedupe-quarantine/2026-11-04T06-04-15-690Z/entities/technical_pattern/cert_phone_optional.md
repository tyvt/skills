# Cert Phone Optional Validation
苏州市房地产监测V3 personnel certificate management page contact phone is optional with format-only validation.

## Problem
- Business requires contact phone to be optional on the personnel certificate detail page
- Original validation had `required: true` which forced input

## Solution
- In `zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`, remove `required: true` from `phone` validation
- Keep only `patterns.contactPhone` regex, allowing empty value to pass

## Files and Attribution
- Verification: src=苏州市房地产监测V3-leftover/122.md
- Involved files: company/personnelCertificate/detail.vue, company/staffManagement/components/certificatesDialog.vue
- Project: 苏州市房地产监测V3; source session: ec28a610-b81f-46da-83fd-dca3dbf806da; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_phone_optional",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 1,
  "memory_type": "entities"
}
-->