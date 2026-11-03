# 腾讯地图 TMap 实例校验失败防御
园区物管2.0 中腾讯地图 GL JS API 创建 MultiPolygon/MultiMarker/MultiLabel 时报「所传入参数并非 TMap.Map 的实例」的三类根因与统一防御套路。

## 问题现象
- 创建 MultiPolygon/MultiMarker/MultiLabel 时报「所传入参数并非 TMap.Map 的实例」。

## 三类根因
- TMap.Map/图层对象放 Vue2 data() 被响应式代理破坏原型链，instanceof TMap.Map 校验失败（marker/label/图层作响应式属性同样中招）。
- created 与 mounted 各调一次 loadMap 重复插入 gljs 脚本，window.TMap 被替换后旧实例不再属新构造函数。
- JSONP 异步竞态，组件销毁后仍用旧 map 创建图层。

## 解决方案
- 地图脚本加载器做单例（window.TMap 已存在直接 resolve），只在 mounted 调一次。
- 地图及全部图层对象统一存非响应式上下文（如 this._tmapCtx），绝不放 data()。
- 创建图层前显式校验 map instanceof TMap.Map。
- 用 _mapViewToken/_destroyed 标志防止销毁后仍绘制；此套路适用于所有 WebGL/地图实例引入 Vue2 场景。

## 验证与归属
- 验证：032.md 会话 b8c9482d 列出三类根因与 mapLoader.js 单例 + _tmapCtx 非响应式 + token 防竞态修改。
- 涉及文件：src/components/ZsTencentMap/mapLoader.js、src/views/benefit/statisticsMap/components/map.vue；所属项目：园区物管2.0；来源会话：b8c9482d-979a-4abb-bdf3-cd1b595616ce；代码基线：c97957703。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_instance_guard",
  "source_extraction_id": "88d68922b8ca46d2b8056d0afb581a2e",
  "version": 1,
  "memory_type": "entities"
}
-->