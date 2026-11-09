# 多选投票页弃权判定漏空对象致空白行
OptionCardList.vue 渲染弃权逻辑未过滤后端返回的 {} 占位对象，导致空白行，需校验有效属性排除。

## 现象
- 多选投票页 OptionCardList.vue 渲染 optionGroupList[0].decisionOptionApplyList 时出现空白行。
- 后端在多选不支持弃权时返回 {} 占位对象，原逻辑 item.waiverOption != null 未过滤。

## 根因
- 弃权判定仅判断 waiverOption != null，未校验对象是否有效，追加无名称对象致渲染空白行。

## 解决方案
- 判定条件需校验 waiverOption 有效属性（如 decisionOptionId 非空）以排除占位对象。
- 涉及文件：OptionCardList.vue、src/utils/decisionWaiver.js、ViewOptionsList.vue、multipleForm.vue、VotingItemsTable.vue 等（惠山二期G/H5）。

## 关联信息
- 来源会话：3e4aa866-9bc4-486d-aa6e-c08731cd5ef3；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "option_waiver_blank",
  "source_extraction_id": "e715db2dfbbd45d092aba2acf15396d8",
  "version": 2,
  "memory_type": "entities"
}
-->