# Summary
User reported `dsh: warning: 1 entry did not activate: token-guard` with error `cannot set property "p0LogReader" without provide` from token-guard/lib/index.js:393 on 2026-11-13, indicating the plugin failed to activate in the current DSH Web session and its token truncation guards were inactive.
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: dsh: warning: 1 entry did not activate
token-guard (dsh-token-guard): Error: cannot set property "p0LogReader" without provide
    at new apply (file:///D:/repository/skills/dsh/token-guard/lib/index.js:393:19)
    at Fiber.execute (file:///D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/cordis/lib/index.js:362:24)
    at file:///D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/cordis/lib/index.js:436:34
    at file:///C:/Users/Administrator/.dsh/profiles/web/#token-guard
    at file:///C:/Users/Administrator/.dsh/profiles/web/#include
这是什么问题

<!-- MEMORY_FIELDS
{
  "event_name": "token_guard_failed",
  "goal": "Report plugin activation error",
  "summary": "User reported `dsh: warning: 1 entry did not activate: token-guard` with error `cannot set property \"p0LogReader\" without provide` from token-guard/lib/index.js:393 on 2026-11-13, indicating the plugin failed to activate in the current DSH Web session and its token truncation guards were inactive.",
  "ranges": "0-3",
  "source_extraction_id": "3b67956e47894d95b05e8b46457e83ff",
  "version": 1,
  "memory_type": "events"
}
-->