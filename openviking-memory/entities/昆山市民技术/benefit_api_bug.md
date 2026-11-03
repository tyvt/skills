# 进入页面与切换小区无接口调用缺陷
昆山市民小程序“受益页/切换小区”进入页面及切换小区均无接口请求，根因为多类设计缺陷叠加。

## 问题根因
- 进入页面及切换小区均无接口请求，非单一 bug
- 开发过程逐步叠加多类设计缺陷，需梳理各生命周期与状态监听逻辑

## 涉及文件
- src/pages_benefit/benefit/index.vue
- src/api/modules/myhouse.js
- src/hooks/useLoadMore.js
- src/api/modules/common.js
- src/request/index.js
- src/stores/user.js
- src/env/mp.js
- src/pages_contract/list.vue

## 验证与归属
- 来源会话ID：2c38c33c-ca79-4a52-aad9-5b1eb44802bd
- 代码基线：none
- 验证证据：cursor session 提取

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "benefit_api_bug",
  "source_extraction_id": "ab8c60a92ea7445d845556d78d295742",
  "version": 1,
  "memory_type": "entities"
}
-->