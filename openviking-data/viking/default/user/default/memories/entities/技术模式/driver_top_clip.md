
# driver.js 引导聚焦贴顶元素被裁切
园区物管2.0 用 driver.js 做新手引导时，聚焦贴顶元素（如顶部导航栏「切换项目」按钮）聚焦框上边框被屏幕裁掉。

## 问题根因
- driver.js 默认给聚焦区域加 10px padding，聚焦框比元素大一圈，贴顶元素的高亮框顶部≈元素顶部−10px，落到视口外。
- border 是向外画的，贴顶时上边框同样在视口外，怎么改 border 都显示不全。

## 解决方案
- 设 padding: 0 让聚焦框与元素等大，不再向外溢出。
- 高亮标识不用 border，改用内描边 box-shadow: inset ...，边框画在框内，贴顶/贴边时四边都能完整显示。
- driver.js 的引导标记存在 localStorage（如 driverProjectSwitch），改完引导配置后要 localStorage.removeItem(key) 清除旧标记才能重新验证。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话最终结论确认 padding:0 + 红色标识改 box-shadow: inset 内描边，并提示 localStorage.removeItem('driverProjectSwitch') 清除引导标记后重验。
- 验证证据：src=园区物管2.0/028.md；来源会话 b97cc65a-b35d-4756-a207-7c59f24b16eb。
- 涉及文件：zhi2-web-admin/src/utils/driver.js、zhi2-web-admin/src/views/home/bProjectDialog.vue、zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/node_modules/driver.js/dist/driver.min.css、zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/package.json、zhi2-web-admin/src/App.vue、zhi2-web-admin/src/main.js。
- 所属项目：园区物管2.0；代码基线 none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "driver_top_clip",
  "source_extraction_id": "f6d026a215774330a843fb24cdf97798",
  "version": 2,
  "memory_type": "entities"
}
-->