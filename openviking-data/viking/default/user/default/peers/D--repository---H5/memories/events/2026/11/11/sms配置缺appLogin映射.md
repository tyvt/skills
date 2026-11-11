# Summary
2026-11-11 联调发现 Nacos application.yml 的 sms.sources 仅有 SMS_LOGIN，缺 appLogin 映射，致 /sms 报「未找到对应的templateCode」；待办为在 Nacos 增加 appLogin 模板 code 并启用 liquibase 或补跑分支 changelog。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=D--repository---H5]**: 这是门户后端代码，分支用feature/feat-dzc-261111
拉代码本地联调
...
**assistant [peer=D--repository---H5]**: Progress: now the code reached the SMS template lookup — `未找到对应的templateCode`. The source `appLogin` isn't mapped in the SMS `sources` config. The Nacos config had `SMS_LOGIN: SMS_229350174` but not an `appLogin` source. This is another config gap: the branch added `SMS_SOURCE = "appLogin"` but the Nacos `sms.sources` map doesn't include `appLogin`.

Let me check the SMS sources config in Nacos (`application.yml` `sms.sources` or `common-framework-portal.yml`).
**assistant [peer=D--repository---H5]**: Confirmed: `sms.sources` only has `SMS_LOGIN`, no `appLogin`. The `getTemplateCode("appLogin")` returns null → "未找到对应的templateCode". This is a missing deployment config for 禅道1431 (the branch needs `sms.sources.appLogin` added to Nacos `application.yml`).

For local e2e I'll add `appLogin: SMS_229350174` (reuse the login template) to the Nacos config `application.yml` so the running app picks it up (Nacos config is `@RefreshScope`-able for the map? `SmsSourcesProperties` — likely refreshed). But modifying shared dev Nacos config affects others. Safer: **bypass SMS send entirely** for e2e by pre-seeding the Redis code `appLogin:<phone>` directly (that's exactly what a successful send would produce), then call `/login` which only reads `verifyCode` from Redis. This tests the full login→apps→jump chain without touching shared config or Aliyun.

Let me pre-seed `appLogin:13598941413` = `123456` (raw string) and go straight to `/login`.
...
**assistant [peer=D--repository---H5]**: ...- **短信模板缺配置**：Nacos `application.yml` 的 `sms.sources` 只有 `SMS_LOGIN`，缺 `appLogin` 映射 → `/sms` 报「未找到对应的templateCode」。且后端 `sendVerificationCode` 先调阿里云再写 Redis，无有效阿里云通道时也会失败。

## 给你/后端的待办（这两项属发布配置，未擅自改共享环境）
1. 在 Nacos `application.yml` 的 `sms.sources` 增加 `appLogin: SMS_xxxxxx`（验证码模板 code）。
2. dev 环境启用 liquibase 或补跑上述 3 个 changelog，避免其它环境同样缺列。...

<!-- MEMORY_FIELDS
{
  "event_name": "sms配置缺appLogin映射",
  "goal": "记录发布待办",
  "summary": "2026-11-11 联调发现 Nacos application.yml 的 sms.sources 仅有 SMS_LOGIN，缺 appLogin 映射，致 /sms 报「未找到对应的templateCode」；待办为在 Nacos 增加 appLogin 模板 code 并启用 liquibase 或补跑分支 changelog。",
  "ranges": "0,137-139,183-185",
  "source_extraction_id": "00c444c3dac94ae08c34a642d8476228",
  "version": 1,
  "memory_type": "events"
}
-->