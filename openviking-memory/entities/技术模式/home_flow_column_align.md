# 首页列缝对齐与流程区宽度
门户首页 index-new 业务中心流程区列缝错位、两行流程区宽度不一致的 pattern 与修复要点。

## 问题现象
- 业务中心流程区原 overflow:visible，步骤条画进与右栏之间的 column-gap，上下列缝错位
- 业务中心两行 flow-steps 宽度不一致，边框右缘不对齐

## 修复要点
- home-main 限制卡片不超出网格列，表头改 width:100%（去掉 calc(100%+2px) 溢出）
- 业务中心 card-body、flow-steps 用 overflow:hidden；统计行 width:100% 与网格总宽一致
- flow-grid 第二列改 minmax(0,1fr)，两行 flow-steps 均 width:100% 共用同列宽
- 左栏业务中心、待办均 width:100% 铺满第一列，右栏固定 359px（dw），常用功能与公示公告共用第二列

## 涉及文件
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts

## 验证与归属
- 验证证据：cursor 会话提取，建议强刷后核对竖缝对齐
- 所属项目：门户；来源会话：bfe00b75-42a6-4d80-bfb4-a79e98b5a2fe

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_flow_column_align",
  "source_extraction_id": "852f63b02f764f4283bf1f49d7c63473",
  "version": 1,
  "memory_type": "entities"
}
-->