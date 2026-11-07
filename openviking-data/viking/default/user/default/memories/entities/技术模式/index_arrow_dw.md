# 首页装饰箭头改用dw描边
门户首页 index-new 「公示公告」等列表右侧「更多」箭头原用字符 › 且固定16px，未走 dw() 缩放，改为纯CSS描边箭头对齐1024设计稿。

## Description
- 现象：首页列表右侧「更多」箭头用字符 `›` 且 font-size:16px，未走 index-new 的 dw()（$design-w:1024）缩放，字形细、像小点，与 design_reference 不一致。
- 根因：Unicode箭头字号是固定CSS像素，和同页响应式基准脱节，换更大字号仍难对齐设计稿线宽与色值。
- 所属项目：门户；涉及文件：zhi2-web-admin/src/views/home/index-new.vue、public/assets/images/homeNew/design_reference.png、tests/e2e/portal-home-visual.spec.ts

## Solution
- 改为纯CSS描边箭头（border + rotate），尺寸与线宽用 dw()（示例约 dw(7)×dw(7)、线宽 dw(2)、色 #c5c5c5）。
- 装饰性图标加 aria-hidden="true"。
- 验收对照 design_reference.png 或 portal-home-visual E2E。

## Verification
- 验证：会话 4a686bf4 根因字符 › 16px 未 dw 缩放；已改为 dw 描边箭头并 aria-hidden，刷新公示公告区对比设计稿。
- 来源会话ID：4a686bf4-5dee-44d8-905f-7025c81f52cd；代码基线：04586c4

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_arrow_dw",
  "source_extraction_id": "ca27764bcf814f6b8bfa01c9f8541337",
  "version": 1,
  "memory_type": "entities"
}
-->
