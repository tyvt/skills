- 在 `src/views/company/staffManagement/personnelRecord/detail.vue` 和带有 `operation-btn-group` 的 `detail.vue` 组件中，缺少 `@save="submitForm"`，且保存操作未发送请求；已通过在该 `OperationBtnGroup` 中添加 `@save` 以及 `beforeSaveHook`/`getForm` 进行修正。
- 在 E2E 测试中，定位器 `button:visible` 不准确；spec 应使用 `getByRole('button',{name:/保存/})` 并等待其可见。
- 验证证据: cursor session=840f26b2-59e0-4f58-a690-fdd616477176; 涉及文件: e2e/company/personnel-certificate-crud.spec.js, src/components/OperationBtnGroup/index.vue, src/views/company/staffManagement/personnelRecord/detail.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: Vue 保存绑定与 E2E 定位",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "preferences"
}
-->
