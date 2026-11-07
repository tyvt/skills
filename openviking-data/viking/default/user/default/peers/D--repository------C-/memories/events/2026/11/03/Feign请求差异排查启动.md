# Summary
用户报告三台机器调用均返回 200 且内容长度完全一致，说明路径本身没问题，问题在 Feign 请求差异；/nacos/v1/ns/instance/list 返回的实例在客户端缓存里可能被换成别的端口。计划用 netstat 抓取 expand 连到 9604 的连接以确认。2026-11-03。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=D--repository------C-]**: 三台机器全部返回 200，且内容长度完全一致。这说明路径本身没问题，问题在 Feign 请求有什么不同。

关键差异：/nacos/v1/ns/instance/list 返回的实例，在客户端缓存里可能被换成了别的端口。我将实际抓取 Feign 发出的网络请求来确认。

用 netstat 抓 expand 连到 9604 的连接。
继续联调接口问题

<!-- MEMORY_FIELDS
{
  "event_name": "Feign请求差异排查启动",
  "goal": "排查Feign请求差异",
  "summary": "用户报告三台机器调用均返回 200 且内容长度完全一致，说明路径本身没问题，问题在 Feign 请求差异；/nacos/v1/ns/instance/list 返回的实例在客户端缓存里可能被换成别的端口。计划用 netstat 抓取 expand 连到 9604 的连接以确认。2026-11-03。",
  "ranges": "0",
  "source_extraction_id": "3116ab18e8884223b4af83083427df8c",
  "version": 1,
  "memory_type": "events"
}
-->