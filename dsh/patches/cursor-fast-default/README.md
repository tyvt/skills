# cursor-fast-default

直连 magpie 3425 API 的 cursor 请求默认走 Cursor Fast 档（1.5x 速度、用量增加）。

- 原理：插件 `index.mjs` 的 `const fast = tier === …: undefined` 行改为无 tier 时默认 `true`；显式传非 fast 的 `service_tier`（如 `"default"`）仍关闭；无 fast 档的模型（gpt-5.4-mini、deepseek-v41-flash-1017）不受影响。
- 应用：`node patch-fast-default.mjs`（覆盖 .config 副本 + install-cache 全版本化目录；首次自动备份 `index.mjs.orig-fast-default`）。
- 检查：`node patch-fast-default.mjs --check`（全 patched 才 exit 0）。
- 回滚：`node patch-fast-default.mjs --restore`，然后重启 magpie-bun。
- 接线：`cursor-quiet/reapply.mjs` 每 5 分钟自动重打（插件升级后自愈）。
- 局限：fast 是否上 wire 无法从外部观测（插件无参数日志），以补丁路径 + 请求无破坏为准；magpie 重新安装插件缓存会丢补丁，靠 reapply 自愈；打补丁后须重启 magpie-bun 才进内存。
- 测试：`node --test fast-default.test.mjs`（7 例：替换唯一性、语义三态、幂等、缺锚点拒绝、备份不覆盖、restore、实机锚点存在）。
