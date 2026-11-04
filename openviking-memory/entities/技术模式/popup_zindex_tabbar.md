# 底部日期弹窗被tabbar遮挡修复
泰兴小程序底部自定义日期弹窗因 uni-popup 无 z-index 属性致层级失效，被自定义 tabbar 遮挡，已修复并出包。
## 问题根因
- uni-ui 的 `uni-popup` 无 z-index 属性，内部 `.uni-popup` 写死 `position:fixed; z-index:99`。
- `ZsBottomPopup` 通过 `:style="{ zIndex: 10001 }"` 传的层级落在自定义组件节点上，非定位元素致 z-index 不生效。
- 自定义 tabbar `z-index:999` > 99，压在弹窗上遮挡 footer。
- `src/pages/index/newHome.vue` 曾有页面级 z-index 覆盖，但仅对首页生效，统计概览页吃不到。
## 解决方案
- `src/App.vue` 的 `<style>` 末尾新增 `.uni-popup{z-index:10000!important}` 全局覆盖。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/App.vue、src/pages/index/newHome.vue
- 来源会话ID：6884f3c7-6d34-4ece-b13b-5f42ff2422e1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_zindex_tabbar",
  "source_extraction_id": "631ebc59479242c29a9efec9b009a2b7",
  "version": 1,
  "memory_type": "entities"
}
-->