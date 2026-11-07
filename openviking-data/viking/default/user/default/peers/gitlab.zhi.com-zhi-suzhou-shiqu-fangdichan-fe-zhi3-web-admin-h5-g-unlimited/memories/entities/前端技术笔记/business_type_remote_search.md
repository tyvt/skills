# 业务类型远程搜索下拉无数据修复
Backend POST /system/menu/listBusCodeMenuByKeyWord is @RequestBody String and requires text/plain raw keyword; frontend previously sent JSON via this.$get, causing backend literal like match to return 0 rows and an empty dropdown.

## Root Cause
- Backend expects raw text/plain keyword, not JSON; the common request layer serializes the param object as JSON, so backend matches the literal string `{"keyWord":"..."}` and always returns 0 rows
- Generic handleQuery called getList() with no busCode filter; dropdown close re-fetched the menu and cleared the transient filter text, so the input disappeared after clicking 查询

## Fix
- fetchBusCodeMenu changed to $post(url, kw, { Content-Type: text/plain }); empty keyword sends a space to fetch all 165 options
- Added busCodeTypedKeyword; overrode handleQuery so when busCode is empty it resolves the typed name to a busCode via resolveBusCodeByKeyword, then queries; the input text is preserved
- resolveBusCodeByKeyword: exact dictLabel match then dedupe by dictValue for a unique fuzzy match, with fallback to API call, avoiding ambiguous picks

## Files
- zhi2-web-admin/src/views/flowable/todo.vue
- zhi2-web-admin/src/views/flowable/process.vue
- zhi2-web-admin/src/views/flowable/finished.vue

## Verification
- Deployed site nginx:8098 with Playwright real login: typing "账户开户" returned 2 dropdown items; clicking 搜索 sent request {"busCode":"070401"}, total=3, and the input box retained "账户开户"
- npx eslint on the 3 files reported 0 errors; npm run build passed
- Commits: submodule 52045369c and parent 27465c3 pushed to develop/v3.0.0
- ZenTao #5980 set to resolved/fixed, resolver tiany, reassigned to lichandan for verification (action 85992)

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "前端技术笔记",
  "name": "business_type_remote_search",
  "source_extraction_id": "f8b2257a1f304ec4a29ea5df7ca07223",
  "version": 1,
  "memory_type": "entities"
}
-->