
- 对于 MicroCommunityWeb 的 SSO 单点登录功能，代码改动仅限于 `src/api/user/loginApi.js`、`src/router/index.js`、`src/utils/externalCodeLoginHandler.js`；回退对 `App.vue` 及其他原有文件的修改。
- 多用户选择弹窗在 `externalCodeLoginHandler.js` 内动态挂载，不再修改 `App.vue` 等文件。
- 外部系统可在任意 URL 后附加 `?code=授权码` 完成单点登录，不侵入原有登录页及其他业务代码。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "sso_login_scope",
  "source_extraction_id": "b014b1dba6de4c26a1c67147414c539c",
  "version": 2,
  "memory_type": "preferences"
}
-->