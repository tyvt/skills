# 富文本图片宽度限制修复
苏住房C 小程序端富文本图片因 `rich-text` 无法被外部 CSS 约束而溢出屏幕，已通过内联样式与组件容器修复。

## 问题原因
- 微信小程序 `rich-text` 组件无法通过外部 CSS 控制内部 `img`
- 原 `uni.scss` 中 `.rich-text img { width: 100% }` 仅在 H5 条件编译生效，小程序端图片按原始宽度溢出

## 修复内容
- `src/utils/index.js` 的 `formatRichTextContent`：移除 width/height 属性，清除 style 宽高，注入内联样式 `max-width:100%; width:100%; height:auto; display:block`
- `src/uni.scss`：将 `.rich-text` 基础样式（max-width、overflow、word-break）移至全平台生效，H5 保留 img CSS 兜底
- `src/components/ZsRichText/ZsRichText.vue`：容器增加 `max-width: 100%` 和 `overflow: hidden`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/utils/index.js`、`src/uni.scss`、`src/components/ZsRichText/ZsRichText.vue`
- 所属项目：苏住房C；来源会话ID：0f7f7bd6-7929-4524-8766-b29fbb4c9405；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "richtext_img_width",
  "source_extraction_id": "10da4203cded4af8a50dcda2490f11c8",
  "version": 1,
  "memory_type": "entities"
}
-->