# 路由守卫冗余区域列表接口调用返回500
路由守卫登录后基础数据加载误调 `store.dispatch('common/getRegions')` 请求 `/system/region/list` 无 query 且后端持续返回 500，已在多处移除。

## 问题根因
- 路由守卫 login 后基础数据加载调用 `common/getRegions` 请求 `/system/region/list`，无 query，后端持续 500
- `baseDataActionNames` 含 '行政区域列表' 冗余触发该 dispatch

## 修复要点
- 于 `zhi2-web-admin/src/router/index.js:174-180` 移除该 dispatch 及 `baseDataActionNames` 中 '行政区域列表'
- 于 `zhi2-web-admin/src/store/modules/common.js` 删除 `getRegions` action
- `common.allAreas` 与 `SET_ALL_AREAS` 因 `src/formatters/index.js` 等 20+ 处引用保留

## 验证与归属
- 验证证据：src=门户/048.md
- 涉及文件：zhi2-web-admin/src/store/modules/common.js、src/api/system.js、src/router/index.js、src/formatters/index.js、package.json 等
- 所属项目：门户；来源会话ID：cdc17e3f-09bf-4fff-8fd3-2d66641390ae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_region_500",
  "source_extraction_id": "56a38fda692548cf82b2bcef6e1ba103",
  "version": 1,
  "memory_type": "entities"
}
-->