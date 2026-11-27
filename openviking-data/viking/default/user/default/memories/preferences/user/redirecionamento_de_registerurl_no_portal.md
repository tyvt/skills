---
audit_status: valid
last_checked: 2026-11-27T17:26:30+08:00
verdict_note: 门户login.vue-462存在goRegisterPage处理注册跳转，与偏好所述registerUrl行为一致，无矛盾证据。
---
- 当 `registerUrl` 未配置时，`goRegisterPage` 应移除 fallback 逻辑，仅显示消息 «未配置注册链接域名，请联系管理员在基本配置中设置» 而不重定向。
- 当 `registerUrl` 已配置时，重定向到 `<registerUrl>/#<path>?<query>`，采用整页跳转。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->