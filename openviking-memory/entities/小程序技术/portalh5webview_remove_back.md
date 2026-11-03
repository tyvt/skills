# portalH5Webview 移除自定义返回改默认导航栏返回
portalH5Webview.vue 移除自定义 cover-view 返回栏，仅保留 web-view 承载 H5，返回依赖导航栏默认返回。

## 修改要点
- 移除 handleBack 及 ph5-back-bar 样式
- 返回依赖 pages.json 配置的默认导航栏返回（navigationStyle:"default"）
- 错误场景（路径缺失/未登录）的 uni.navigateBack() 自动退回保留

## 验证与归属
- 验证证据：013.md 会话 b3ee5856：portalH5Webview.vue 移除返回按钮
- 涉及文件：pages/webview/portalH5Webview.vue、pages.json
- 来源会话ID：b3ee5856-bbc9-4538-b25b-812549f6c1fd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portalh5webview_remove_back",
  "source_extraction_id": "29f1cf776e8946a0b898be26f32b1089",
  "version": 1,
  "memory_type": "entities"
}
-->