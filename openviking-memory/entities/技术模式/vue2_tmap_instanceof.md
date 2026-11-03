# Vue2代理或重复加载致TMap.Map校验失败
园区物管2.0 地图模块因 Vue2 响应式代理破坏 TMap.Map 原型链或重复加载脚本替换 window.TMap，致 instanceof 校验失败。

## 现象
- TMap.Map 的 instanceof 校验失败，地图与图层初始化异常

## 根因
- Vue2 响应式代理破坏 TMap.Map 原型链
- 重复加载脚本替换 window.TMap 致 instanceof 校验失败

## 解决方案
- mapLoader.js 改用单例加载（存在 window.TMap 直接 resolve）
- 地图与图层实例不存入 data()

## 验证与归属
- 验证证据：园区物管2.0/032.md
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、statisticsMap/components/map.vue、components/ZsTencentMap/mapLoader.js、transaction/screen/components/map.vue、property/mapProperty/index.vue、components/ZsTencentMap/index.vue、main.js
- 所属项目：园区物管2.0
- 来源会话：b8c9482d-979a-4abb-bdf3-cd1b595616ce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue2_tmap_instanceof",
  "source_extraction_id": "5336140ca3d7438dbc51c1ec0fc6e624",
  "version": 1,
  "memory_type": "entities"
}
-->