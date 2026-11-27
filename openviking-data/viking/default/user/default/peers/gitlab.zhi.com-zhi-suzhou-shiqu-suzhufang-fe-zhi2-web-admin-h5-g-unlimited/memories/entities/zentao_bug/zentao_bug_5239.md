# Zentao Bug 5239
Suzhou housing G owner-autonomy committee election voting detail page bug where "administrative region" displayed "-"; fixed, accepted, pushed, and written back as resolved/fixed on 2026-11-25.

## Problem
- The list page showed Wuzhong District for the same record while the detail page showed "-"; the bug had two screenshots.
- Reproduced with agent-browser in the 8167 environment: detail API returned `region='110101'` and `regionCode=null`, but the page read only `regionCode`.
- The district dictionary had no `110100` city-level entry, so `provinceFormatter` (`src/formatters/index.js:164-173`) returned provincial "Beijing" early and could not resolve the county.
- The user expected normal region display and later required county-level precision rather than only the province.

## Fix
- First attempt changed `detail.vue:461-463` and `:645-650`, adding `regionCode←region` and a `regionName` fallback, but real-machine acceptance showed only "Beijing" and failed.
- Final fix only changed two places in `detail.vue`: `:461` display value uses exact district-dictionary match, then `regionName`, then `provinceFormatter`; `:622` adds `regionNameByCode(code)` with `String()` on both sides and guards for empty code or non-array data.
- The API mapping and common formatters were not changed.
- The first plan was rejected for a JSON parsing issue; after adding suggestions it passed.
- Improvement plan v2 passed two reviews (verdict=pass, 0 P0) and the user confirmed implementation.

## Validation
- Target-file ESLint passed; `npm test` build passed with exitCode=0 and hash `1683d89f2` matching HEAD.
- On 2026-11-25 agent-browser eval returned "administrative region / Dongcheng District".
- Screenshot self-check passed five checks (PNG, 1256×581, and format checks), was embedded in the session, and the user confirmed it.
- The user chose "submit and push".

## Delivery and Handoff
- Submodule `1683d89f2` was pushed to `develop/v2.6.2-suzhufang`; the same batch included pre-existing local commit `94e58351c`, not this change.
- Parent `2b477d0` was pushed, gitlink pointed to `1683d89f2`, and both ends were checked with `ls-remote`.
- `env/.env` was stashed and restored, not committed; Zentao 5239 was set resolved/fixed with comment image fileID `24286`, and the transaction committed.
- Temporary logs and two screenshots were cleaned; agent-browser had no `session close` subcommand, so the old session remained but no process artifacts were left in the project directory.
- 2026-11-25 hop1 was a P0 handoff with doc `D:/plan/苏住房G/HANDOFF-CHAIN-禅道bug5239-业委会选举表决详情页行政区域-hop1-20261125-0949.md` and chain_id=禅道bug5239-业委会选举表决详情页行政区域; hop2 finished remaining todos and ended.
- hop2 schedule/doc wrote `maxHops=10`, while workspace AGENTS.md required no maximum hop limit; at hop=1 both rules led to continuation.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_5239",
  "source_extraction_id": "8d1927630ae345d1939e4bb5146adec6",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->