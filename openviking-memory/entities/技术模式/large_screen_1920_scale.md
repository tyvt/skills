# 固定1920设计稿按高度缩放右侧留白修复
园区物管2.0 大屏固定 1920px 设计稿按内容高度缩放时，内容偏高导致实际显示宽度小于视口宽，出现右侧留白。

## 问题根因
- 当内容偏高时 scale = vh / 内容高度 小于 vw / 1920
- 固定 1920px 设计稿按较小 scale 缩放后，实际显示宽度小于视口宽，右侧留白

## 解决方案
- 动态设置设计稿宽度为 max(1920, ceil(视口宽 / scale))
- 统一缩放取 scale = min(按宽比例, 按高比例)
- 柱图默认高度 188px→156px、饼图区 276px→220px 等同步收紧
- 侧栏收起/展开后重新计算缩放

## 验证与归属
- 验证：会话 aedd6cfa 调整设计稿宽度与统一缩放比，收紧默认高度并侧栏重算
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、fundPanorama/index.vue、mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：aedd6cfa-10c2-4204-ace0-2dc1b2eb8a12；代码基线：none；验证证据：园区物管2.0/027.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "large_screen_1920_scale",
  "source_extraction_id": "236e0ad1f0424f45996c7c5522b4f29a",
  "version": 1,
  "memory_type": "entities"
}
-->