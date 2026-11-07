# 门户首页业务图标网格滚动条压图标区
门户首页 HomeBizSection 中 .biz-icon-grid 因 flex:0 0 auto 致滚动区仅包一行，滚动条横穿图标区，需外层占位并改 flex:1。

## 问题根因
- HomeBizSection.vue 的 .biz-icon-grid 设为 flex: 0 0 auto，滚动区高度仅包一行，滚动条横穿图标区。

## 解决方案
- 增加外层 .biz-icon-scroll 占满剩余高度。
- 在 stretch 下将 .biz-icon-grid 改为 flex: 1 与 align-items: flex-start，使滚动条落于容器下缘。

## 验证与归属
- 验证证据：extracted source=cursor session=2d651d9b-7aa5-484c-af65-b858e1245953
- 涉及文件：d:/repository/门户/zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue、d:/repository/门户/zhi2-web-admin/src/views/home/components/HomeBizSection.vue、d:/repository/门户/zhi2-web-admin/src/views/home/index-new.vue、d:/repository/门户/zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue、d:/repository/门户/zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- 来源会话ID：2d651d9b-7aa5-484c-af65-b858e1245953
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_icon_scroll",
  "source_extraction_id": "fde92cacf95b4af48de52d9870700328",
  "version": 1,
  "memory_type": "entities"
}
-->