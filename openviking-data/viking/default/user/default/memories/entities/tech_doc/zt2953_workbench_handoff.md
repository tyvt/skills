---
audit_status: valid
last_checked: 2026-11-27T17:53:41+08:00
verdict_note: D-/plan/物业手持B端 下确有 HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop16-20261126-1818.md，与记忆所述 handoff 文档一致。
---
# ZT2953 Workbench Entry Handoff Chain
Zentao task 2953/story 1548 handoff chain for workbench and flood-control C-end H5; hop15→hop16 at 2026-11-26 17:43:03 +08 (schedule `350cdd19…`), then hop16→hop17 at the 1.00M cost threshold.

## Chain Setup
- chain_id `禅道2953工作台新增入口及跳转`; no maxHops; never mark a final hop; completion requires section 4 empty.
- Goal: land story 1548 four requirements in workbench + flood-control C-end H5, use agent-browser real-device screenshots to user confirmation, commit/push both repos, write back to Zentao 2953 with screenshots.
- Do-not-rerun: both repos' build, credential upsert, gateway conf fix, re-login token, 10-entry param verification, gateway/H5_BASE constant changes.
- hop16 doc `D:\plan\物业手持B端\HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop16-20261126-1818.md` (9 sections; section 4 lists remaining work).
- hop17 `schedule-a5d59b47…`, delivery 2026-11-26 18:20:30 +08, target=new_once, session `session-8624b93f…`; four-item prompt (doc path, read section 9, chain meta, one-line goal), no maxHops.

## Verification Targets And Results
- req2 start page carried complexId/complexName: PASSED 2026-11-26 (`嘉樾时代花园`, complexId=667585159348728 in URL).
- req3 "more" filter hides administrative divisions: PASSED (`from=handheld`: 行政区划 idx=-1 hidden; control idx=96 visible).
- req4 checkType 2/3/4 hides initiate-check button: PASSED (checkType=1 物业自查 idx=60 visible; 2/3/4 idx=-1 hidden); anchors `src/pages/project-check/records/index.vue`, `src/pages/project-check/start/index.vue`; `checkTypeTitles['1']`=物业自查, checkType 2=街镇检查.
- All reqs are onLoad client-side URL-param guards (`from=handheld`, `checkType`, `complexId/complexName`); four screenshots in `$env:TEMP\zentao-2953\` (timestamp 20261126-180604) self-checked, presented, embedded; only API data calls 404.
- User confirmed verification on 2026-11-26, authorizing commit/push and Zentao writeback without a second ask under the Zentao task no-second-ask rule.

## Rendering Blocker And Bypass
- Root cause: Edge `.test` requests returned `net::ERR_BLOCKED_BY_CLIENT`, not hop14's assumed shell `&` truncation.
- Evidence: curl HTTP 200; raw IP 192.168.1.31 rendered in Edge (openresty 404); system DNS resolved `.test` to 192.168.1.31.
- Failed bypasses: heredoc eval navigation, hosts+flushdns, `--host-resolver-rules`, Host-header injection, session `z2953-h5b`, disabling HTTPS-First, clean profile (`--cdp`/`--profile`); all chrome-error.
- Bypass: local loopback static hosting of built production dist via `python -m http.server 8188`; SPA rendered and same bundle satisfied req2/3/4 DOM guards.
- agent-browser: `--args` must be comma-separated string not array; PowerShell `Set-Content -Encoding UTF8` BOM breaks config JSON; batch tokenizer strips single quotes (use `String.fromCharCode`); CLI lingers after printing; uni-app H5 ignores hash-only query changes (reset via about:blank between cases).

## Status And Next Hop
- Environment rolled back: hosts entry removed, config restored, lingering job killed; no global pollution.
- Commit work started but stopped at 1.00M cost threshold (mandatory P0 handoff); no code committed, pushed, or written back to Zentao.
- Repos: expected branches (`main-suzhufang` B, `dev` H5), ahead=0/behind=0; dirty set: 3 intended B-end files plus new webview, 2 intended H5 files, 0-byte shell-redirect junk artifacts and generated `bun.lock` to exclude.
- Hop17 work: fix `webview/index.vue:17` wrap-regex, commit/push both repos (4+2 files), write back to Zentao 2953 with images, clean temp artifacts and jobs.

<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "zt2953_workbench_handoff",
  "source_extraction_id": "fe944f3655ca4283b168a04eb337ebe8",
  "version": 4,
  "memory_type": "entities"
}
-->