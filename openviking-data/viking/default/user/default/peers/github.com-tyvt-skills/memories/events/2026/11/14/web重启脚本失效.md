# Summary
2026-11-14，用户反馈 restart-web.ps1 无法重启 DSH web 服务：脚本杀掉了旧 web 进程（PID 2700）却未拉起新进程，最终由用户手动重启 web 才恢复 3080 端口服务。
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: 好，执行重启。用现成脚本，后台运行且日志落盘。
**user [peer=github.com-tyvt-skills]**: 这个脚本并不能重启成功，是我手动重启的
**assistant [peer=github.com-tyvt-skills]**: 明白，脚本重启失败了（那是本次的一个坑，先记下：restart-web.ps1 不起作用，得手动重启）。你已经手动重启了 web。

那我先确认新进程是否真的起来了、加载的是新配置，然后请你开新会话验收。先检查进程和端口。

<!-- MEMORY_FIELDS
{
  "event_name": "web重启脚本失效",
  "goal": "记录重启脚本失败",
  "summary": "2026-11-14，用户反馈 restart-web.ps1 无法重启 DSH web 服务：脚本杀掉了旧 web 进程（PID 2700）却未拉起新进程，最终由用户手动重启 web 才恢复 3080 端口服务。",
  "ranges": "12-15",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "events"
}
-->