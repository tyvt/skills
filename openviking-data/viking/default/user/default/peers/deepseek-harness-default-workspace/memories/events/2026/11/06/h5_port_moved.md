# Summary
User reported nginx warning about conflicting server name localhost on 0.0.0.0:8092 (2026-11-06). Assistant diagnosed two site configs (家园区一网通办H5.conf and 门户.conf) both listening on 8092 with server_name localhost. User decided portal keeps 8092 and 家园区 H5 moved to 8093. Assistant changed listen directive to 8093, verified nginx -t from D:/nginx shows no warning and exit code 0.
# 2026-11-06 (Friday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 警告
nginx: [warn] conflicting server name "localhost" on 0.0.0.0:8092, ignored
nginx: the configuration file D:/nginx/conf/nginx.conf syntax is ok
nginx: configuration file D:/nginx/conf/nginx.conf test is successful
nginx UI面板的警告
**assistant [peer=deepseek-harness-default-workspace]**: I'll look at the nginx config to find the duplicate `server_name localhost` blocks on port 8092.
**assistant [peer=deepseek-harness-default-workspace]**: The conflict comes from the included site configs (`sites-enabled/*.conf` and `conf.d/*.conf`). Let me find all the files that define a `server_name localhost` listening on `0.0.0.0:8092`.
**assistant [peer=deepseek-harness-default-workspace]**: Let me check which of these server blocks listen on 8092 (the glob path format was off, but grep worked). I'll search for the `listen` directives in the sites-enabled directory.
**assistant [peer=deepseek-harness-default-workspace]**: Only one file shows `listen 8092` explicitly, yet the warning names `0.0.0.0:8092`. Let me see every `listen` line across the site configs to understand the port assignment.
**assistant [peer=deepseek-harness-default-workspace]**: Only one site listens on 8092, yet the warning reports a conflict. The duplicate must be inside a single file, or in `conf.d`. Let me read the 8092 site and the conf.d stub file.
**assistant [peer=deepseek-harness-default-workspace]**: The 8092 site has only one server block, and the stub_status listens on 51820. Let me search for every occurrence of `8092` across all nginx configs — the conflicting block may use a different `listen` syntax.
**assistant [peer=deepseek-harness-default-workspace]**: Only one `8092` exists in the whole tree, which shouldn't trigger a conflict. The warning may come from how nginx UI generated the config, or there may be a duplicate I'm not seeing. Let me reproduce the warning and list the actual site directories.
**assistant [peer=deepseek-harness-default-workspace]**: The path-based `ls` got confused, but the warning reproduces. Note the test *failed* only because of a `client_body_temp` path relative to the current working dir — that's a side issue from running outside `D:/nginx`. The real puzzle is the 8092 conflict when grep finds only one `8092`. Let me dump the full merged config with `nginx -T` (run from `D:/nginx` so relative paths resolve) and inspect every 8092 server block.
**assistant [peer=deepseek-harness-default-workspace]**: Now it's clear: `nginx -T` shows **two** `listen 8092; server_name localhost;` blocks. My earlier grep missed the second one — it must live in a file ripgrep skipped (likely a comment-formatted or differently-named include). Let me locate exactly which file(s) contain the second `8092` block.
**assistant [peer=deepseek-harness-default-workspace]**: Found it. Two site files both claim port **8092** with `server_name localhost`:
- `D:/nginx/conf/sites-enabled/家园区一网通办H5.conf` (line 3) — already seen
- `D:/nginx/conf/sites-enabled/门户.conf` (line 31)

That's the conflict. Let me read `门户.conf` around line 31 to see the full server block and understand which port it *should* use.
**assistant [peer=deepseek-harness-default-workspace]**: ## 根因确认

你贴的警告不是 nginx 本身的问题，而是**两份站点配置抢了同一个端口**：

- `D:/nginx/conf/sites-enabled/家园区一网通办H5.conf` — 第 3 行 `listen 8092;`，`server_name localhost;`，root 指向 `D:/repository/家园区一网通办/dist`（民意调查打分/翻页验证用，bug6234）。
- `D:/nginx/conf/sites-enabled/门户.conf` — 第 31 行 `listen 8092;`，`server_name localhost;`，root 指向 `D:/repository/门户/dist`（zhi2-web-admin 主站点）。

