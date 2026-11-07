# 守护页提示横幅圆角缺失修复
苏住房C小程序 pages_guard/index/index.vue 中提示横幅右侧装饰图未正确渲染导致圆角过渡消失，已通过固定尺寸与对齐修复。

## 问题根因
- ZsImage 在 flex 布局使用默认 width:100%，父容器无固定宽度导致 icon_tip_bg.png 未正确渲染，圆角过渡消失。
- 圆角效果由右侧装饰图与左侧白底区域共同构成。

## 修复内容
- 为装饰图设置固定尺寸 88rpx × 96rpx（对应原图 44×48 的 2 倍）。
- 白底区域增加 border-bottom-left-radius: 16rpx。
- 调整 tip-text-box 为 align-items: flex-end，使装饰图与横幅底部对齐。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译预览，「您共申请守护对象 X 人」右侧应出现 S 形圆角过渡，不再显示直角白块。
- 涉及文件：pages_guard/index/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：092955df-f394-4c02-825f-866e02e9454a

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "guard_tip_bg_radius_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 1,
  "memory_type": "entities"
}
-->