# 双晒公示页两列卡片塌陷bug
双晒公示页卡片塌成一列，根因为flex:0 0 48%配合nowrap标题使最小宽度超出容器，改用CSS Grid兜底。

## 问题根因
- 卡片内容最小宽度(min-content)超48%分配宽度：标题white-space:nowrap+图标+右箭头，实测最小宽约400rpx，容器48%约340rpx。
- flex布局无法将卡片压到48%，只能每行放一张，右侧留空。

## 解决方案
- 容器从flex改CSS Grid：grid-template-columns: repeat(2, minmax(0,1fr))，minmax(0,1fr)允许子项压缩到内容最小宽度以下。
- 去掉标题nowrap，改word-break: break-all允许换行降低最小宽度。
- 卡片加min-width:0与overflow:hidden防止内容撑破网格。
- ZsImage宿主元素显式固定宽高(96×110rpx)避免图片按原始尺寸参与测宽。
- 通用结论：小程序固定列数卡片墙含nowrap文本+图片+图标时，优先Grid+minmax(0,1fr)+min-width:0三件套。

## 验证与归属
- 验证：会话9774c8d1用户先贴截图问UI崩，修图标后仍两列未恢复，最终给四项修复。
- 涉及文件：zhi2-mobile-shimin/src/pages_main/publicNotice/index.vue、components/ZsImage/ZsImage.vue。
- 所属项目：苏住房C；代码基线：bb6d74a；来源会话ID：9774c8d1-2b21-4a57-a4db-44c6514d4939。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "publicnotice_grid_bug",
  "source_extraction_id": "2a3c186a43ce41b1b1060f5995a31a14",
  "version": 1,
  "memory_type": "entities"
}
-->