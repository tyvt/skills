# 工作端入口图标与文字弹性布局对齐宽高 28rpx
i淮安H5 首页工作端入口改为图标加文字结构，并用 flex 居中、图标宽高 28rpx 对齐。

## 问题根因
- zhi2-mobile-admin-h5-c-unlimited/src/pages/index/home.vue 中原 `⇄ 前往工作端` 文本与图标未弹性对齐

## 修复方案
- 改为 `resolveZhishuAsset("切换@2x.png")` 图标加 `<text>前往工作端</text>` 结构
- `.work-entry` 设 `display: flex; align-items: center;`
- `.work-entry-icon` 宽高 `28rpx`、间距 `8rpx` 实现居中对齐

## 验证与归属
- 验证证据：extracted source=cursor session=ebb91558-f8ca-42c6-b856-4374878a6f5b
- 涉及文件：src/pages/index/home.vue
- 所属项目：i淮安H5（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "work_entry_flex",
  "source_extraction_id": "6a92cd0d2cf745689e77dc42af9f9088",
  "version": 1,
  "memory_type": "entities"
}
-->