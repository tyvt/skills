# Register sm-12 Column Width
Single-page register form style only treats sm-12 as half column, causing sm-16 columns to be 1/3 width.

## Problem
- `src/styles/register-form.scss:90` only maps `el-col-sm-12` as half column
- `:sm="16"` falls back to element default `lg/xl=8` width (1/3) causing right edge shortage

## Fix
- Change `:sm="16"` to `:sm="12"` in CompanyRegisterSingleForm.vue:56 and InstitutionRegisterSingleForm.vue:57,:156

## Attribution
- Source session: 01a1668f-182b-764e-99b7-4185995a2d99
- Project: 苏州市房地产监测V3
- Files: register-form.scss, CompanyRegisterSingleForm.vue, InstitutionRegisterSingleForm.vue, measure-register.mjs

<!-- MEMORY_FIELDS
{
  "category": "style_fix",
  "name": "register_sm12_col_width",
  "source_extraction_id": "6c363dc7a77448a1a17cc850c32df4b1",
  "version": 1,
  "memory_type": "entities"
}
-->