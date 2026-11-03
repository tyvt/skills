# Summary
In MicroCommunityWeb, the login API returned `data` as a single-user object, but the original code accessed it as an array via `data[0]`, yielding `undefined`. Calling `completeLogin(undefined)` failed when accessing `token`, breaking SSO. A `normalizeLoginUsers()` function was added to handle both single-user `{data:{...}}` and multi-user `{data:[{...}]}` response formats.
# 2026-11-02 (Monday) ChatLog:
**user**: 【记忆类型】bug
【标题】接口单用户对象误按数组取data[0]致登录失败
【内容】接口 `data` 为单用户对象时原代码按数组取 `data[0]` 得 `undefined`，`completeLogin(undefined)` 访问 `token` 报错致单点登录失败。新增 `normalizeLoginUsers()` 兼容单用户 `{data:{...}}` 与多用户 `{data:[{...}]}` 返回格式。
【验证证据】src=MicroCommunityWeb/001.md
【涉及文件】d:/repository/MicroCommunityWeb/vue.config.js ; d:/repository/MicroCommunityWeb/src/utils/request.js ; d:/repository/MicroCommunityWeb/src/utils/externalCodeLoginHandler.js ; d:/repository/MicroCommunityWeb/src/api/user/loginApi.js ; d:/repository/MicroCommunityWeb/src/router/index.js ; d:/repository/MicroCommunityWeb/src/App.vue ; d:/repository/MicroCommunityWeb/src/main.js ; d:/repository/MicroCommunityWeb/src/views/user/login/ExternalCodeLoginLang.js
【来源会话ID】716679d5-9d27-4090-96be-5897fd65c76f
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "login_users_normalize",
  "goal": "Add normalizeLoginUsers function",
  "summary": "In MicroCommunityWeb, the login API returned `data` as a single-user object, but the original code accessed it as an array via `data[0]`, yielding `undefined`. Calling `completeLogin(undefined)` failed when accessing `token`, breaking SSO. A `normalizeLoginUsers()` function was added to handle both single-user `{data:{...}}` and multi-user `{data:[{...}]}` response formats.",
  "ranges": "7-12",
  "source_extraction_id": "f332024755a241b5bf1f6b03723b080d",
  "version": 1,
  "memory_type": "events"
}
-->