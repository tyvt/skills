# ZsTencentMap弹窗TMap未定义需await loadMap
ZsTencentMap地图弹窗因SDK异步加载未等待导致TMap is not defined的缺陷与修复方案。

## 问题根因
- 组件created()调用loadMap()加载腾讯地图SDK脚本但不等待完成
- 弹窗onOpen()在$nextTick里直接init()，此时SDK脚本尚未加载完，全局TMap不存在
- 根因：脚本动态加载是异步的，任何依赖全局SDK的init都必须await

## 解决方案
- onOpen()改为loadMap().then(() => this.$nextTick(() => this.init())).catch(() => msgError('腾讯地图加载失败，请检查系统配置'))
- created()里loadMap()保留作预加载，loadMap内部复用同一个Promise，不会重复注入脚本
- 适用于所有以<script>注入方式加载的第三方地图/图表SDK
- 若仍失败需检查系统配置的腾讯地图Key（qq.map.key）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话c02c94c0报错栈在ZsTencentMap/index.vue；修复代码onOpen()串接loadMap().then
- 涉及文件：zhi2-web-admin/src/components/ZsTencentMap/index.vue、zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js
- 所属项目：产品2.0；来源会话ID：c02c94c0-4ea3-4558-a2c3-49dd740548de；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_onopen_loadmap",
  "source_extraction_id": "ad869c7e1cac472293a790f179a77c52",
  "version": 1,
  "memory_type": "entities"
}
-->