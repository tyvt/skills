# 800px版心宽表未限宽致穿屏
苏州市房地产监测V3中800px版心下买受人及出卖人宽表未限宽且操作列fixed="right"致穿屏与列重叠。

## 问题现象
- 800px版心下宽表未限宽，操作列fixed="right"导致穿屏与列重叠

## 根因
- chapter1.vue中宽表未外包包裹容器且保留固定列
- 缺少横向滚动容器与列最小宽度限制

## 解决方案
- chapter1.vue外包s16-party-table-wrap，设列min-width+show-overflow-tooltip且操作列fixed="right"设nowrap（113.md）；早期方案曾去固定列（062.md）
- sz-contract.scss定义.s16-party-table-wrap的overflow-x:auto及表min-width为1080px/960px

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/062.md；src=苏州市房地产监测V3/113.md
- 涉及文件：chapter1.vue、sz-contract.scss、BuyerTable.vue、chapter2.vue、SzContent.vue、validation.js、presale/template/detail.vue、路由信息.json、package.json等
- 所属项目：苏州市房地产监测V3；来源会话：2e78864c-5df3-46ef-aa31-0ee09b53f9fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "s16_wrap_800px",
  "source_extraction_id": "1fb73d685c824df4a1f924aabfc03c6d",
  "version": 2,
  "memory_type": "entities"
}
-->