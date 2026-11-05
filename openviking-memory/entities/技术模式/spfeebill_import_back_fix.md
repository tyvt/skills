# spfeebill_import_back_fix
产品2.0 修复账单导入页点击「返回」后提示「页面未授权或不存在」的问题。

## 原因
- `OperationBtnGroup` 默认返回逻辑去掉路径最后一段（如 `/bill/propertyFeeBill/import/add` → `/bill/propertyFeeBill/import`），中间 `/import` 无路由跳 404 触发提示。

## 修改
- `import.vue`：关闭内置返回按钮，使用自定义「返回」调用页面 `goBack`；新增 `navigateBack()` 优先用 `backUrl` 否则回退列表页（去 `/import/add` 后缀）。
- `index.vue`：跳转导入页传入 `backUrl: this.$route.path` 确保回到列表页。
- 参考 `bill/components/import.vue` 做法。

## 涉及文件与归属
- 文件：`spFeeBill/components/import.vue`、`bill/components/import.vue`、`spFeeBill/components/index.vue`
- 所属项目：产品2.0；来源会话：7e35018a-3038-4ded-afb4-236a2607fad5；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "spfeebill_import_back_fix",
  "source_extraction_id": "0c68f37893bd423c9f021395ed8710bb",
  "version": 1,
  "memory_type": "entities"
}
-->