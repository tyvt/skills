# Summary
2026-11-11，用户反馈应用列表页 logo 没有取接口返回值。助手核查确认 systems/index.vue 中 hero 图片 5b3eb.svg 为静态 logo 而非取自接口返回值；各应用卡片图标已正确使用 app.appLogo，用户所指为页面/头部 logo 未取接口值。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=D--repository---H5]**: 不应该有这个展位页，登录之后就是应用列表页面，应用列表页面没有标题，logo没有取接口返回值
...
**assistant [peer=D--repository---H5]**: Now I understand the structure. After login, `submit()` does `uni.reLaunch({ url: '/pages/systems/index' })` — the **app-list page** (`systems/index.vue`). That page has:
- A `system-hero` banner block (image `5b3eb.svg` + "请选择您要进入的业务子系统") — this is the **"展位页"** you want removed.
- `<AppHeader title="" ... />` — **empty title**.
- The hero image `5b3eb.svg` is a **static logo**, not from the API.

The app-card icons *do* use `app.appLogo` (line 42), so the per-app logos are fine. The "logo from API" you mean is the page/header logo. Let me read the API shape, the AppHeader, and the auth store to find the right logo field before editing.

<!-- MEMORY_FIELDS
{
  "event_name": "应用列表logo未取接口值确认",
  "goal": "确认logo来源问题",
  "summary": "2026-11-11，用户反馈应用列表页 logo 没有取接口返回值。助手核查确认 systems/index.vue 中 hero 图片 5b3eb.svg 为静态 logo 而非取自接口返回值；各应用卡片图标已正确使用 app.appLogo，用户所指为页面/头部 logo 未取接口值。",
  "ranges": "0,5",
  "source_extraction_id": "840701741d9c4cb0a46525c1cea15969",
  "version": 1,
  "memory_type": "events"
}
-->