# 公共查询备案返回保留query
淮安物管公共查询小区详情从业委会/物管会备案返回时，需保留原详情页 query 以免页面空白的技术修复模式。

## 问题根因
- `goBack()` 统一写 `query: { type: 'back' }`，覆盖原 `formMode=view`，导致详情页不调用 `init()` 拉数据。
- `committeeTable` 中 `backUrl` 仅用 `this.$route.path`，未带 `?formMode=view`。
- `AppMain` 用 `:key="$route.fullPath"`，query 变化会重建组件，必须返回时保留正确 query 才能重新加载。

## 修复方案
- `main.js` 的 `goBack()`：有 `backUrl` 时直接 `router.push(backUrl)`，保留完整路径与 query。
- `committeeTable.vue` 的 `backUrl` 改为携带完整 query（如 `this.$route.fullPath`）。
- 广告位备案等因未传 `backUrl`，返回不改写 query，原 `formMode=view` 仍在，故正常。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：e6ed7dbc-1d6e-459f-aec6-1548de9852da
- 涉及文件：src/main.js、publicQuery/complex/components/committeeTable.vue、changeDetailMixin.js、publicQuery/complex/detail.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicquery_back_query",
  "source_extraction_id": "4ebd15bf71a8499ab4122103a7acac56",
  "version": 1,
  "memory_type": "entities"
}
-->