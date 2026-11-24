# Summary
2026-11-24，首次注入 mock 路由（URL 带 /api 前缀）后列表请求仍返回 401；改为简单 pattern 并去掉 --allow-origin 参数重载后，第二次请求返回 200 并命中 mock，列表页渲染出 2 条数据。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: JSON 合法。现在打开浏览器会话，设置视口，注入 mock route（URL 带 /api 前缀），然后打开列表页。先断开旧 route 再建新 route。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: routes 已设置。打开列表页（带 hash 路由）、等待渲染后快照。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 列表没渲染出数据。查请求日志确认 mock 是否命中。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: mock 未命中(请求仍 401)。怀疑 `--allow-origin` 参数或 pattern 问题。改用简单 pattern、去掉 allow-origin,重载后复查。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 列表页现在渲染出 2 条真实数据(第二次请求 200,来自 mock)。去掉 old 401 记录后截图。先确认顶部到顶、按钮不溢出——截图看。

<!-- MEMORY_FIELDS
{
  "event_name": "mock未命中改用简单路由",
  "goal": "解决mock请求401",
  "summary": "2026-11-24，首次注入 mock 路由（URL 带 /api 前缀）后列表请求仍返回 401；改为简单 pattern 并去掉 --allow-origin 参数重载后，第二次请求返回 200 并命中 mock，列表页渲染出 2 条数据。",
  "ranges": "35-43",
  "source_extraction_id": "8d60940fc739414888eb76c67d34fa85",
  "version": 1,
  "memory_type": "events"
}
-->