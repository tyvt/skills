# tabDisabled 与生命周期错位致不请求
昆山市民审批列表等页面因 tabDisabled 拦截与 useLoadMore 定义顺序错位导致切换 tab 不刷新数据，需移除拦截并前置定义。

## 问题根因
- `tabDisabled` 在请求中返回使切换 tab 不调 `refresh()`。
- `useLoadMore(getList)` 先于 `getList` 定义，进入页仅依赖 `onShow`。

## 解决方案
- 移除 `tabDisabled` 拦截，前置 `getList` 定义。
- 于 `onLoad` 调 `refresh()`，并在 `getList` 记录请求 `tab` 防数据覆盖。
- 清空搜索框后自动重新搜索。

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：d:/repository/昆山市民/src/pages_examine/examineList.vue、src/hooks/useLoadMore.js、src/pages_contract/list.vue、src/pages_benefit/benefit/index.vue、src/pages_activity_vote/my-activities.vue、src/api/modules/examine.js、src/pages.json、src/pages_examine/components/operationBtn.vue
- 来源会话ID：5d15f726-65f1-4f6a-b8a9-728d78cb3933
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "tab_disabled_bug",
  "source_extraction_id": "c3b6be7beffe427a8a4251db85b7ca61",
  "version": 2,
  "memory_type": "entities"
}
-->