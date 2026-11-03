# zsDialog No Small Size Fix
zsDialog only supports mini(616px x 60vh) and medium, with no small size; misusing zs-size="small" removes size limit and stretches the import dialog, so fix with mini and custom height styles.

## Root Cause
- zsDialog only supports mini(616px x 60vh) and medium sizes, no small
- Import dialog misused zs-size="small" causing lost size limit and full stretch

## Solution
- Fix zs-size="mini"
- Add custom-class="zs-import-error-dialog" with height:auto; max-height:70vh
- Error list scrolls inside max-height:320px

## Verification and Attribution
- Verification: extracted source=cursor session=9d52f4b7-89a2-4fd9-a013-65731f1b3cf7
- Files: zhi1-web-admin/src/components/zsImport/index.vue, projectinfo/components/table.vue, utils/index.js, houseImport/components/houseTable.vue, utils/request.js, components/zsDialog/index.vue
- Project: Xinghua property management zhi1-web-admin; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "zsdialog_no_small",
  "source_extraction_id": "2df6cf0a466f49eb8a7ddc9e7c5b735d",
  "version": 1,
  "memory_type": "entities"
}
-->