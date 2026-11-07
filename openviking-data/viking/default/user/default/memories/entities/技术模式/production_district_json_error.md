# 生产包区划接口无代理落 SPA 致 JSON 报错
园区物管2.0 生产包在 `index-BiYbvZRJ.js:1` 报 `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`，链路为 `bootstrapMap` → `loadPlatformDistrictMapGeoJson`。根因是 tencentDistrictBoundary.js 仍走开发分支，fetch 落到 index.html 引发 res.json() 解析报错。

## 问题根因
- tencentDistrictBoundary.js 在生产包仍走开发分支，使用 fetch('./map/ws/district/...') 与 res.json()
- 生产环境无 Vite /map 代理，请求落到 index.html，解析 HTML 为 JSON 报错
- 原先靠 import.meta.env.DEV 区分环境，但 terser 压缩后 DEV 分支被错误保留，JSONP 分支被当死代码删除

## 解决方案
- 已修改 zhi2-web-admin/src/utils/tencentDistrictBoundary.js，统一使用 JSONP 直连腾讯行政区划 API
- 避免对 HTML 解析 JSON，生产环境正确加载 loadPlatformDistrictMapGeoJson 链路区划数据

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：src=园区物管2.0/020.md
- 涉及文件：views/benefit/mapOverview/index.vue、mapOverview/wuxiFallback.js、statisticsMap/components/map.vue、mapOverview/constants.js、utils/tencentDistrictBoundary.js、vite.config.js、package.json、dist/index.html
- 所属项目：园区物管2.0；来源会话：507339ea-ef77-48b3-981b-3f1a11ff9959

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "production_district_json_error",
  "source_extraction_id": "91a0c9fa499f40fb80332bfa25ef03ca",
  "version": 2,
  "memory_type": "entities"
}
-->