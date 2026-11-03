# 租赁合同详情两栏区块换序规范
公共收益租赁合同备案详情页调换两栏区块时，编辑态与查看态须同步换序，子表取数回传链路不得随位置变更删除。

## 问题背景
- 公共收益-租赁管理-租赁合同备案（经营资产/经营资源）要求把「出租房信息」与「公共区域场所」调换位置（出租房在上、场所在下），且编辑详情页同样调换
- 详情页两块内容有两套独立声明：编辑态靠模板组件顺序，查看态靠 contentInfo/字段构造器顺序

## 风险与根因
- 只改一处会出现「查看对了、编辑反了」的不一致
- 某块在查看态不再展示时，有人会顺手删掉其子表组件与取数，导致保存主表时清空历史子表数据

## 修法规范
- 先定位两栏渲染顺序来源（编辑态模板 + 查看态 contentInfo），两处同序调整，禁用 CSS order 视觉置换
- 子表（subVenueTable 等）取数与回传链路保留，位置变了不等于数据可删
- 查看详情的公共区域场所分别支持「新增/编辑」与「纯查看」入口，按钮显隐按 formMode 判定，不复用同一可编辑组件
- 改完按「编辑态→保存→查看态」走一遍顺序与数据是否都在

## 验证与归属
- 列表说明文字样式同期对齐（橙色警告图标+深灰正文、仅关键词标橙、内边距8px），三个租赁合同模块一起改
- 涉及文件：benefit/assetsLeaseContractFiling/detail.vue、benefit/resourcesLeaseContractFiling/detail.vue、assetLeaseApply/components/subVenueTable.vue、pubVenue/components/venueDialog.vue
- 所属项目：产品2.0；来源会话：710f2232-3ba0-4139-9d99-3fa269331edd；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_detail_block_swap",
  "source_extraction_id": "741d126eb5854e64aed1e6056f86c066",
  "version": 1,
  "memory_type": "entities"
}
-->