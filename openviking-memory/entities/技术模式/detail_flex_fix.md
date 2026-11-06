# 项目备案详情纵向布局全局修复
苏州市房地产监测V3 修复项目备案详情因 flex 撑满导致 Tab 被顶到下方的全局样式问题。

## 问题根因
- customerProject/detail.vue 中「基本信息」和 zs-tabs 是 detail-container 下并列子节点
- .detail-from-container 写 flex:1 撑满剩余高度，导致下方 Tab 被顶到很靠下，中间大片空白
- 之前改的 Tab 卡内 padding/gap 碰不到此 DOM，看似无变化

## 全局修复
- index.scss 中当 detail-container 直接包含 zs-tabs 时：detail-from-container → flex:0 0 auto（高度随内容）
- zs-tabs → flex:1，表格在 tabs-content 里滚动
- 需硬刷新（Ctrl+F5）后再打开「项目信息备案详情」

## 涉及文件
- zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue
- zhi2-web-admin/src/styles/index.scss

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：9e24bb6d-a477-4e3c-8373-f4b406541525
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_flex_fix",
  "source_extraction_id": "d2241605997b4738a763da461ea5ccb9",
  "version": 2,
  "memory_type": "entities"
}
-->