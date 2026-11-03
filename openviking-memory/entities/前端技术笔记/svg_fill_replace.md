# SVG 图标换色只替换 path fill
大屏页按色值替换 SVG 图标颜色时，正则只替换第一个 fill 会误改根节点 fill="none"，必须只替换 path 上的十六进制色值。

## 现象
- 大屏页需按用户给定色值替换 SVG 图标颜色（如图例图标与柱体颜色一致），用正则替换后图例颜色仍不变。

## 根因
- 很多 SVG 根节点 svg 带 fill="none"，真正颜色写在 path 的 fill="#xxx" 上。
- 若正则只替换「第一个 fill」，会把根节点 none 误改成目标色，而决定显示颜色的 path 仍是旧色。

## 解决方案
- 色值替换必须只作用于 path 等绘制节点的十六进制 fill，跳过 fill="none"。
- 更稳妥做法：按「fill="#hex" 完整匹配带 # 的色值」而非裸匹配 fill 属性。
- 通用坑：SVG 装饰图标颜色非 CSS 控制，改色要落到 SVG 源码 path 层。

## 关联信息
- 涉及文件：zhi2-web-admin/src/assets/images/mapOverview/apply.svg、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue。
- 所属项目：园区物管2.0；来源会话：74cda9bf-bc09-433c-99cf-1a36768b982a；代码基线：6a4835a08。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "svg_fill_replace",
  "source_extraction_id": "5219c7a7105248f8b4405359a4b162dd",
  "version": 1,
  "memory_type": "entities"
}
-->