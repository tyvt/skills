# 因 goBack 覆盖 query 导致返回空白
淮安物管 项目的登记详情页(备案)打开时为空白，因为返回丢失了 query 参数。

## 问题根因
- `committeeTable.vue` 传递的 `backUrl` 仅包含 path，没有 `formMode=view`。
- `main.js` 中的 `goBack()` 覆盖了 `query`，阻碍了详情页的 `init()`。

## 修复
- `goBack()` 改为直接调用 `router.push(backUrl)`，保留完整的 query。
- `backUrl` 改为携带必要的参数（如 `formMode=view`）。

## 涉及文件
- `publicQuery/complex/detail.vue`
- `publicQuery/complex/components/committeeTable.vue`
- `main.js`, `mixins/detailMixins.js`, `mixins/form.js`
- `store/modules/tagsView.js`, `layout/components/AppMain.vue`
- `publicQuery/complex/components/managementOrgPanel.vue`

## 验证
- cursor 会话: e6ed7dbc-1d6e-459f-aec6-1548de9852da
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "goback_query_blank",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->