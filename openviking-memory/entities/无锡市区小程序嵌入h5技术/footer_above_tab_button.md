# 落款bottom须高于中间凸起按钮避免遮挡
无锡市区小程序嵌入 H5 中间凸起按钮顶部位于 160rpx，落款 bottom 须大于该值并调整页面底部内边距避免遮挡。

## 布局约束
- 中间凸起按钮顶部位于 160rpx（30rpx 底边距 + 130rpx 高度）
- 落款原 bottom:120rpx 被遮挡，调整为 188rpx 移至按钮上方
- 页面底部内边距同步改为 340rpx 避免内容遮挡
- 普通 tabBar 的 bottom 约 120rpx 不适用于凸起自定义 TabBar，须按真实占位计算
- 仅加 footer 不改 bottom/内边距会导致空白多却要滚到底才见落款或被中间 tab 挡住

## 验证与归属
- 验证证据：src=无锡市区小程序嵌入H5/010.md
- 涉及文件：src/pages/webview/home.vue、src/pages/index/my.vue、src/components/custom-tabbar/custom-tabbar.vue、src/pages.json、src/pages/webview/externalWebview.vue、src/components/sufuban-footer/sufuban-footer.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：d3dd4f2b-151a-408d-b8b8-52be5b51c6dd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "footer_above_tab_button",
  "source_extraction_id": "40cd8393981e48869460b2232fae40f9",
  "version": 2,
  "memory_type": "entities"
}
-->