两个 server 块监听 `0.0.0.0:8092` 且 `server_name` 都是 `localhost`，nginx 只能把 `localhost` 这个虚拟主机名绑定给**先被 include 的那一个**，后一个的 `server_name localhost` 被忽略——也就是说**其中一个站点在 8092 上实际被“遮蔽”了**，请求只会落到先加载的那个 server。

> 旁注：`nginx -t` 末尾那个 `[emerg] CreateDirectory() .../temp/client_body_temp failed` 只是因为你不在 `D:/nginx` 目录下运行测试（相对路径找不到），和这个端口冲突无关，从 `D:/nginx` 跑就正常。

我已用 `nginx -T` 确认整棵配置里只有这两个 `listen 8092` 块（没有第三处、也没有重复 include）。修复方法就是让两者用不同端口。具体哪个留 8092 需要你定一下，因为这会改动你本地某个站点的访问 URL。
**assistant [peer=deepseek-harness-default-workspace]**: You chose to keep **门户 on 8092** and move the 家园区 H5 to a free port (8093). Let me verify 8093 isn't already claimed, then make the change.
**assistant [peer=deepseek-harness-default-workspace]**: 8093 is free. Now changing the 家园区 H5 site from 8092 to 8093.
**assistant [peer=deepseek-harness-default-workspace]**: Now verify the warning is gone by running the config test from `D:/nginx` (so relative paths resolve).
**assistant [peer=deepseek-harness-default-workspace]**: The `[warn] conflicting server name` line is gone and it now reports `test is successful`. Let me confirm there's truly no warning and capture the real exit code explicitly (the `[exit code: 1]` shown is just the pwsh pipeline's exit status, not nginx's).
**assistant [peer=deepseek-harness-default-workspace]**: 已修复并验证通过 ✅

**改动**：把 [家园区一网通办H5.conf](<D:/nginx/conf/sites-enabled/家园区一网通办H5.conf>) 的 `listen 8092;` 改为 `listen 8093;`，让 门户 独占 8092。

**验证结果**（`D:/nginx` 目录下跑 `nginx -t`）：
- 不再出现 `conflicting server name "localhost" on 0.0.0.0:8092, ignored`
- `configuration file ... test is successful`，nginx 退出码 `0`，无残留 warning

**还需你做的一步（配置已改，但运行中的 nginx 不会自动生效）**：在 nginx UI 面板点一下 **Reload / 重载**（或 restart），让新配置生效。

**访问地址变化**：
- 门户（zhi2-web-admin 主站点）：仍是 `http://localhost:8092/`，不变。
- 家园区一网通办 H5：改为 `http://localhost:8093/`（根路径会 302 跳到 `/wechatapph5/`）。如果你之前收藏了 `8092` 的该 H5 链接，记得改成 8093。

补充说明：冲突只来自这两个 server 块（用 `nginx -T` 全量 dump 确认全配置里仅此两处 `listen 8092`），没有重复 include，也没有第三处占用。另，`sites-enabled/` 里那个 `门户.conf.bak-8099` 是 `.bak` 后缀、不被 `*.conf` include，不影响；保持不动即可。

需要的话我也可以顺手帮你 reload，或把该 H5 站点里的端口相关引用一起核对一下。

<!-- MEMORY_FIELDS
{
  "event_name": "h5_port_moved",
  "goal": "Resolve port conflict",
  "summary": "User reported nginx warning about conflicting server name localhost on 0.0.0.0:8092 (2026-11-06). Assistant diagnosed two site configs (家园区一网通办H5.conf and 门户.conf) both listening on 8092 with server_name localhost. User decided portal keeps 8092 and 家园区 H5 moved to 8093. Assistant changed listen directive to 8093, verified nginx -t from D:/nginx shows no warning and exit code 0.",
  "ranges": "0-39",
  "source_extraction_id": "6008127eaf5f4adab68aa88b962df001",
  "version": 1,
  "memory_type": "events"
}
-->