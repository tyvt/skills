# Summary
修复行业资讯页两处UI问题：1) Tab 竖排因 ul/li 在微信小程序中 flex 布局失效，改为 scroll-view+view 横向 tab 并修正切换逻辑避免清空选中态；2) 列表项点击无法进详情因自定义组件 base-card 用 @click，改为外层 view 包裹加 @tap 触发 goDetail，内部 div 改 view。修改 pages_main/news/index.vue 与 components/article/ListIndex.vue。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】上面tabUI问题，咨询点不进详情页面
【内容】已修复两个问题： ## 问题原因 1. **Tab 竖排显示**：行业资讯页用了 `ul/li` 做横向滚动 tab。微信小程序对这类 HTML 标签支持不好，flex 布局失效，文字被挤成竖排。 2. **点不进详情**：`ListIndex` 在自定义组件 `base-card` 上绑了 `@click`，小程序里自定义组件的点击事件需要用 `@tap`，且最好包在原生 `view` 上。 ## 修复内容 **`pages_main/news/index.vue`** - 将 `ul/li` 改为 `scroll-view` + `view` 横向 tab - 修正 tab 切换逻辑，避免重复点击把选中状态清掉 **`components/article/ListIndex.vue`** - 外层增加 `view` 包裹，使用 `@tap="goDetail"` 触发跳转 - 将内部 `div` 改为 `view`，更符合小程序规范 重新编译预览后，tab 应正常横向显示，点击资讯列表项可进入详情页。若还有问题请告诉我。
【验证证据】extracted source=cursor project=苏住房C
【涉及文件】**`pages_main/news/index.vue ; **`components/article/ListIndex.vue ; 涉及文件：d:\repository\苏住房C、d:\repository\苏住房C\zhi2-mobile-shimin\src、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_main\news\index.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\components\article\ListIndex.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages.js
【所属项目】苏住房C
【来源会话ID】81595210-d77b-4b6b-b35b-a2d8a5bf4a14
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "资讯页Tab显示与跳转修复",
  "goal": "修复资讯页UI问题",
  "summary": "修复行业资讯页两处UI问题：1) Tab 竖排因 ul/li 在微信小程序中 flex 布局失效，改为 scroll-view+view 横向 tab 并修正切换逻辑避免清空选中态；2) 列表项点击无法进详情因自定义组件 base-card 用 @click，改为外层 view 包裹加 @tap 触发 goDetail，内部 div 改 view。修改 pages_main/news/index.vue 与 components/article/ListIndex.vue。",
  "ranges": "4-11",
  "source_extraction_id": "48d63c6a8bb94514b38fe28ea79f8467",
  "version": 1,
  "memory_type": "events"
}
-->