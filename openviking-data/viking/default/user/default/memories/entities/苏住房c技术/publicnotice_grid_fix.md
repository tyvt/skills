# 双晒公示页两列网格布局修复
苏住房C(zhi2-mobile-shimin)小程序中双晒公示页因卡片最小宽度超出容器导致两列布局失效，已通过CSS Grid等方案修复。

## 问题根因
- 卡片设 `flex: 0 0 48%`，但标题 `white-space: nowrap`，加图标和箭头后最小宽度约400rpx，超出48%容器宽度(约340rpx)
- 每行只能放1张卡，右侧留空，2列布局未恢复

## 修复方案
- 在 `publicNotice/index.vue` 中将 Flex 改为 CSS Grid：`grid-template-columns: repeat(2, minmax(0, 1fr))` 强制两列等宽
- 标题允许换行：去掉 `nowrap`，改为 `word-break: break-all`
- 略微缩小图标至 96×110rpx，给 `ZsImage` 宿主元素设置固定宽高
- 卡片加 `overflow: hidden` 和 `min-width: 0`，避免内容撑破网格

## 验证与归属
- 预期效果为 2×2 网格、左右对称铺满，需重新编译后在微信开发者工具查看
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_main/publicNotice/index.vue`
- 来源会话ID：9774c8d1-2b21-4a57-a4db-44c6514d4939；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "publicnotice_grid_fix",
  "source_extraction_id": "6528a1185c544a1ba7b847924dbc2b47",
  "version": 1,
  "memory_type": "entities"
}
-->