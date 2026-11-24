# Summary
2026-11-24，为避免 mapRow 用 split(',') 切分 attachUrl 时被 data-URL 内的逗号破坏，决定在 nginx 直读的 dist 根目录（D:\repository\苏住房防汛C端\dist）放置一张真实 PNG，并让 mock 数据的 attachUrl 指向该图片。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 需要一张能真实渲染的图片绕开 data-URL 逗号切分问题（`mapRow` 用 `split(',')` 切 attachUrl）。方案：在 nginx 的 dist 根放一张真实 PNG，attachUrl 指向它。先确认 dist 路径。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: dist 根是 `D:\repository\苏住房防汛C端\dist`，nginx 直接读。我放一张真实 PNG 到 dist 根作为验证图片，构造 mock 数据。先生成图片并写入 mock JSON 到临时目录。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 现在构造 mock 数据。图片指向 nginx dist 里的真实 PNG（无逗号、可真实渲染）。写 mock JSON 到临时目录。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: PowerShell hashtable 内联嵌套数组解析失败。改用 JSON here-string 直接写文件更简单。

<!-- MEMORY_FIELDS
{
  "event_name": "验证图片放入dist根目录",
  "goal": "解决图片不渲染",
  "summary": "2026-11-24，为避免 mapRow 用 split(',') 切分 attachUrl 时被 data-URL 内的逗号破坏，决定在 nginx 直读的 dist 根目录（D:\\repository\\苏住房防汛C端\\dist）放置一张真实 PNG，并让 mock 数据的 attachUrl 指向该图片。",
  "ranges": "27-33",
  "source_extraction_id": "8d60940fc739414888eb76c67d34fa85",
  "version": 1,
  "memory_type": "events"
}
-->