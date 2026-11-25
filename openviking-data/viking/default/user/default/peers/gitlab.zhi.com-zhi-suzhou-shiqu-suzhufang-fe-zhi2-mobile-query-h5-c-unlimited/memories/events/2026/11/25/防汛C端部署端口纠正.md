# Summary
2026-11-25，用户指出此前 8095 端口结论有误，苏住房防汛C端不是该端口，并要求查部署面板；助手核对部署面板注册表后确认防汛C端 dev 为 http://localhost:8161（8162 为 test，health up），并纠正 8095 来自本地 nginx 备份/旧记忆、未查面板，结论错误。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 你这个8095的端口是哪里来的结论？苏住房防汛C端不是这个端口啊，查一下部署面板呢
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 8095 来自 nginx 备份配置，不是部署面板。正在查部署面板注册表里的正确端口。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 纠正：8095 来自本地 `nginx`/`苏住房防汛C端.conf` 和历史记忆，未以部署面板为准。正在查 `registry.sqlite`。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 部署面板已核对：**防汛C端 dev = `http://localhost:8161`**（`8162` 为 test），`health: up`。先前 **8095** 来自本地 nginx 备份/旧记忆，**未查面板，结论错误**。接着在 8161 上验证首页。

<!-- MEMORY_FIELDS
{
  "event_name": "防汛C端部署端口纠正",
  "goal": "核对部署端口",
  "summary": "2026-11-25，用户指出此前 8095 端口结论有误，苏住房防汛C端不是该端口，并要求查部署面板；助手核对部署面板注册表后确认防汛C端 dev 为 http://localhost:8161（8162 为 test，health up），并纠正 8095 来自本地 nginx 备份/旧记忆、未查面板，结论错误。",
  "ranges": "0,1,5,7",
  "source_extraction_id": "fc898aa9db5749e6b8abf2406f60aca1",
  "version": 1,
  "memory_type": "events"
}
-->