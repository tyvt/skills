# Unlimited Query H5 Test Server
Test server for the Suzhou Housing flood-control C-end mobile query H5, used by the Lead (user) to view the deployed effect online.

## Address & Build Source
- Access URL: `http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com/`
- Built from the GitLab repo, not local `dist`; local fixes only take effect after pushing to the remote branch and rebuilding
- Local deployment is nginx 8095 (`http://127.0.0.1:8095/`) serving local `dist` directly with hash-mode routing; 2026-11-24 confirmed the live site config is `D:\nginx\conf\sites-enabled\防汛C端.conf` (the `防汛C端-local.conf` outside `sites-enabled` is not the running one)
- 2026-11-24 re-check: that nginx site was live and serving the built app; `dist` (14:59:35) was newer than the source (14:59:16) and the build had exited 0
- Old effects on the test server mean the remote branch lacks the commit (e.g. `97c9460`)
- 2026-11-14 commit `e925eec6ebd0b59fdf9cf47e0d763d35e8be3d7d` was pushed to origin/dev (local and remote hashes match) but not yet deployed to this test server; it shows only after rebuild/deploy

## Login & Verification
- 2026-11-24: login requires username + password + graphic captcha; the project `.env` auto-login note holds test account `zsbase`; no other stored credential exists (deploy-env and memory searches found none)
- 2026-11-24: logged in successfully as `zsbase` (captcha recognized as `3`) and reached the app home with 街镇检查/区县检查/市级检查 entries

## Temporary Nginx Switching & Restore
- Screenshot verification needs a temporary local nginx change: back up the config first and restore it afterwards
- 2026-11-14 switch was done via nginx UI with the temp config prepared and the old site untouched at that point; 2026-11-24 confirmed the nginx UI panel is 127.0.0.1:9000 managing the same `D:\nginx` conf set (see 「nginx_ui」)
- 2026-11-14 the first screenshot script stopped before saving (page init did not expose uni storage APIs, temp token not written); during that time local nginx pointed only at the isolated build
- 2026-11-14 cleanup finished: temp nginx restored to the original `dist` root, homepage and `/api/v2.0/code` both returned HTTP 200, Chromium on port 18927 exited, then only the session's source files were reviewed and committed per branch flow
- 2026-11-24 switch: `/api/v2.0/evaluation/` 改指本地后端 `localhost:9608`，其余 `/api/` 仍走远程网关保留登录；验证后必须恢复原配置并 reload（详见「查询H5本地后端验证环境」）

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "test_server_unlimited",
  "source_extraction_id": "c19b5901ace040e9bb5820b3731654ce",
  "version": 8,
  "memory_type": "entities"
}
-->