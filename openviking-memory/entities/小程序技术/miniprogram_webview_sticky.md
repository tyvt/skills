# web-view 内 H5 吸顶偏移须为 0
苏找房新房详情页 H5 嵌在三方小程序 web-view 内时 Tab 吸顶出现「穿屏」，根因是回退导航栏高度 40px 在 web-view 内凭空多出缝隙。

## 问题现象
- 滑动时详情户型/相册/周边吸顶 Tab 未贴顶，缝隙透出下面内容（穿屏）
- 首次修复后仍复现，用户补充关键事实「作为 web-view 嵌入到三方小程序内部」

## 根因
- H5 运行在宿主小程序 web-view 中，顶部导航栏由宿主提供，H5 内无 uni-page-head（全局 navigationStyle:custom）
- 上一版修复在「找不到导航栏」时回退 top:40px，仅独立 H5 成立；web-view 里凭空多 40px 缝隙

## 解决方案
- utils/index.js 增加 isMiniProgramWebView()（识别微信/支付宝 web-view，如 window.__wxjs_environment）与 getPageHeaderOffset()，web-view 内强制返回 0
- 仅存在可见 uni-page-head 的独立 H5 才用导航栏高度
- 页面 CSS 默认 top:0，删掉 40px 回退；加载时与 jweixin 注入后各校准一次吸顶偏移
- Tab 锚点滚动 scrollTop 偏移改动态计算，不写死常量；排查时 web-view 内开 vConsole 打印环境确认宿主

## 验证与归属
- 验证：会话 7e811367（基线 d43894b）用户指 web-view 嵌入，新增 isMiniProgramWebView()/getPageHeaderOffset()，web-view 强制 top:0
- 涉及文件：pages_transaction/newHouse/detail.vue、pages/commonNew/tabLine.vue、tabBtn.vue、utils/index.js
- 所属项目：苏住房C；来源会话ID：7e811367-b5c4-4dfb-83e7-e8f29ef7909c；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_webview_sticky",
  "source_extraction_id": "5b23890cee2f479791fcd3096d3399ab",
  "version": 1,
  "memory_type": "entities"
}
-->