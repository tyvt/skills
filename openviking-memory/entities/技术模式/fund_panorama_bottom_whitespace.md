# 缩放舞台页底部大留白根因
园区物管2.0 中 fundPanorama 数据大屏内容不足时纵向底部出现大片留白，根因是设计区被强行垫到至少 1080px。

## 现象
- fundPanorama 页面内容不多时纵向底部出现大片空白
- 内容高度不足 1080px 时整段底部空出

## 根因
- 样式上 .fund-panorama__design 设 min-height:1080px 强制垫高
- 逻辑上 updateLayoutMetrics/layoutScale/stageWrapStyle 均用 Math.max(1080, 实测高度) 做缩放计算，舞台高度与真实内容高度脱节

## 解决方案
- 「设计稿舞台 + 按内容缩放」类页面高度一律以真实 scrollHeight 实测值为准，不夹固定像素下限
- 去掉 min-height，将 designMeasuredH 改为 Math.max(1, design.scrollHeight)（防御性 Math.max(1, h) 防 0/除零）
- 首帧测量前仍用初始值过渡，需在 initCharts/mounted 里 nextTick 后立即用真实 scrollHeight 复测一次避免闪动

## 验证与归属
- 验证：会话 e29dc036 去掉 min-height:1080px 并将三处 Math.max(1080,…) 改为 Math.max(1, 实测高度) 后底部留白消失
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：e29dc036-f65f-4ad0-8174-ae9a94728599；代码基线：f00310232

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_panorama_bottom_whitespace",
  "source_extraction_id": "681170c36c0a48678c1d9fd2cb28823e",
  "version": 1,
  "memory_type": "entities"
}
-->