# 切换标签时因 InnerLink 销毁导致的 iframe 重新加载
避免切换标签页时重新加载的持久化 iframe 视图池方案。

## 问题根因
- `AppMain.vue` 使用 `<router-view :key="$route.fullPath">` 且项目没有 keep-alive。
- 切换标签会销毁 `InnerLink` 组件，移除 DOM 中的 iframe 并导致重新加载。

## 解决方案
- 创建 `src/utils/innerLink.js` 和 `src/layout/components/iframeToggle/index.vue` 用于已打开标签页的 iframes 池的持久化渲染。

## 验证与文件
- 验证: src=无锡市区G/001.md
- 涉及文件: AppMain.vue, InnerLink/index.vue, utils/innerLink.js, store/tagsView.js, store/permission.js, TagsView/index.vue
- 会话: 2a5bfa8e-2977-4228-8985-a83a230944d2; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_switch_iframe",
  "source_extraction_id": "dddbe66f1d9f49389bae575d92bc71c9",
  "version": 1,
  "memory_type": "entities"
}
-->