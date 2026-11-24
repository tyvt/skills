# Nginx Site Confs (deploy-env)
Windows nginx site configuration pairs for the eight deploy-env projects, where each project's main conf serves the dev gateway on base+1 and its `-test.conf` serves the test gateway on base+2.

## Port and gateway scheme
- Each project's main conf listens on base+1 with gateway `dev.zhi.com`; the matching `-test.conf` listens on base+2 with gateway `test.zhi.com`.
- Covered projects: 太仓一网通办H5, 无锡市区G, 无锡小程序, 江阴, 泰兴, 淮安, 防汛C端; the 园区 pair was already correct before the 2026-11-24 fix.
- 防汛 actually listens on 8161/8162 — its `listen 8103` exists only inside a comment, so port grep can be misled.
- On 2026-11-24 all 16 conf files (8 pairs) were verified: dev/test gateways and ports aligned, `nginx -t` passed, nginx reloaded with new worker 1848.

## Encoding and editing
- Files are UTF-8 without BOM with CRLF line endings and Chinese comments; the `test.zhi.com` → `dev.zhi.com` swaps were byte-level replacements so formatting stayed exact.
- A fresh backup of just these conf files was taken before editing and deleted after the commit; `.bak-*` backups were never committed.

## Relations
- Port and gateway values are mirrored in the deploy-env `registry.sqlite` (32 rows, 8 projects × 5 envs, 20 dev/test rows), which was already aligned.
- The site confs are included by the main Windows nginx reverse-proxy config (see main_nginx_conf).

<!-- MEMORY_FIELDS
{
  "category": "nginx_config",
  "name": "nginx_site_confs",
  "source_extraction_id": "f87fb2a2d2a448f98096ad685621d364",
  "version": 1,
  "memory_type": "entities"
}
-->