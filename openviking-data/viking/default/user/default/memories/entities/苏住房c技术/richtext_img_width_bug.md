# 富文本图片超宽需注入内联样式
苏住房C小程序rich-text组件内部img不受外部CSS控制，需在formatRichTextContent中统一注入内联宽度样式。
## 问题现象
- 所有富文本（政策、公告、协议）由ZsRichText渲染，用户要求图片宽度不超屏幕
- 小程序端图片按原始尺寸溢出屏幕
## 根因
- 微信小程序rich-text内部节点不受外部CSS控制（选择器进不去shadow结构）
- uni.scss中.rich-text img{width:100%}仅在H5条件编译生效，小程序端无兜底
- 页面逐个加:deep或改容器宽度同样无效
## 解决方案
- 在utils/index.js的formatRichTextContent统一改写所有img：删width/height属性、清style宽高、注入内联max-width:100%;width:100%;height:auto;display:block
- uni.scss将.rich-text的max-width/overflow/word-break提升为全平台；ZsRichText根容器加max-width:100%+overflow:hidden
- 同类富文本内表格/iframe/长英文字符串也应在字符串层处理
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话0f7f7bd6（2026-08-21，基线9832ba3）截图要求限宽，结论rich-text无法外部CSS控img，改formatRichTextContent注入样式
- 涉及文件：src/utils/index.js、components/ZsRichText/ZsRichText.vue、uni.scss、pages_transaction/buyHousePolicy/detail.vue
- 所属项目：苏住房C；来源会话ID：0f7f7bd6-7929-4524-8766-b29fbb4c9405；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "richtext_img_width_bug",
  "source_extraction_id": "a68f950bba1b44e9a14c8d4a241c865f",
  "version": 1,
  "memory_type": "entities"
}
-->