# 新房详情页web-view内Tab吸顶穿屏修复
苏住房C苏找房H5嵌在三方小程序 web-view 里运行时，新房详情页Tab吸顶留出空隙导致内容穿屏，已修复。

## 问题根因
- 苏找房H5嵌在三方小程序 web-view 内，顶部导航栏由宿主小程序提供，H5页面无 uni-page-head
- 上次修复在找不到导航栏时回退到 top:40px，Tab吸顶与顶部间留空隙，内容从缝隙透出

## 修复内容
- utils/index.js 新增 isMiniProgramWebView()/getPageHeaderOffset()，识别微信/支付宝小程序 web-view 环境，web-view 内强制 top:0
- 仅在有可见 uni-page-head 的独立H5页面才使用导航栏高度
- detail.vue CSS默认 top:0 去掉40px回退，页面加载及 jweixin 注入后各校准一次吸顶偏移
- Tab锚点滚动偏移同步改为动态计算

## 涉及文件与归属
- 涉及文件：utils/index.js、detail.vue、ZsNav.vue、tabLine.vue、tabBtn.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：7e811367-b5c4-4dfb-83e7-e8f29ef7909c

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_sticky_fix",
  "source_extraction_id": "62aa14aed6054f559c50f3eb85d9fa1b",
  "version": 1,
  "memory_type": "entities"
}
-->