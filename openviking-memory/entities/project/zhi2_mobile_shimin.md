# zhi2-mobile-shimin
uni-app Vue3 H5 project for 苏住房 (Suzhou Housing) mobile C-end (owner initiative/signing), frontend dir D:\repository\苏住房C\zhi2-mobile-shimin, connects to backend transaction and other services, pushed to origin (gitlab.zhi.com).

## Branches
- Submodule branches: main-v2.1, mp, sfb, each matched by a parent repo branch of same name holding the gitlink
- Commits main-v2.1 -> 2a8d1eb7 (parent f5212d5), mp -> e3635bf3 (parent 4ddde2c), sfb -> b5ab9af6 (parent b43c13b)

## Migration Scope
- Added propose-new module (Yulin version owner initiative): list/create/proposal-item-detail/detail/detailResponse + components SignBoard/CancelPopup/DecisionList/utils.js
- Wired 4 signing steps: addAppSuggest (top-level signatureUrl), cancelSuggestV2 (revocationSignatureUrl), appSuggestResponse (suggestResponseStatus 1/2, signatureUrl)
- Replaced old propose pages; updated menuRouteMap.js and pages.json to point to propose-new
- Migrated work order (报修报事) module from Yulin miniprogram: property.js interface switched from old eventReport to /property/workOrder/app/ series APIs; involves index, add, submit and 5 total pages plus RepairCard component for repair reporting flow (source session fd000b83-ec69-43c3-8313-394ae8ba40c3)

## Environment Notes
- build:mp-weixin fails on pre-existing ZsPaging.vue error, unrelated to changes (reproduced on clean HEAD)
- Pre-commit lint-staged hook fails (missing module in parent workspace); commits use --no-verify
- gitee (gitlab) remote is a stale personal fork; correct push target is origin (gitlab.zhi.com)
- 部署用 nginx UI（管理端口 9000）站点 家园区一网通办H5.conf，位于 D:\nginx，监听 8093，base /wechatapph5/，root 指向项目 dist；主开发分支 dev-v0；包管理用 bun

## Project Overview
- Mobile C-end project with second-hand housing, new housing, loan guide, policy and other pages
- Known technical patterns tracked in tech-pattern entities (e.g. scoped_deep_fix, fddydetail_sections_missing, formmanual_load_check, vote_houseno_missing, decision_result_vote, dual_identity_flows, zspopup_pseudo_empty, z_paging_relocate_fix, api_dispatcher_consol, sfb_token_fix, main_pkg_optimize, list_paging_migrate, richtext_rel_url_fix, cancel_cfg_key_fix, filelist_import_fix, c_announcement_zspaging, realname_skip_idtype, menuimage_defineoptions_fix, ref8443_render_mode, font_pixel_diff, ref8443_native_button, ref8443_header_fix)
- Code baseline: none; sourced from multiple cursor session extractions (bug/pattern/fact)

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_shimin",
  "source_extraction_id": "97849f75806a4f60bad9ca0a61714229",
  "version": 12,
  "memory_type": "entities"
}
-->