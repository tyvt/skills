# 列表搜索条件逐页过滤
苏州市房地产监测V3 中所有列表搜索条件的企业 / 机构名称筛选已改为逐页自行处理，公共组件恢复原样。

## 回退内容
- `src/components/zs-search-form/zs-search-form.vue` 已 `git checkout` 还原
- `src/utils/searchFormVisibility.js` 已删除

## 现行方式
- 每个列表页在自己的 `formItems` 计算属性里过滤，不改组件、不留共享黑盒
- B 端角色（`terminalType === 'B'`）不展示企业 / 机构主体筛选条件

## 改动范围与归属
- 共 60 个列表页按业务模块改动（benefit 2 页、building 3 页等）
- 涉及文件：`src/components/zs-search-form/zs-search-form.vue`、`src/utils/searchFormVisibility.js`、`src/utils/terminalUser.js`、`src/views`
- 来源会话：6f79068a-cd61-40ba-8614-03f0626172ad；所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_search_perpage_filter",
  "source_extraction_id": "c9b7683152ec4919bda99ba8cded66d5",
  "version": 1,
  "memory_type": "entities"
}
-->