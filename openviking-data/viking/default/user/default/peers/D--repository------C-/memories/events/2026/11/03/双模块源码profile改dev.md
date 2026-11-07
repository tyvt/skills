# Summary
2026-11-03 用户指示将 service-expand 与 common-framework 的 src/main/resources/bootstrap.yml 中 spring.profiles.active 由 test 改为 dev；助理确认两文件原 active:test 并编辑为 dev，zhi2-property 已是 dev 无需改。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=D--repository------C-]**: ...1. 把 service-expand 的 src/main/resources/bootstrap.yml 的 spring.profiles.active 改为 dev（若已是 dev 则确认）。同时检查 common-framework-server 的 src bootstrap.yml，把 active 也统一改为 dev（登录走 9211）。zhi2-property 已是 dev，无需改。...
...
**assistant [peer=D--repository------C-]**: Both have `active: test`. Let me read the exact lines to edit.
**assistant [peer=D--repository------C-]**: Both source bootstrap.yml now `active: dev`. Now let me verify the running processes still match the stated PIDs, and check the jar/classes state before building.

<!-- MEMORY_FIELDS
{
  "event_name": "双模块源码profile改dev",
  "goal": "统一后端模块环境配置",
  "summary": "2026-11-03 用户指示将 service-expand 与 common-framework 的 src/main/resources/bootstrap.yml 中 spring.profiles.active 由 test 改为 dev；助理确认两文件原 active:test 并编辑为 dev，zhi2-property 已是 dev 无需改。",
  "ranges": "10-11,28-34",
  "source_extraction_id": "f885d6022a954753864f34ddda767516",
  "version": 1,
  "memory_type": "events"
}
-->