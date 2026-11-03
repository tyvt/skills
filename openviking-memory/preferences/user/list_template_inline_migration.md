- Root cause: Vue3 does not support mixing in `ListTemplate.js` as a template, so it must be inlined for compatibility.
- Preferred fix: `scripts/replace-list-template.mjs` scans `.vue` files under `src/views`, inserts an equivalent `<template>` block (with `v-model:limit` pagination), removes `import ListTemplate.js` and the `template` option; also convert `admin.js` and `hot.js` to `.vue`.
- Verification: extracted source=cursor session=2da8b222-7992-4e21-8ded-97f901ab42bc
- Files: ListTemplate.js, scripts/replace-list-template.mjs, admin.js, hot.js

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "list_template_inline_migration",
  "source_extraction_id": "cf9b1ad66f7d46ee805e752b86cc78ab",
  "version": 1,
  "memory_type": "preferences"
}
-->