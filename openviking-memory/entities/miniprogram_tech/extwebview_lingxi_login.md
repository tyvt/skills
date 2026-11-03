
# externalWebview lingxi link compatible with authCode and login
externalWebview reuses getQueryParamsFromOptions to parse authCode/authoCode to trigger the lingxi link; onLoad without token runs startLoginFlow().

## Trigger and parsing
- Reuse `getQueryParamsFromOptions` to parse `authCode` or `authoCode` and trigger the lingxi link
- On `onLoad` with no token, set `lingXiAutoLoginTriggered` and execute `startLoginFlow()`

## Execution chain
- After `refreshFromServer()`, call `maybeRunLingXiSelectMyHouse()`
- In non-dev builds, when `authCode === '0'`, do not request `selectMyHouse`

## Verification and ownership
- Evidence: extracted source=cursor session=38603878-ea6a-4871-8ac2-8531b6c94bb4
- Files: pages/webview/externalWebview.vue, pages/user/index/index.vue, utils/portal-user.js, pages/webview/temp.vue
- Source session: 38603878-ea6a-4871-8ac2-8531b6c94bb4; code baseline: none


<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "extwebview_lingxi_login",
  "source_extraction_id": "74400517991b4f5fbc932da6d5306cd6",
  "version": 1,
  "memory_type": "entities"
}
-->