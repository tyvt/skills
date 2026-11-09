# zhi2-mobile-shimin
uni-app Vue3 H5 project for Suzhou Housing mobile C-end (owner initiative/signing), frontend dir D:\repository\苏住房C\zhi2-mobile-shimin, connects to backend transaction services, pushed to origin (gitlab.zhi.com).

## Branches
- Submodule branches: main-v2.1, mp, sfb, each matched by a parent repo branch of same name holding gitlink.
- Commits: main-v2.1 -> 2a8d1eb7 (parent f5212d5), mp -> e3635bf3 (parent 4ddde2c), sfb -> b5ab9af6 (parent b43c13b).

## Migration Scope
- Added propose-new module (Yulin version owner initiative): list/create/proposal-item-detail/detail/detailResponse + components SignBoard/CancelPopup/DecisionList/utils.js.
- Wired 4 signing steps: addAppSuggest (top-level signatureUrl), cancelSuggestV2 (revocationSignatureUrl), appSuggestResponse (suggestResponseStatus 1/2, signatureUrl).
- Replaced old propose pages; updated menuRouteMap.js and pages.json to point to propose-new.
- Migrated work order module from Yulin miniprogram: property.js switched to /property/workOrder/app/ APIs; involves index, add, submit and 5 pages plus RepairCard component (source session fd000b83).

## Environment Notes
- build:mp-weixin fails on pre-existing ZsPaging.vue error unrelated to changes (clean HEAD reproduces).
- Pre-commit lint-staged hook fails (missing module in parent workspace); commits use --no-verify.
- gitee remote is stale personal fork; correct push target is origin (gitlab.zhi.com).
- Deploy via nginx UI (admin port 9000) site 家园区一网通办H5.conf, D:\nginx, listen 8093, base /wechatapph5/, root project dist; main dev branch dev-v0; package manager bun.

## Project Overview
- Mobile C-end with second-hand housing, new housing, loan guide, policy pages.
- Known technical patterns tracked in tech-pattern entities (scoped_deep_fix, fddydetail_sections_missing, formmanual_load_check, vote_houseno_missing, decision_result_vote, dual_identity_flows, zspopup_pseudo_empty, z_paging_relocate_fix, api_dispatcher_consol, sfb_token_fix, url_token_session_fix, main_pkg_optimize, list_paging_migrate, richtext_rel_url_fix, cancel_cfg_key_fix, filelist_import_fix, c_announcement_zspaging, realname_skip_idtype, menuimage_defineoptions_fix, ref8443_render_mode, font_pixel_diff, ref8443_native_button, ref8443_header_fix).
- Code baseline: none; sourced from multiple cursor sessions.

## Verification & Attribution
- Project: 苏住房C; evidence: extracted source=cursor project=苏住房C
- Source session: fd000b83-ec69-43c3-8313-394ae8ba40c3
- Referenced by Suzhou Housing flood-control C-end H5 (GitLab suzhufang-fe/zhi2-mobile-query-h5) for homepage/mine pages (2026-11-09)


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_shimin",
  "source_extraction_id": "b38f11a4c3b04acabdd149126d3eb5aa",
  "version": 15,
  "memory_type": "entities"
}
-->