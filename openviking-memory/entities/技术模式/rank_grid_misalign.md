# 排名列表表头与数据行列宽不一致
园区物管2.0 大屏自定义排名块中，表头与数据行各自 display:grid 且含 auto 列会导致列宽不一致、左缘对不齐。

## 问题描述
- 表头 .xxx__head 与每行 .xxx__row 各自 display:grid，若第三列用 auto，每行按本行内容算宽
- 表头「余额（元）」与下方数字左缘会对不齐

## 解决方案
- 公共父级（如 .balance-rank）定义 CSS 变量统一列模板，如 --balance-rank-grid-cols: 28px minmax(48px, 1fr) 72px
- 表头与数据行 grid-template-columns 均引用该变量
- 金额列用固定宽度（如 72px）并 text-align:left，超长金额再调大固定宽

## 验证与归属
- 验证：会话 2aa6472f，mapOverview/index.vue 物业管理区域账户余额排名表头与数据左对齐问题
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：2aa6472f-742a-4bc7-bb9f-76eedbe8d7a9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rank_grid_misalign",
  "source_extraction_id": "a317e0c50cd34d9a9b397b0502a6a1b0",
  "version": 1,
  "memory_type": "entities"
}
-->