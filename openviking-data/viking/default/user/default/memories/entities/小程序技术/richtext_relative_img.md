# 富文本rich-text相对路径图片必空白
苏住房C小程序rich-text组件直接渲染含相对路径图片的HTML会静默空白，因微信不补全域名。

## 问题现象
- 「购房政策→苏州市购房政策」详情页标题时间正常，正文空白；接口数据正常，正文仅一张`<img src="/zs-fym/2025/05/29/xxx.png"/>`
- 跳转链接多打问号detail??id=致取不到id，也是空白第二成因

## 根因
- 后端下发图片相对路径，rich-text不会做域名补全，相对路径加载失败
- 项目ZsImage自带补全逻辑故用ZsImage页面正常，直接塞rich-text的正文全静默空白，仅部分页面复现

## 解决方案
- utils/index.js新增resolveFullMediaUrl（相对路径按平台域名补全）与formatRichTextContent（正则批量转富文本相对src为完整URL）
- 渲染前对正文转换：落点pages/news/components/ListDetail.vue及threeLowOneWidthEquivalent同类页
- 修正buyHousePolicy/index.vue、fundPolicy/index.vue的detail??id=多余问号；vConsole Network确认图片200

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话5dc51561用户诉求「购房政策为空」；结论正文相对路径rich-text无法加载，修复加两函数并修问号
- 涉及文件：src/utils/index.js、pages/news/components/ListDetail.vue、pages_transaction/buyHousePolicy/index.vue、detail.vue、pages_my/onlineService/PolicyDetail.vue
- 所属项目：苏住房C；来源会话ID：5dc51561-f159-4aea-926e-8205773be7f2；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "richtext_relative_img",
  "source_extraction_id": "789f39094ad64ddc97500806c533c5b4",
  "version": 1,
  "memory_type": "entities"
}
-->