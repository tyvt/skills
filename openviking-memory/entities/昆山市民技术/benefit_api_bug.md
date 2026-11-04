# 公共收益页面接口调用缺陷
昆山市民小程序公共收益页面（benefit）从开发至今逐步叠加多类接口调用设计缺陷，导致列表数据无法正常加载。

## 问题时间线
- 2024-09-07 提交 dc138d6 公共收益页面开发：列表接口 getList 为空壳，Promise 不 resolve；list 用 8 条假数据占位
- 2024-09-18 提交 a14d084 公共收益对接：接入 getPubQuarterlyDeclaration，但 onShow 从未调用 refresh()
- 2024-09-24 提交 2a6ba01 bug修复：补上 projectId: useUser.project（此前请求缺关键参数）
- 2024-09 至 2026-06 中间多次小改：一直靠交叉观察器被动加载，未在 projectId 就绪后主动拉列表
- 2026-06-26 上午 提交 6418fe7 bug1250：加 syncProjectInfoFromHouseList + refresh()，试图修「C 端无法展示」

## 问题根因
- 进入页面及切换小区均无接口请求，非单一 bug 而是多类设计缺陷叠加
- 开发过程逐步叠加缺陷，需梳理各生命周期与状态监听逻辑

## 涉及文件
- src/pages_benefit/benefit/index.vue
- src/api/modules/myhouse.js
- src/hooks/useLoadMore.js
- src/api/modules/common.js
- src/request/index.js
- src/stores（含 user 相关）
- src/env/mp.js（既有记录）
- src/pages_contract/list.vue（既有记录）

## 验证与归属
- 来源会话ID：2c38c33c-ca79-4a52-aad9-5b1eb44802bd
- 代码基线：none
- 验证证据：cursor session 提取（extracted source=cursor project=昆山市民）


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "benefit_api_bug",
  "source_extraction_id": "cd2cbfa87b0543bc8dc543511d49c208",
  "version": 2,
  "memory_type": "entities"
}
-->