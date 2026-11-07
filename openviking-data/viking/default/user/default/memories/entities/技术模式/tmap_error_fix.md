# 腾讯地图TMap.Map实例校验报错修复
园区物管2.0 腾讯地图 GL 组件创建 `MultiPolygon`/`MultiMarker`/`MultiLabel` 时「所传入参数并非 TMap.Map 的实例」报错的修复。

## 问题原因
- Vue 2 响应式破坏实例：`TMap.Map` 或图层对象放 `data()` 会被 Vue 代理，原型链破坏，`instanceof` 校验失败
- 重复加载地图脚本：`created` 与 `mounted` 各调一次 `loadMap` 插入多份 `gljs`，`window.TMap` 被替换后旧实例不再属于新构造函数
- 异步竞态：`initPolygon` 在 JSONP 返回前组件已销毁，仍用已销毁 `map` 创建图层

## 解决方案
- `mapLoader.js` 改为单例加载，已存在 `window.TMap` 则直接 resolve，避免重复插入脚本
- 图层对象（marker、label、districtLayers 等）移出 `data()` 避免响应式代理
- 统一地图加载入口，避免 `created`/`mounted` 重复调用

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js、benefit/statisticsMap/index.vue、benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：b8c9482d-979a-4abb-bdf3-cd1b595616ce

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_error_fix",
  "source_extraction_id": "d49d6da15178402584b12c482ee3060a",
  "version": 1,
  "memory_type": "entities"
}
-->