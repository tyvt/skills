# 复制Tab区块三处同步遗漏
园区物管2.0 中从其他页面复制 Tab/区块后，因三类同步点未对齐导致 Tab 不加载、不请求、不展示的已知坑。

## 问题根因
- 从地图抽屉页 overviewContent.vue 复制「运营报告」Tab 到详情页后，切到该 Tab 既不发 PDF 请求也不展示且无报错
- Tab 值契约不一致：sourceMenuList 中该 Tab value 为 "7"，但 activeContentValue 的 watcher 判的是复制来源页的 "report"，watcher 永不命中
- contentShow 是复制来源页的显隐开关，详情页从未置 true，即使接口返回也会被丢弃
- getDetail 只更新了 form 没同步 sourceData，reportComplexId 等下游依赖取不到值

## 解决方案
- 复制 Tab/区块后必须逐一核对三类同步点：菜单列表与 watcher 判断逻辑的 Tab value 是否同一字符串
- 复制页自带的显隐开关（contentShow 类）要在新页面生命周期里正确赋值
- 详情接口回调除 form 外还要把原始响应同步给所有依赖对象（sourceData）
- 排查顺序：watcher 判断值 → 显隐开关 → 详情数据同步

## 验证与归属
- 验证：运营报告 Tab 三个独立原因（value "7" vs watcher 判 "report"、contentShow 未置 true、sourceData 未赋值），修在 statisticsMapDetail/index.vue
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMapDetail/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/overviewContent.vue
- 所属项目：园区物管2.0；代码基线：从苏房V3同源仓库复制而来，此前未记录「复制 Tab 页遗漏三处同步」；来源会话：a65a6cae-bf1f-497f-a3c3-feeccadacb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "copy_tab_three_sync",
  "source_extraction_id": "21155a3ba2ee488fb8dc6fd1a92e34f7",
  "version": 1,
  "memory_type": "entities"
}
-->