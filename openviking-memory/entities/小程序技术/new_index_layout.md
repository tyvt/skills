# 首页新版布局像素级还原
pages/home/new/index.vue 回拉过度压缩的布局，贴近设计稿。

## 调整内容
- 拉开垂直节奏：page、home-wrapper、各模块 margin-top 增大
- 恢复卡片高度：房屋卡与公告卡加高，内容不再挤压
- 头像与标题区回到合理尺寸：用户头像、小区头像、标题与副标题放大
- 底部图标区恢复呼吸感：图标尺寸、文字与 item 间距回调

## 设计对齐
- 整体仍偏向设计稿，不会像初版过大
- 可最后一轮精调 3~5 个关键值（如「我的房屋」字号、公告卡高度、图标行上边距）

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：pages/home/new/index.vue
- 来源会话：816053e2-056a-43aa-b164-fbf6cbc32d48
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "new_index_layout",
  "source_extraction_id": "d724a33faad04a55a64d07ba768c13fb",
  "version": 1,
  "memory_type": "entities"
}
-->