# ESLint Pre-commit Failure Fix
`request.js` ES2022 class fields and a virtual module import broke pre-commit ESLint checks in zhi2-web-admin.
## Root Cause
- `request.js` uses class field `timer=null` (ES2022) but `.eslintrc.cjs` sets `parserOptions.ecmaVersion` to `2021`
- `SvgIcon/index.vue` imports `virtual:svg-icons-register` virtual module, triggering `import/no-unresolved`
## Fix
- Change `ecmaVersion` to `2022` in `zhi2-web-admin/.eslintrc.cjs`
- Add `// eslint-disable-next-line import/no-unresolved` above the import in `SvgIcon/index.vue`
## Files
- `request.js`, `.eslintrc.cjs`, `SvgIcon/index.vue`, `zhi2-web-admin/.eslintrc.cjs`
## Verification
- Source session: 3db64a36-1496-41b9-ab85-8814face82c6
- Code baseline: none

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：3db64a36-1496-41b9-ab85-8814face82c6


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "eslint_precommit_failure_fix",
  "source_extraction_id": "cf9b1ad66f7d46ee805e752b86cc78ab",
  "version": 1,
  "memory_type": "entities"
}
-->
