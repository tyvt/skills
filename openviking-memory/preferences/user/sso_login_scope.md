- For the MicroCommunityWeb SSO login feature, limit code changes to `src/api/user/loginApi.js`, `src/router/index.js`, and `src/utils/externalCodeLoginHandler.js`; revert edits to `App.vue` and other original files.
- Mount the multi-user selection popup dynamically inside `externalCodeLoginHandler.js`.
- External systems complete single sign-on by appending `?code=` to any URL, without intruding into the original login page.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "sso_login_scope",
  "source_extraction_id": "f332024755a241b5bf1f6b03723b080d",
  "version": 1,
  "memory_type": "preferences"
}
-->