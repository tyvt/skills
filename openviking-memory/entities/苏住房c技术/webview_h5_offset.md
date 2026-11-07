# 无导航栏且偏移40px的Web-view H5导致内容漏出
当 SuzhaoFang H5 被嵌入第三方小程序的 web-view 中时，若无 `.uni-page-head`，原始的 `top:40px` 偏移会在 sticky tab 处留下缝隙。

## 问题
- 宿主提供导航栏，H5 没有 `.uni-page-head`；原始的 `top:40px` 导致内容在 sticky tab 后方漏出。
- 影响交易详情/newHouse 等页面。

## 解决方案
- 在 `utils/index.js` 中添加了 `isMiniProgramWebView()` 和 `getPageHeaderOffset()`，强制 `top:0`。
- `detail.vue` 默认使用 `top:0` 并动态校准 sticky/anchor。
- 调整的组件：ZsNav.vue, tabLine.vue, tabBtn.vue, uni.scss, pages.json, dishonestyCredit/index.vue, property-detail.vue。

## 验证
- 验证证据: src=苏住房C/030.md; 会话 7e811367-b5c4-4dfb-83e7-e8f29ef7909c; base none.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：7e811367-b5c4-4dfb-83e7-e8f29ef7909c


<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "webview_h5_offset",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->
