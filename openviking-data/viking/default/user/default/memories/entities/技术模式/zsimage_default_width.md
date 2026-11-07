# ZsImage默认满宽致装饰图不渲染
苏住房C移动端 ZsImage 在 flex 布局默认 width:100%，父容器无固定宽度致 icon_tip_bg.png 未渲染、圆角过渡消失。

## 问题根因
- ZsImage 在 flex 布局默认 width:100%
- 父容器无固定宽度致装饰图 icon_tip_bg.png 未渲染、圆角过渡消失

## 修复要点
- 装饰图设固定 88rpx×96rpx，白底加 border-bottom-left-radius:16rpx
- tip-text-box 设 align-items:flex-end

## 涉及文件
- src/pages_guard/index/index.vue
- src/components/ZsImage/ZsImage.vue
- src/pages.json
- src/utils/index.js

## 验证与归属
- 验证证据：extracted source=cursor session=092955df-f394-4c02-825f-866e02e9454a
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：092955df-f394-4c02-825f-866e02e9454a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_default_width",
  "source_extraction_id": "bac8a29b0640417db020196152582699",
  "version": 1,
  "memory_type": "entities"
}
-->