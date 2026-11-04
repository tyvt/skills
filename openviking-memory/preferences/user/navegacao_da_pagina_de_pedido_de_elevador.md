- 在 pages_owner/elevator/index 中恢复系统导航栏，移除 pages.json 中的 navigationStyle: 'custom'
- index.vue 移除自定义返回按钮、goBack 函数、onBackPress 拦截以及 statusBarHeight 代码
- 搜索栏定位调整为 top: 20rpx
- 涉及文件: src/pages_owner/elevator/index.vue, src/pages.json, src/utils/system-info.js
- 源会话: 5aa3e266-85fe-4cbd-b6e7-b65da6a0763c

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 电梯请求页面导航",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "preferences"
}
-->
