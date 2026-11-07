# 门户首页底栏待办与公告左右底对齐
UnifiedLogin/首页底部双栏要对齐左右卡片下沿、又不撑高整页时：外层行用 align-items: stretch，行高取左右内容较大值。

## 布局规则
- 外层行 align-items: stretch，行高取左右内容较大值，不用 min-height:100vh 撑满视口
- 左侧业务区固定高度，待办区 flex:1 向下拉长且表格 fill-height
- 右侧用户卡与常用功能保持 height:auto，公告区 flex:1 占剩余高度并在卡片内滚动
- 避免常用功能块过高把公告挤出视口

## 验证与归属
- 验证证据：底部双栏 align-items: stretch；待办 flex:1、公告 flex:1；常用功能 height:auto；修复「高度太高把公告挤下去」「右边下边框看不见」等反馈
- 涉及文件：zhi2-web-admin/src/utils/portalLayout.js、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/config/homeLayout.js
- 所属项目：门户；来源会话 ID：b723bff2-01cd-4334-975a-a2a40778f1a2；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_footer_alignment",
  "source_extraction_id": "e88d7ad093b243e2bf01f883f5d8b250",
  "version": 1,
  "memory_type": "entities"
}
-->