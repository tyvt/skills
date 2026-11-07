# 小程序禁用 window.scrollTo 锚点滚动
苏住房C 市民端新房详情页用 `window.scrollTo` 做 tab 锚点滚动，微信小程序抛 TypeError，需改 uni.createSelectorQuery + uni.pageScrollTo。

## 现象与根因
- pages_transaction/newHouse/detail.vue 的 setTab 用 `window.scrollTo({...})` 做「详情/户型/相册/周边」tab 锚点滚动
- 微信开发者工具抛 TypeError: Cannot read property 'scrollTo' of undefined（栈顶 setTab），H5 预览却正常
- 根因：小程序逻辑层无 window 对象，uni-app 编译到 mp-weixin 后 window 为 undefined；此类「H5 能跑、小程序崩」是跨端移植常见 bug

## 解决方案
- 滚动统一改跨端 API：uni.createSelectorQuery().select('#md0').boundingClientRect() 拿位置，再算偏移调 uni.pageScrollTo({ scrollTop: scrollTop + rect.top, duration })
- 锚点定位优先用 class 选择器而非 ref——原代码只有 ref="md0" 无 class，需补 md0 class
- 锚点 class 名与 tab 的 value 严格对应（原有 md3 对应 tab value "6"，已统一改 md6）
- 改完重新构建 dist 后在微信开发者工具逐个点击 tab 验证，H5 预览通过不算验证

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 41a4e64f 用户贴 weapp 报错 TypeError at Proxy.setTab；修复改用 uni.createSelectorQuery + uni.pageScrollTo，补 md0 class，md3 改 md6
- 涉及文件：src/pages_transaction/newHouse/detail.vue
- 所属项目：苏住房C；来源会话ID：41a4e64f-0b65-4969-b0c2-d0d6514d2d0c；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wx_window_scrollto",
  "source_extraction_id": "822c31f3d8f34cd88bf5d0b804a2c0f8",
  "version": 1,
  "memory_type": "entities"
}
-->