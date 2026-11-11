# Summary
2026-11-11，nginx 站点「门户」的真实配置文件 D:\nginx\conf\sites-available\门户（sites-enabled\门户.conf 为其符号链接）的 root 从 D:/repository/门户/dist 改为 D:/repository/门户H5/dist，端口 8092、server_name localhost 不变，现服务当前 master 分支项目 门户H5。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=D--repository---H5]**: 用nginx UI部署本项目
...
**assistant [peer=D--repository---H5]**: Now it's clear:
- `门户` is a **separate older checkout** (branch `develop/v2.6.2-portal-mobile`) — its `dist` is what's currently served on port 8092.
- `门户H5` is the **current working project** (branch `master`) — this is "本项目".

So I should build `门户H5` and point the existing `门户.conf` at `门户H5/dist`. Let me first verify the build toolchain is ready before launching.
...
**assistant [peer=D--repository---H5]**: While the build runs, I'll update the config. Critical: I must edit the **symlink target** `sites-available\门户` (not the `sites-enabled\门户.conf` symlink itself), so I don't replace the symlink with a regular file and break the panel's structure.
...
**assistant [peer=D--repository---H5]**: ...html + assets/ + static/，时间戳 10:55）。
2. **改 nginx 站点配置**：原 `门户.conf` 的 root 指向的是另一个旧 checkout `D:/repository/门户/dist`（分支 `develop/v2.6.2-portal-mobile`）；已把 root 改为 **`D:/repository/门户H5/dist`**（即当前工作项目 / master）。
   - 关键：磁盘真实文件是 `D:\nginx\conf\sites-available\门户`，而 `sites-enabled\门户.conf` 是符号链接指向它——我编辑的是链接目标，没有破坏符号链接结构（已校验仍为 SymbolicLink）。
3. **reload nginx**：`nginx -t` 通过、`nginx -s reload` 成功（rc=0）。...

<!-- MEMORY_FIELDS
{
  "event_name": "nginx站点根目录切换至门户H5",
  "goal": "切换部署目录",
  "summary": "2026-11-11，nginx 站点「门户」的真实配置文件 D:\\nginx\\conf\\sites-available\\门户（sites-enabled\\门户.conf 为其符号链接）的 root 从 D:/repository/门户/dist 改为 D:/repository/门户H5/dist，端口 8092、server_name localhost 不变，现服务当前 master 分支项目 门户H5。",
  "ranges": "0,16,23,38,39,40",
  "source_extraction_id": "d6edcf116ff944cdaf04418b534c82ac",
  "version": 1,
  "memory_type": "events"
}
-->