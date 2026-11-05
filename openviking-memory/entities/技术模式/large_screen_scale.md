
# 大屏等比缩放右侧留白修复
园区物管2.0 数据沙箱/全景类大屏页按 1920 设计稿缩放导致右侧留白的根因与动态设计稿宽度方案。

## 问题根因
- 缩放比取 min(按宽比例, 按高比例)；内容偏高时 scale = vh/内容高度 < vw/1920
- 设计稿固定 1920px 时实际显示宽度 = 1920 × scale < 视口宽，右侧必然空白；高度写死也导致压出一屏

## 解决方案
- 动态设计稿宽度：高度受限时设设计稿宽 = max(1920, ceil(视口宽/scale))，保证 设计稿宽 × scale = 视口宽横向铺满
- 统一 scale = min(按宽, 按高)，一屏内完整不变形
- 收紧各区块默认高度减轻高度约束（具体：柱图/画布 188px→156px；饼图区 276px→220px、画布 232px→196px；趋势图 242px→200px、容器 200px→168px；区县柱图 208px→172px；指标卡 72px→64px）
- 侧栏收起/展开后重新计算缩放
- 新增大屏页直接复用 assetPanorama 的缩放处理，不各页自写比例逻辑

## 验证与归属
- 验证：会话 aedd6cfa 给出根因推导与动态设计稿宽度公式，调整设计稿宽度与统一缩放比，收紧默认高度并侧栏重算；用户提示刷新后宽度贴边铺满，若某列偏窄可指定左/中/右单独调列宽比例
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue、src/views/benefit/dataSandbox/fundPanorama/index.vue、src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；代码基线 f00310232；来源会话 aedd6cfa-10c2-4204-ace0-2dc1b2eb8a12；验证证据：园区物管2.0/027.md


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "large_screen_scale",
  "source_extraction_id": "590443c3f99d4bf09846992fd31e3d90",
  "version": 2,
  "memory_type": "entities"
}
-->