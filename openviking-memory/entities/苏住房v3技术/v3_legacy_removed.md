# V3 建湖G迁移遗留组件移除
苏州市房地产监测V3 从建湖G迁移时带入的旧方案组件/指令已按 V3 惯例替换并删除。

## 遗留物与替代
- `OperationContainer`：建湖里详情顶栏返回/保存/提交/审批/更多按钮组，V3 用 `operation-btn-group`（已无引用）
- `SearchContainer`：建湖里列表折叠筛选+内联搜索区，V3 用 `zs-search-form` + `ListTemplate`（`formItems`/`columns`）
- `v-waiting` 指令：建湖里全局劫持 XHR 盖 Loading，V3 用 `v-loading="loading"` + `listMixins` 的 `loading`；`v-waiting` 改全局 XHR 与 Vite/axios 栈叠加维护成本高，已删

## 涉及文件与归属
- 文件：`src/components/OperationContainer/index.vue`、`src/components/SearchContainer/index.vue`、`src/directives/waiting/index.js`、`directives/index.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：005ca51a-2e96-4282-b80d-8c9843005a56；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_legacy_removed",
  "source_extraction_id": "b92f718b8a55409ca3d47ef5e5f4ce65",
  "version": 1,
  "memory_type": "entities"
}
-->