# 凸起TabBar与苏服办落款避让
首页/个人中心等 Tab 页底部固定「苏服办」落款时，须按中间凸起按钮真实占位计算 bottom，不能沿用普通 tabBar 约 120rpx。

## 问题根因
- 凸起按钮顶边约在 160rpx（底边距 30rpx + 高度 130rpx），落款 bottom 需提到约 188rpx 才能完整露在按钮上方
- 普通 tabBar 的 bottom 约 120rpx 不适用于凸起自定义 TabBar

## 解决方案
- 落款 bottom 从 120rpx 调至 188rpx
- 页面可滚动区 padding-bottom 调至约 340rpx，避免内容被落款或 tab 遮挡
- 仅加 footer 不改 bottom/内边距会导致空白多却要滚到底才见落款或被中间 tab 挡住

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/index/my.vue、src/pages/webview/home.vue、src/components/custom-tabbar/custom-tabbar.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：d3dd4f2b-151a-408d-b8b8-52be5b51c6dd；代码基线：33f7ad1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "tabbar_footer_avoidance",
  "source_extraction_id": "778f1362caf64c32a2a51ac9df1ba72f",
  "version": 1,
  "memory_type": "entities"
}
-->