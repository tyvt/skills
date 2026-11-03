# 多租赁合同忽略预警勾选规则收口mixin
苏住房G四份租赁合同列表的「忽略预警」勾选规则漂移，抽成leaseContractWarningMixin统一封装。

## 问题根因
- 各列表选择列按状态写死可选性（仅待提交/审核中可选），已备案橙色预警合同被禁选
- 「忽略预警」收集行选择，未勾到预警行便提示「请选择合同」
- 各页selectable与handleIgnoreWarning规则文案逐渐漂移，改一处漏三处

## 解决方案
- 新建mixins/leaseContractWarningMixin.js封装isWarningContract、isLeaseWarningSelectable、setWarningRowStyle、handleIgnoreWarning
- 四页统一:selectable="(row) => isSelectable(row)"（箭头函数避免this丢失，本坑复发点）
- 可选条件为「预警合同或对应可操作状态」；未选中预警合同时按钮禁用；文案由mixin统一

## 验证与归属
- 验证：已备案+橙色预警可勾选执行忽略；待提交仍可勾选；已备案非预警不可勾选
- 涉及文件：mixins/leaseContractWarningMixin.js及四个列表页、mixins/table.js
- 所属项目：苏住房G；来源会话：1e8e4ca2-26cb-4b86-b061-d23f725e38ef；代码基线：320507d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_warning_mixin",
  "source_extraction_id": "6ae49cdcb1234cc49f4b259d6ba75b4b",
  "version": 1,
  "memory_type": "entities"
}
-->