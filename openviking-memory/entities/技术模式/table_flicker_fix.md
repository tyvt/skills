# 表格加载后统计卡片闪烁修复
园区物管2.0 中表格加载完成后统计卡片因宽度变化触发过渡动画而闪烁，已限制过渡属性并固定表格高度。

## 问题根因
- 表格加载后总高度增加，滚动条出现，.app-main 可用宽度缩小约 15px
- 统计卡片用 width:20%，宽度随容器变化
- 卡片 transition:all 0.3s 使宽度变化也触发 300ms 动画，多卡片同时变化看起来像闪烁

## 修复要点
- 将 transition:all 0.3s 改为 transition:transform 0.3s, box-shadow 0.3s，只保留 hover 位移和阴影
- 给 zs-table 增加 :tableTr="queryParams.pageSize" 加载前预留 10 行高度，减少高度突变
- 备选方案：全局布局加 scrollbar-gutter:stable 进一步消除抖动

## 验证与归属
- 来源会话：2fc8efe8-20f3-454c-8e49-fdfcaf343a87
- 涉及文件：benefit/alert/index.vue、mixins/listMixins.js、components/zs-table/zs-table.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_flicker_fix",
  "source_extraction_id": "600bbd713be74331893f24e8b2d0a727",
  "version": 1,
  "memory_type": "entities"
}
-->