# Summary
2026-11-11，`nginx -t` 通过、`nginx -s reload` 成功（rc=0）后，验证确认 http://localhost:8092 返回 HTTP 200，响应 MD5 与 门户H5/dist/index.html 完全一致，且响应中的 /assets/index-Bo1_BhLL.js 仅存在于 门户H5/dist，确认服务的是新构建。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=D--repository---H5]**: 用nginx UI部署本项目
...
**assistant [peer=D--repository---H5]**: Build output is fresh (`门户H5/dist` with `index.html` at 10:55:48). Now let me test the nginx config, reload, and confirm the symlink is still intact.
...
**assistant [peer=D--repository---H5]**: Config test passed, reload succeeded (rc=0), and the symlink is intact. Now let me verify that port 8092 actually serves the **new** 门户H5 build (not the old 门户/dist).
...
**assistant [peer=D--repository---H5]**: The 6-byte result smells like a gzip/encoding artifact from `curl.exe` (nginx has gzip on). Let me verify properly with `Invoke-WebRequest` (auto-decompresses) and compare against both builds by a distinctive token.
...
**assistant [peer=D--repository---H5]**: Verified — nginx is now serving the **new 门户H5 build** on port 8092:
- HTTP 200, served MD5 matches `门户H5/dist/index.html` exactly (`EE89870B…`), and the served script `/assets/index-Bo1_BhLL.js` exists only in `门户H5/dist` (not in the old `门户/dist`).

Let me clean up the build log and finalize the todo list.

<!-- MEMORY_FIELDS
{
  "event_name": "nginx重载并验证新构建",
  "goal": "验证部署结果",
  "summary": "2026-11-11，`nginx -t` 通过、`nginx -s reload` 成功（rc=0）后，验证确认 http://localhost:8092 返回 HTTP 200，响应 MD5 与 门户H5/dist/index.html 完全一致，且响应中的 /assets/index-Bo1_BhLL.js 仅存在于 门户H5/dist，确认服务的是新构建。",
  "ranges": "0,28,30,32,34",
  "source_extraction_id": "d6edcf116ff944cdaf04418b534c82ac",
  "version": 1,
  "memory_type": "events"
}
-->