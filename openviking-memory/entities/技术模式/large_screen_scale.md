# 大屏等比缩放右侧留白修复
园区物管2.0 数据沙箱/全景类大屏页按 1920 设计稿缩放导致右侧留白的根因与动态设计稿宽度方案。

## 问题根因
- 缩放比取 min(按宽比例, 按高比例)；内容偏高时 scale = vh/内容高度 < vw/1920
- 设计稿固定 1920px 时实际显示宽度 = 1920 × scale < 视口宽，右侧必然空白；高度写死也导致压出一屏

## 解决方案
- 动态设计稿宽度：高度受限时设设计稿宽 = max(1920, ceil(视口宽/scale))，保证 设计稿宽 × scale = 视口宽横向铺满
- 统一 scale = min(按宽, 按高)，一屏内完整不变形
- 收紧各区块默认高度（柱图/饼图/趋势图/指标卡各减 30~50px）减轻高度约束
- 侧栏收起/展开后重新计算缩放；新增大屏页直接复用 assetPanorama 的缩放处理，不各页自写比例逻辑

## 验证与归属
- 验证：会话 aedd6cfa 给出根因推导与动态设计稿宽度公式
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue、src/views/benefit/dataSandbox/fundPanorama/index.vue、src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；代码基线 f00310232；来源会话 aedd6cfa-10c2-4204-ace0-2dc1b2eb8a12

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "large_screen_scale",
  "source_extraction_id": "79b34236c0554bfc9e14393689c2988b",
  "version": 1,
  "memory_type": "entities"
}
-->