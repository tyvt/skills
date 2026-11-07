# 注销账号后消息角标未清除修复
苏住房C 小程序「我的」页在注销账号后，「消息」入口未读角标未清零，已通过三处改动修复。

## 问题原因
- 注销账号后登录态失效，但 `My_Suzhufang.vue` 的未读角标仍保留旧值未清零

## 修改内容
- `onShow` 的 else 分支中主动清零：未登录时设 `isBroker.value = false` 且 `unreadCount.value = 0`
- 展示层登录态兜底：`messageBadge = computed(() => (unlogin.value ? 0 : unreadCount.value))`，模板改用 `:badge-num="messageBadge"`
- `loadUnread` 增加前后 token 校验，防止 API 竞态导致已注销后仍写入未读数

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_tab/components/My_Suzhufang.vue`
- 来源会话ID：a54442c4-8431-4207-b588-fa848d7bf178

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "logout_badge_fix",
  "source_extraction_id": "53b1b22b039b46d69c1ec62dee8a5258",
  "version": 1,
  "memory_type": "entities"
}
-->