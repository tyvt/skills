# Summary
2026-11-11 将 start-server.bat 改为请求 http://127.0.0.1:11434/api/tags，失败时先结束 ollama.exe 再拉起，不再只看端口；看门狗在 dsh web 存活时也做相同探测。重启后 Ollama /api/tags 返回 200。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 按你的建议修改
...
**assistant [peer=github.com-tyvt-skills]**: ...`py_compile` 通过。

**Ollama**
`start-server.bat` 改为请求 `http://127.0.0.1:11434/api/tags`。失败时先结束 `ollama....
...
**assistant [peer=github.com-tyvt-skills]**: ...重启后 `/health` 正常，Ollama `/api/tags` 返回 200。

升级 OpenViking 会覆盖 site-packages 里的文件。副本在 [dsh/patches/openviking-embed-retry](dsh/patches/openviking-embed-retry/README.md)，升级后按 README 拷回去再重启服务。

<!-- MEMORY_FIELDS
{
  "event_name": "Ollama重启逻辑改造",
  "goal": "Ollama不健康即重启",
  "summary": "2026-11-11 将 start-server.bat 改为请求 http://127.0.0.1:11434/api/tags，失败时先结束 ollama.exe 再拉起，不再只看端口；看门狗在 dsh web 存活时也做相同探测。重启后 Ollama /api/tags 返回 200。",
  "ranges": "0,30,32",
  "source_extraction_id": "bc8b08c42cf742b9b15729a245549da2",
  "version": 1,
  "memory_type": "events"
}
-->