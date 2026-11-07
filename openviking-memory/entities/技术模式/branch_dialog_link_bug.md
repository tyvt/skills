# 银行网点弹窗列未配链接且缺编码无法选
苏州市房地产监测V3的银行网点弹窗中，BranchOneDialog.vue 与 YhwdDialog.vue 列配置使用 :index 而非 type="link"，且 onOpen 未先设 defalutStr 导致无法选择。

## 问题根因
- BranchOneDialog.vue 与 YhwdDialog.vue 列配置使用 `:index` 而非 `type="link"`
- onOpen 未先设置 `defalutStr` 导致无法选择

## 解决方案
- 列改为 `type="link"` 并绑定 `:function` 回调
- onOpen 先设 `defalutStr` 再调用 `getList`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：YhwdDialog.vue、BranchOneDialog.vue、YhwdTable.vue、detail.vue、package.json、pubRegulatoryBranchDialog.vue、src/styles/index.scss、SelectDialog.vue
- 来源会话ID：a2fde687-3089-488b-83f1-704448411d98；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_dialog_link_bug",
  "source_extraction_id": "99fa5352d8a04f5193fd2ce21a6dfcb0",
  "version": 1,
  "memory_type": "entities"
}
-->