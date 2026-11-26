---
audit_status: valid
last_checked: 2026-11-27T01:16:54+08:00
verdict_note: 属部署规范记忆，sites-enabled 在 deploy-env skill 命中，与当前部署面板/站点配置现状一致，非幻觉。
---
- Frontend projects deployed via nginx must use the nginx UI panel; site configs live in D:/nginx/conf/sites-enabled/*.conf and are maintained by the panel; do not substitute with http-server, live-server, or python -m http.server.
- The panel is the source of truth: after manually editing disk conf, trigger Reload in the panel, and vice versa, to avoid panel/disk drift.
- On port or server-name conflicts (e.g., "conflicting server name ... ignored"), adjust in the panel's site config first rather than only temporary manual edits.
- Before changing ports or other config that affects local access URLs, confirm with the user which site keeps the original port.

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "nginx_ui_rule",
  "source_extraction_id": "6008127eaf5f4adab68aa88b962df001",
  "version": 1,
  "memory_type": "preferences"
}
-->