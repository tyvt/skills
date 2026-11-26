# ZT2953 Workbench Entry Handoff Chain
Handoff chain for Zentao task 2953 and story 1548 covering the workbench and flood-control C-end H5; hop15 handed off to hop16 (2026-11-26 17:43:03 +08, schedule `350cdd19…`), and hop16 ran on 2026-11-26 before handing off to hop17 at the 1.00M cost threshold.

## Chain Setup
- chain_id `禅道2953工作台新增入口及跳转`; no maxHops, never mark a final hop; completion means section 4 is empty.
- Original goal: land story 1548 four requirements across two repos (workbench + flood-control C-end H5), agent-browser real-device screenshots to user confirmation, then commit/push both repos and write back to Zentao 2953 with screenshots.
- Do-not-rerun: both repos' build, credential upsert, gateway conf fix, re-login token, 10-entry param verification, gateway/H5_BASE constant changes.
- hop16 handoff document: `D:\plan\物业手持B端\HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop16-20261126-1818.md` (9 sections; section 4 lists remaining work).
- hop17 scheduled as `schedule-a5d59b47…`, delivery 2026-11-26 18:20:30 +08, target=new_once, session `session-8624b93f…` created; prompt has four items (doc path, read section 9, chain meta, one-line goal) with no maxHops.

## Verification Targets and Results
- req2: start page carries out complexId/complexName — PASSED on 2026-11-26 (input value `嘉樾时代花园`, complexId=667585159348728 in URL).
- req3: "more" filter hides administrative divisions — PASSED (from=handheld: 行政区划 idx=-1 hidden; control without from: idx=96 visible).
- req4: checkType 2/3/4 hides the initiate-check button — PASSED (checkType=1 物业自查 idx=60 visible; checkType 2/3/4 idx=-1 hidden); anchors `src/pages/project-check/records/index.vue` and `src/pages/project-check/start/index.vue`; `checkTypeTitles['1']`=物业自查, checkType 2=街镇检查.
- All reqs are client-side URL-param guards set in onLoad (`from=handheld`, `checkType`, `complexId/complexName`); four screenshots under `$env:TEMP\zentao-2953\` (timestamp 20261126-180604) were self-checked, presented and embedded with disclosure that only API data calls 404.
- User confirmed verification passed on 2026-11-26, authorizing commit/push and Zentao writeback without a second ask (Zentao task no-second-ask rule).

## Rendering Blocker and Bypass
- Root cause: Edge requests to the internal `.test` domain return `net::ERR_BLOCKED_BY_CLIENT`, not hop14's assumed shell `&` truncation.
- Evidence: curl returns HTTP 200 and raw IP 192.168.1.31 renders in Edge (openresty 404), while system DNS resolves the `.test` hostname to 192.168.1.31.
- Failed bypasses: heredoc eval navigation, hosts entry plus flushdns, `--host-resolver-rules`, Host-header injection, dedicated session `z2953-h5b`, disabling HTTPS-First, clean profile (`--cdp`/`--profile`); all still chrome-error.
- Bypass used: local loopback static hosting of the built production dist via `python -m http.server 8188`; the SPA rendered and the same production bundle satisfied req2/3/4 DOM guards.
- agent-browser findings: launch `--args` must be a comma-separated string (not array); PowerShell `Set-Content -Encoding UTF8` adds a BOM that breaks config JSON; batch tokenizer strips single quotes (use `String.fromCharCode`), CLI lingers after printing, and uni-app H5 does not re-run onLoad on hash-only query changes (reset via about:blank between cases).

## Status and Next Hop
- Environment experiments fully rolled back: hosts entry removed, `~/.agent-browser/config.json` restored, lingering background job killed; no global pollution.
- Commit work started but stopped at the 1.00M cost threshold (mandatory P0 handoff); no code committed, pushed, or written back to Zentao.
- Both repos on expected branches (`main-suzhufang` for B terminal, `dev` for H5), ahead=0 behind=0; dirty set: 3 intended B-end files plus new webview, 2 intended H5 files, plus 0-byte junk shell-redirect artifacts and generated `bun.lock` to exclude.
- Remaining hop17 work: fix `webview/index.vue:17` wrap-regex, commit/push both repos (4+2 files), write back to Zentao 2953 with the images, and clean up temp artifacts and jobs.

<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "zt2953_workbench_handoff",
  "source_extraction_id": "c298ca9776df4e37adb94b7323827d25",
  "version": 2,
  "memory_type": "entities"
}
-->