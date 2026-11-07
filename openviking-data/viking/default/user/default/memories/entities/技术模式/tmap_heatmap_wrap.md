# 腾讯地图点热力封装套路
在数据看板中封装可复用的腾讯地图点热力组件，优先使用可视化热力图层并在加载失败时优雅降级而非白屏。

## 背景与问题
- 苏州地图需落地商品房/存量房/租赁三业务热力数据，本地无网络或SDK加载失败时不能白屏。
- TMap.visualization.Heat 在不同版本/授权下可能不存在；loadMap 异步脚本加载可能失败、超时、无key、离线。
- 此条补充「热力图层+优雅降级+生命周期清理」完整封装，实例不入data()等已在他条覆盖。

## 解决方案
- 组件内 import loadMap from '@/components/ZsTencentMap/mapLoader.js'（默认导出返回 Promise<TMap>），必须 await。
- new TMap.Map(el, {center: new TMap.LatLng(31.30,120.62), zoom:11, viewMode:'2D'})，容器明确高度（本项目热力页统一520px）。
- 热力优先 TMap.visualization.Heat({radius:40, maxValue, minValue:0, gradientColor}) → addTo(map) → setData({lat,lng,count})；无Heat回退 TMap.MultiMarker 打点。
- catch 后置 failed=true 渲染 el-alert「腾讯地图加载失败，已切换为区县热力视图」并 $emit('error') 让父级切ECharts区县choropleth，绝不抛未捕获异常。
- watch points(deep)重新setData，beforeDestroy摘除heat/marker并map.destroy()；地图实例用普通实例变量持有，不入data()响应式。

## 组合形态
- 区县热力用 ECharts type:'map'+map:'suzhou'（registerMap在created try/catch），visualMap连续色阶 #e8f4ff→#1a5599，右侧配Top榜+区县榜单(da-rank-bar)。

## 验证与归属
- 验证：会话 session-6c46bea2-2d63-4a2d-b33f-f111655982f2（基线a86bf95）子agent结论写明 TencentHeatMap.vue props(points/unit/height默认520px)、loadMap默认导出、优先Heat回退MultiMarker、catch后el-alert+$emit('error')、watch/beforeDestroy。
- 涉及文件：zhi2-web-admin/src/views/dataAnalysis/pages/heat/TencentHeatMap.vue、zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js、zhi2-web-admin/src/components/ZsTencentMap/index.vue。
- 所属项目：zhi2-web-admin；来源会话ID：session-6c46bea2-2d63-4a2d-b33f-f111655982f2；代码基线：a86bf95。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_heatmap_wrap",
  "source_extraction_id": "17610b81bcb7473e99c75e4ee8483cbb",
  "version": 1,
  "memory_type": "entities"
}
-->