# userStore 统一重命名为 useUser
昆山市民项目将全局用户 store 变量 userStore 统一重命名为 useUser 命名规范。

## 变更说明
- 统一规范：`const useUser = useUserStore()`，后续统一使用 `useUser.xxx`
- 共修改 9 个文件，移除回调内重复声明、复用顶层 useUser

## 涉及文件
- api/index.js
- App.vue
- pages_home/home.vue
- pages_contract/list.vue
- pages_repair/repair/expenseList.vue
- pages_vote/vote/votedetail.vue
- pages_election/election/Participate.vue
- pages/verifyUser/info.vue
- pages_activity_vote/detail.vue

## 验证与归属
- 来源会话ID：437a9bbe-d421-4340-9d73-bb0fec2c1e0b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "user_store_rename",
  "source_extraction_id": "105ecfd0ad3a4016988d83e0d771cf2c",
  "version": 1,
  "memory_type": "entities"
}
-->