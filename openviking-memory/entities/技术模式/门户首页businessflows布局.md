
# 门户首页 businessFlows 布局
门户登录后首页采用 businessFlows 统一驱动侧栏与 admin 布局，authorizedSectionCodes 由本地码表加权限计算，皮肤判定改由 roleKey 驱动。

## 板块授权与合并
- homeDataMixin.fetchFunctions 用 ADMIN_SECTION_CODES 配合 hasBizSectionPerm 得到 authorizedSectionCodes，不再依赖接口 businessCenters 是否返回某板块
- 双板块（如商品房 commodityHouseTrade + 存量房 secondHandHouseTrade）只要权限同时具备即可进入后续合并逻辑，相对旧逻辑不再因接口缺字段而丢板块
- mergeBusinessFlows 按固定顺序 commodityHouseTrade → secondHandHouseTrade → housingRental 过滤合并，非超管仅保留 permittedCodes 中的板块
- HomeLayoutSidebar 与 HomeLayoutAdmin 共用：primaryFlows = businessFlows.slice(0,1)、secondaryFlows = businessFlows.slice(1)，:key 用 flow.functionCode
- 统一 businessFlows 后移除 BROKER_SECTION_CODES / 仅商品房 developerCommodityFlow 分叉，同一套权限列表驱动两套布局
- 验证：会话 034544ce 审查结论数据链路与布局一致；示例 authorizedSectionCodes = ['commodityHouseTrade','secondHandHouseTrade'] → businessFlows 长度 2 → 首行商品房、次行存量房

## 皮肤判定规则
- resolveHomeLayoutVariant 重构后删除「仅有 secondHandHouseTrade / housingRental 板块权限 → layoutVariant broker」「仅商品房 → developer」的 bizSectionCodes fallback
- broker/developer 统计区与皮肤（如 HomeStatsBar vs HomeDeveloperStatsRow）现主要由 roleKey 决定
- 若产品仍要求「无经纪 roleKey 但有二手/租赁板块即经纪皮肤」，需在 roleKey 判断后显式补回 fallback 并单测边界
- 验证（HIGH）：B 端用户仅有存量房/租赁板块、无 jjjg/zljg roleKey 时，旧逻辑为 broker 皮肤，新逻辑会落到默认 developer

## 统计加载时序
- homeDataMixin 对 layoutVariant 的 watch 去掉 immediate，仅在 permsLoaded 为 true 时调用 fetchStats
- 首次统计在 fetchFunctions 末尾显式触发，避免 authorizedSectionCodes / variant 未就绪时用错误 layoutVariant 拉首页统计数据
- 验证（MEDIUM 合理修正）：与权限加载时序强相关，后续若 variant 在 perms 之后仍会变化需保证 watch 仍能覆盖

## 风险与归属
- 代码审查结论标 HIGH：皮肤判定回归风险，BLOCK 待与产品对齐
- 涉及文件：homeDataMixin.js、homeLayout.js、HomeLayoutSidebar.vue、HomeLayoutAdmin.vue、index-new.vue
- 所属项目：门户；代码基线：fd73e47；来源会话：034544ce-33ea-4a3e-a159-062dba42270d


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "门户首页businessFlows布局",
  "source_extraction_id": "b6ce245b80864198a1880380ffa97682",
  "version": 2,
  "memory_type": "entities"
}
-->