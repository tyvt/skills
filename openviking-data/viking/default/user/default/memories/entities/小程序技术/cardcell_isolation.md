# 分包页CardCell标签因样式隔离不渲染须改页面内DOM
苏住房C pages_vote/decision/detail.vue等页因CardCell在分包样式隔离下标签不可见，只剩值与大段空白，须去掉CardCell改页面内DOM并styleIsolation:shared。

## 问题现象
- 决策详情页编号/业务类型/决策主题等标签全不见，只剩裸文字与大片空白
- 同一模板复用到DecisionRecord.vue后微信小程序整块「决策信息」全白不渲染
- 用户两次反馈UI差异巨大

## 根因
- CardCell组件在pages_vote分包处于样式隔离状态（页面与组件styleIsolation不一致）
- 组件内部标签行、分割线、左右对齐样式不生效，标签压成不可见
- 极端时整个组件块不渲染，非数据结构问题

## 解决方案
- 先排除数据因素：接口有数据但标签不显示时优先怀疑组件样式隔离
- 决策/选举详情页去掉CardCell，页面内直接写与生产版相同DOM，样式写当前页并让styleIsolation:shared生效
- 头部渐变信息区与字段区合并成同一张卡片
- 回退时优先回到已验证cell-item结构局部修，不要顺手换另一组件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话f7c75f86用户报decision/detail UI有问题且差异巨大；结论分包+组件样式隔离，去CardCell+页面内DOM
- 涉及文件：src/pages_vote/decision/detail.vue、src/pages_vote/decision/components/DetailTopCard.vue、src/styles/cell.scss
- 所属项目：苏住房C；来源会话ID：f7c75f86-93d3-413f-b2a8-5162c9c21849；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "cardcell_isolation",
  "source_extraction_id": "0bc9c97c36d946eeb27dc957b0e08455",
  "version": 1,
  "memory_type": "entities"
}
-->