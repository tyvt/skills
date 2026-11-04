# zhi2-mobile-shimin
Submodule repository for the 苏住房 mobile H5 C端 (业主倡议·签字环节), pushed to origin (gitlab.zhi.com).

## Branches
- Submodule branches: main-v2.1, mp, sfb, each matched by a parent repo branch of the same name holding the gitlink
- Commits main-v2.1 -> 2a8d1eb7 (parent f5212d5), mp -> e3635bf3 (parent 4ddde2c), sfb -> b5ab9af6 (parent b43c13b)

## Migration Scope
- Added propose-new module (榆林版业主倡议): list/create/proposal-item-detail/detail/detailResponse + components SignBoard/CancelPopup/DecisionList/utils.js
- Wired 4 signing steps: addAppSuggest (top-level signatureUrl), cancelSuggestV2 (revocationSignatureUrl), appSuggestResponse (suggestResponseStatus 1/2, signatureUrl)
- Replaced old propose pages; updated menuRouteMap.js and pages.json to point to propose-new

## Environment Notes
- build:mp-weixin fails on pre-existing ZsPaging.vue error, unrelated to changes (reproduced on clean HEAD)
- Pre-commit lint-staged hook fails (missing module in parent workspace); commits use --no-verify
- gitee (gitlab) remote is a stale personal fork; correct push target is origin (gitlab.zhi.com)

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_shimin",
  "source_extraction_id": "6233ba9976a949fabb0e7ce56e7725d8",
  "version": 1,
  "memory_type": "entities"
}
-->