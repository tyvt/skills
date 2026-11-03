# Sitewide Redirect Logic Removed For Direct Route
`zhi2-web-admin/src/router/index.js` deletes root route `redirect: 'index'` and `/redirect` route entry; login return changed to `next('/login')` direct jump.

## Changes
- `src/layout/components/TagsView/index.vue` and `Navbar.vue` remove `/redirect/` path concatenation and `indexOf('/redirect')` branch; tab refresh uses `replace(fullPath)` route control.

## Scope
- Applies to router, login, register, TagsView, Navbar, permission store modules.

## Verification
- Evidence: src=泰兴G/004.md; project: 泰兴G (zhi2-web-admin); source session 6d0e86c2-8c79-42bd-a40b-a156427e418b; code baseline none.
- Involved files: router/index.js, assets/views/login.vue, views/companyLogin.vue, register/companyRegister.vue, layout/components/TagsView/index.vue, layout/components/Navbar.vue, LoginForm.vue, store/modules/permission.js.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "redirect_removed",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 1,
  "memory_type": "entities"
}
-->