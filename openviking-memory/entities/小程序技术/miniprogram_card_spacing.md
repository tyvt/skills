# 小程序卡片间距双失效
苏住房C 小程序多个 owner 页卡片区块上下间距为 0，根因是 flex gap 对自定义组件根节点支持不稳定，且排查时清掉了组件自带 margin，双通道同时断掉。

## 问题现象
- 企业信息页、合同页等 owner 页卡片区块上下间距为 0
- 用户连续三轮反馈「还是没有间距」「缺少 10px 间距」
- 父容器写了 flex+gap、子组件清过样式仍无视觉变化

## 根因
- 微信小程序对 flex gap 在自定义组件根节点（如 `<base-card>` 标签）支持不稳定，父容器 gap:10px 不生效
- 排查时把 base-card 自带的 margin-top 一并清掉，gap 与 margin 两条通道同时断掉
- 只补其中一条都会继续复现，是问题被反复打回的直接原因

## 解决方案
- 不依赖父级 flex/gap 给自定义组件间距
- 页面模板给每个区块外包原生 `div.page-block`，用相邻兄弟选择器 `.page-block + .page-block { margin-top: 10px }`（值用 `$uni-spacing-row-base`）
- margin 作用在原生 div 上，不经过组件边界，表现稳定
- 选 page-block 方案后不再让子组件自带 margin-top，否则双份间距；两者必须二选一并在公共卡片组件注明

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 5ebe7a6f（2026-08-28，基线 8fc3cc5）三轮反馈后定位双根因，改原生 div.page-block 方案
- 涉及文件：src/pages_owner/company/info/contracts.vue、index.vue、src/components/commonNew/baseCard.vue
- 所属项目：苏住房C；来源会话ID：5ebe7a6f-b511-41ff-8030-0bf23da25e31；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_card_spacing",
  "source_extraction_id": "5b23890cee2f479791fcd3096d3399ab",
  "version": 1,
  "memory_type": "entities"
}
-->