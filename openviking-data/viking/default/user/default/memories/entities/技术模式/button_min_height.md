# 操作指引页主按钮定高居中
操作指引页主按钮原靠 padding 撑高导致文字不垂直居中，改为 min-height 定高 + inline-flex 居中，并同步窄屏断点。

## Description
- 现象：操作指引页主按钮文字不是真正的垂直居中，改完发现窄屏断点高度又不对。
- 根因：按钮用 `display:inline-block` + `padding:14px 56px` 靠内边距撑高，文字受行盒与内边距叠加偏上；窄屏(≤1024px)叠加上下10px padding 与 inline-flex 混用后高度不可控。
- 涉及文件：zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue。

## Solution
- `display:inline-block` 改为 `inline-flex` + `align-items:center` + `justify-content:center`，高度由 `min-height` 决定。
- 上下内边距归零（`padding:0 56px`），高度只由 `min-height`（本批48px）决定。
- 窄屏断点同步改 `min-height:40px; padding:0 28px`，避免混出别的盒高。
- 字号与行高配套微调：font-size 32px→28px、line-height 1.4→1.2；宽度、圆角、配色、hover、focus-visible、点击行为均不动。

## Verification
- 来源会话ID：session-3e238ff9-f252-4506-899f-41ea1c9881c7；代码基线：b6165db。
- 修改位置：OperationGuideBody.vue 第365-380行。
- 效果：桌面高度约73px→48px，移动端约40px。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "button_min_height",
  "source_extraction_id": "96758bb922ef469fa059939f20317c82",
  "version": 1,
  "memory_type": "entities"
}
-->