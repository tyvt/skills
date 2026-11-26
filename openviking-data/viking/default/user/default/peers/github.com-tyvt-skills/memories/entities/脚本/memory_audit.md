# memory_audit.py
scripts/memory_audit.py is the OpenViking memory audit sampling script.

## Usage
- Flow: `select` draws candidates, judge by rules, `apply` writes back; `stats` summarizes coverage.
- Sampling can specify a count (e.g. `select --n 10`), with a default 7-day cooldown.
- Verdicts accept only `valid`/`invalid` (current governance; `suspect` deprecated); no frontmatter or empty evidence is marked `invalid`, not trusted as a current fact, and not deleted.
- Writeback fields: `audit_status`, `last_checked`, `verdict_note`.

## Operations
- Script is at `scripts/memory_audit.py`; on 2026-11-25 a full-repo grep missed it and narrowing to the `scripts` directory found it.
- Commits `a871747d` and `e9b7c364`: apply changed to a read-back success check, stats changed to a single ov grep.
- Push restored; remote synced.
- Audit log at `~/.dsh/cache/memory-audit/audit.jsonl`.
- On 2026-11-25 second-round apply hit URI normalization: MCP write converted title spaces to `_`, producing an underscored copy of a spaced-title memory while the original spaced version stayed unaudited; frontmatter was merged into the canonical file and the spaced duplicate deleted, leaving one unique URI.

## Recent Audit Rounds
- 2026-11-25: 10 sampled, 7 valid/3 invalid, apply 10/10 verify:ok skipped:0, no concurrent changes. Invalid: `portal_api_1400` (portalApiRewrite.js is in the 门户 repo, not 产品2.0; 产品2.0 getInfo uses /system/user/getInfo at line 132), `area_publish_arg` (difference is reportState/publishState query parameters, not a second region-code argument; e2e-result.md:301 warns against misjudgment), `dev_icon_row_bug` (developerCommodityFlow/:developer-flow absent from tree and git history; current code uses businessFlows+variant).
- 2026-11-25: 10 sampled, 7 valid/3 invalid, apply 10/10 skipped:0. Invalid: `git_branch_strategy` (abstract preference, no concrete code fact), `zs_dialog_zindex` (code uses `:above-drawer` and z-index 100/-1, no wrapper-class/100000), `wechat_uniapp_incompat` (037.md evidence absent, clickCheckTask 0 hits, no baseline).
- 2026-11-25 third round: 10 sampled; brief first said 7/3 then explicitly corrected to VALID 8/INVALID 2; apply 10/10 verify=ok, no skipped. Invalid: `小程序技术/appid_missing_fix` (only wygl-wxxcx-dev-slh; home/index/index.vue keeps the login call, no MP-WEIXIN conditional compilation/41002/appid missing/?code= logic; home/new/index.vue and README.md absent), `项目/book_summarizer` (D:/repository/book-summarizer absent; no summarize.py/chapter_parser.py/llama_runner.py). Valid eight: 详情模板未定义常量报错修复, 苏住房g/home_todo_decouple, clear_company_model, 记录变更详情中按钮的显示, 择时报告点位格式, complexchange_areafields, building_dialog_columns, dayjs全局实例使用约定.
- 2026-11-25: 10 sampled, VALID 7/INVALID 3, apply 10/10 verify=ok skipped:0, no pending items. Invalid: `inspection_dialog_flex` (claimed a `div.step-form-body` flex change, zero hits; add.vue:129/detail.vue:97 still nest `scroll-view.step-form-scroll`), `date_filter_adapt` (vague, no function name/line/mechanism, hover-fix unproven), `wechat_call_fallback` (claimed sfb.js and jmportal/lightAppJssdk/wx.miniProgram/tel: fallback, absent from non-dist source; callPhone only uses uni.makePhoneCall). Valid seven: `survey_change_payload`, `zentao_bug_6467`, `login_first_menu_redirect`, `change_schema_tableid`, `register_url_fallback`, `std_report_company_gap`, `organ_type_all`.
- Across these rounds: no memory body semantic changes, no deletions, no git commits, no project-directory writes; intermediate files stayed only in ~/.dsh/cache/memory-audit/.


<!-- MEMORY_FIELDS
{
  "category": "脚本",
  "name": "memory_audit",
  "source_extraction_id": "206f012ae7b245a586129647542d7983",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "entities"
}
-->