# OpenViking
Memory system based on dsh-memory-plugin and maintained by the user.

## Capabilities
- Implements profile-inject memory injection through dsh-memory-plugin.
- Continuously performs active retrieval optimization.

## Storage and Tools
- The memory store has about 6642 entries and uses Markdown; audit `apply` writes frontmatter for verdict metadata.
- URI format: `viking://user/default/memories/{entities,preferences,_archive}/...`.
- ov CLI v0.5.5 supports `ls -r`/`read`/`write`/`set-tags`/`glob` and `--output json`; the Python SDK has no top-level exports, so scripts must use the CLI.

## Deployment and Scheduling
- Startup scripts and the watchdog are in `C:\Users\Administrator\.openviking\` (git master, no remote configured so it cannot push; back up `.bak` before changes).
- Since 2026-11-25, two LLM settings use hy4flash-free as primary with hy4flash credits as fallback.
- Daily 08:30 memory audit task `schedule-e31f1263-6af2-4270-9031-b04f4a795ce9` is active with `target=new`; next stated run was 2026-11-26 08:30.

## Audit
- `scripts/memory_audit.py` is the OpenViking spot-audit script: `select` picks candidates → verdicts → `apply` writes back → `stats` summarizes; `select` defaults to a 7-day cooldown. Audit logs are at `~/.dsh/cache/memory-audit/audit.jsonl`. On 2026-11-25 it was used again with `select --n 10` → per-item code-evidence verification → `apply` (valid/invalid only) → `stats`; the second 10/10 round wrote back 8 valid and 2 invalid, cumulative checked 25 (valid 18, invalid 7), coverage 0.4%; temporary `verify.sh`/`result.json` were cleaned and the pure audit did not change source code, make a git commit, or run a build.
- 2026-11-26 10-item round (eligible 6406 / total 6616): valid 7, invalid 3 (invalid items: dict-tag String conversion, zs column width-removal norm, HeadTitle formMode prop); `apply` wrote back all with verify ok and skipped=0; `nginx_csp_map` reported `post_persist_embedding_err` (Ollama disconnected) but write and readback succeeded; only cache `result.json` and memory frontmatter changed, with no business source changes and no build.
- Space/underscore URI normalization can create duplicates where the space version is unaudited and the underscore version has verdict/note; check and keep one audited file. In the 2026-11-26 45-item round (total 6642), valid was 25 and invalid 20; `apply` had 44 successes plus 1 skipped due to a normalization false mismatch, frontmatter confirmed the verdict landed, all 45 verdicts took effect, cumulative checked 588 (valid 459 / invalid 129), coverage 8.9%, and only cache/frontmatter changed without body edits, deletions, or git commit.
- The 2026-11-26 11:04-11:23 third 45-item round (total 6642, eligible 6009) had valid 37 / invalid 8 (including one skipped counted as valid), 44 writebacks plus one #14 space-URI skip where the normalized filename write succeeded but readback did not match; cumulative checked 677, coverage 10.2%, remaining 5965; only `~/.dsh/cache/memory-audit/` cache and frontmatter were written, with no body semantics changes, deletions, or git commit.
- The 2026-11-26 11:34-11:49 scheduled 45-item audit (total 6642): valid 41 / invalid 4; `apply` wrote all 45 with verify ok and skipped=0; cumulative checked 722 (10.9%), remaining 5920. Invalid items were `entities/nginx_site/suzhufang_g_site.md` (b9deaaf8: claimed port 8101 and an old sites-enabled copy, but effective `env-sites/suzhufang-g-local.conf` listens on 8165 after the 2026-11-24 port migration and deployment panel generation), `preferences/user/首页双导航区域隔离.md` (57431a38: `keyRegionCode`/`checkRegionCode` only in memory archives, absent from real code including `home/v2/components/RegionTabs.vue`), `entities/技术模式/house_data_id_reseq.md` (2dfb2363: referenced `苏找房WEB/public/assets/js/house_data.js` absent from 苏找房web/G端), and `preferences/user/echarts饼图百分比计算约定.md` (632b3053: `formatPiePercent` only in memory archives; real voting detail js uses `data.percent`/`toFixed`). Intermediate files stayed under `~/.dsh/cache/memory-audit/`, no project directory writes, memory body edits, deletions, or git commit occurred.


<!-- MEMORY_FIELDS
{
  "category": "memory_system",
  "name": "openviking",
  "source_extraction_id": "5e73b79678b64d45a1aedd8658a3c57e",
  "peer_id": "github.com-tyvt-skills",
  "version": 8,
  "memory_type": "entities"
}
-->