# 腾讯地图行政区名称重影修复
苏州市等行政区名称在腾讯矢量底图上出现重影/叠字，根因为底图 POI 文字与自定义 MultiLabel 叠加且 styleId 引用未定义键。

## 问题根因
- 用 TMap.MultiLabel 在行政区中心画名称标签时，腾讯矢量底图默认还会渲染 POI 文字（point 要素）
- 市中心 POI 名称与自定义标签叠在一起即成重影
- MultiLabel 的 styleId 必须与 styles 配置里定义的键一致，引用不存在的 styleId（如 'area_label_style'+uid）会异常渲染

## 解决方案
- initMap 时显式配置 baseMap 要素列表为 ['base','road','building','label']，去掉 point，保留道路/楼块/文字但不再显示 POI 名称
- MultiLabel 的 geometry styleId 统一改成 styles 里实际定义的键（如 'label'）
- 若产品要求保留其他 POI 名称，则反向改为去掉自定义 MultiLabel 或换个性化地图样式

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 f3c5b382 中 statisticsMap 地图苏州市文字重影，根因为底图 point 要素与 MultiLabel 叠加 + styleId 引用不存在的键
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue；zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：f3c5b382-87a4-49cf-9a4e-27efde2b94d2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_label_ghost",
  "source_extraction_id": "045a65d55d4b439cb1758c87ddea6f9a",
  "version": 1,
  "memory_type": "entities"
}
-->