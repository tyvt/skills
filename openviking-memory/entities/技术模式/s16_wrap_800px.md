# 800px版心宽表未限宽致穿屏
苏州市房地产监测V3中800px版心下买受人及出卖人宽表未限宽且操作列fixed="right"致穿屏与列重叠。

## 问题现象
- 800px版心下宽表未限宽，操作列fixed="right"导致穿屏与列重叠

## 根因
- chapter1.vue中宽表未外包包裹容器且保留固定列
- 缺少横向滚动容器与列最小宽度限制

## 解决方案
- chapter1.vue外包s16-party-table-wrap并去固定列、设列min-width+show-overflow-tooltip
- sz-contract.scss定义.s16-party-table-wrap的overflow-x:auto及表min-width为1080px/960px

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/062.md
- 涉及文件：chapter1.vue、sz-contract.scss、BuyerTable.vue等
- 所属项目：苏州市房地产监测V3；来源会话：2e78864c-5df3-46ef-aa31-0ee09b53f9fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "s16_wrap_800px",
  "source_extraction_id": "2631256d0f3846be87323d35fca57b3e",
  "version": 1,
  "memory_type": "entities"
}
-->