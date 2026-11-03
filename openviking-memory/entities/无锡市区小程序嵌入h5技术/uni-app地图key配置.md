# uni-app地图key配置
uni-app H5 地图报 `Map key not configured` 时需写 `__uniConfig.qqMapKey` 而非 `sdkConfigs.maps`。

## 问题根因
- 接口已返回 `qq.map.key`、周边 JSON 搜索正常，但 `<map>` 仍报错
- `loadMaps` 读构建写入的 `__uniConfig.qqMapKey`（来自 manifest），只改 `__uniConfig.h5.sdkConfigs.maps.qqmap.key` 无效

## 修复方案
- `qqMapKey.js` 运行时把接口 key 赋给 `__uniConfig.qqMapKey`
- `ZsMap.vue` 用 `qqMapRenderKey` 作为组件 key 在 key 就绪后强制重挂 map，避免首次失败缓存
- 腾讯控制台为该 key 开通 WebService + JavaScript API 并配 H5 域名白名单

## 验证与归属
- 验证证据：会话 46dc639b 用户强调异步已有 key 仍报错，结论区分 qqMapKey 与 sdkConfigs 字段并双修复
- 涉及文件：src/utils/qqMapKey.js、src/components/ZsMap/ZsMap.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：46dc639b-2c8b-48cf-aa77-f5de1880b71b；代码基线：3c384c1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "uni-app地图key配置",
  "source_extraction_id": "e1d333fda998440b965226a98fbc7d38",
  "version": 1,
  "memory_type": "entities"
}
-->