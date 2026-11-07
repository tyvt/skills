# CMS富文本尖括号误判导致正文白屏
苏住房C市民端CMS富文本页因书名号误写尖括号被rich-text当非法HTML标签解析失败，整块白屏仅控制台Parse Error。

## 问题现象
- 市民端「在线服务→流程指南/政策法规/公告」等CMS富文本页，进入某条时标题显示、正文整块白屏
- 控制台仅有`Parse Error`，页面无JS异常，易误判为组件或接口问题

## 根因
- 正文HTML经页面→ZsRichText→formatRichTextContent→`<rich-text>`渲染
- CMS录入将书名号《》误写成尖括号`<业主大会>`，被当作HTML标签解析失败，`<rich-text>`整块不渲染

## 解决方案
- 在formatRichTextContent内加escapeInvalidHtmlAngleBrackets：`String(html).replace(/<(?!\/?[a-zA-Z!])/g, '&lt;')`转义非合法标签`<`
- 一处修复覆盖所有ZsRichText消费页；同时通知后台CMS改回《业主大会议事规则》从源头修数据
- 验收：首页→在线服务→流程指南→物业服务→第二篇指南正文正常显示

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话3a1c5d68用户贴截图正文与Parse Error，定位`<业主大会>`覆盖书名号，改utils/index.js后恢复
- 涉及文件：src/utils/index.js、src/components/ZsRichText/ZsRichText.vue、src/pages_my/onlineService/PolicyDetail.vue
- 所属项目：苏住房C；来源会话ID：3a1c5d68-e7a3-441a-a399-b1778fbaea6f；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "cms_angle_bracket_bug",
  "source_extraction_id": "c7b854de2e864b02b107787c6c9eb2e8",
  "version": 1,
  "memory_type": "entities"
}
-->