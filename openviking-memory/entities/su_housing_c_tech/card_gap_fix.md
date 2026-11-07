# 卡片上下间距失效修复
苏住房C小程序卡片因样式作用域及布局问题导致上下间距失效，已通过多种方式修复。

## 问题根因与修复方案1（page-block包裹）
- 微信小程序中 `flex gap` 对组件子元素支持不稳定
- 此前清掉了 `base-card` 自带的 `margin-top`，导致卡片上下间距完全失效
- 修复：每个区块外包一层原生 `div.page-block`，用 `.page-block + .page-block { margin-top: 10px }` 控制间距（`$uni-spacing-row-base`），不依赖组件根节点flex/gap
- 涉及文件：`pages_owner/company/info/contracts.vue`、`pages_owner/company/info`、`components/commonNew/baseCard.vue`、`pages_owner/house/components/CellCard.vue`
- 来源会话ID：5ebe7a6f-b511-41ff-8030-0bf23da25e31

## 问题根因与修复方案2（flex gap on .project-page）
- 之前给 `base-card` 加了 `module-gap`（`margin-top: 10px`），但在 uni-app 里，父组件的 scoped 样式往往无法作用到自定义组件根节点，所以间距实际没生效，两块白卡片会贴在一起
- 修复：在 `.project-page` 上用 flex 布局 + `gap: 20rpx` 控制子模块间距（与社区/街道信息页一致），并去掉无效的 `module-gap` 类。若仍觉得间距不够，可以把 `gap` 调到 `24rpx` 或 `32rpx`
- 涉及文件：`pages_owner/project/info/index.vue`、`components/commonNew/baseCard.vue`、`pages_owner/community/info/index.vue`
- 来源会话ID：80f4d555-4b91-4605-a249-4affc7710dfd

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译预览后，顶部小区信息卡片和「小区周边」之间应能看到灰色背景分隔；所有卡片间距应正常
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "card_gap_fix",
  "source_extraction_id": "89e86137a57a4163a4616007107418e7",
  "version": 2,
  "memory_type": "entities"
}
-->