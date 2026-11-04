# 双行flow-steps外框同宽
门户首页 index-new 商品房9步与另一业务6步上下两行 .flow-steps 外框宽度随步数变化不一致，需 flow-grid 列宽取 max-content 且行内 stretch。

## Description
- 现象：商品房9步与另一业务6步上下两行 .flow-steps，各行 width:max-content 时外框宽度随步数变化，下行绿框比上行灰框窄。
- 根因：两行同在 .flow-grid 第二列，若每行按自身内容收缩，列宽不会统一到较宽那一行。
- 所属项目：门户；涉及文件：zhi2-web-admin/src/views/home/index-new.vue

## Solution
- .flow-grid 第二列改为 max-content（由更宽的9步行决定列宽），整体 width:max-content 与业务中心内容对齐。
- .flow-steps 去掉 width:max-content，用 justify-self:stretch 占满该列——短行步骤仍左对齐、右侧留白，但边框与上行同宽。
- 若要在短行内均匀拉开步骤，再单独加 justify-content:space-between（需产品确认）。

## Verification
- 验证：会话 54a9fc23 用户反馈下行遮挡/两行容器宽度不一致；按 flow-grid max-content + flow-steps stretch 两行边框对齐。
- 来源会话ID：54a9fc23-a8db-44c1-8738-3c76fa2599ba；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_grid_stretch",
  "source_extraction_id": "ca27764bcf814f6b8bfa01c9f8541337",
  "version": 1,
  "memory_type": "entities"
}
-->