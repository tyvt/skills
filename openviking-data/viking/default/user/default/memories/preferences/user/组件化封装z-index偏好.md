
- 偏好通过组件化封装 z-index 逻辑，避免页面中手写 z-index 样式冗余，提升样式维护性
- 新增 `ZsPopup` 的 `zIndex` 属性（默认 `1000`），应用到 `uni-popup` 根节点 style（文件：`src/components/ZsPopup/ZsPopup.vue`）
- 决策成功弹窗等需提层时直接给 `ZsPopup` 传 `:zIndex="xxxx"`（如 `src/pages_owner/decision/form.vue` 两弹窗用 `:zIndex="9999"`）
- 移除页面级 `:deep(.decision-success-popup){ z-index... }` 样式以避免重复/污染
- 其他页面遇遮挡时，直接给 `ZsPopup` 传 `:zIndex` 即可
- 涉及文件：src/components/ZsPopup/ZsPopup.vue、src/pages_owner/decision/form.vue、src/pages_owner/decision/components/StepSign.vue
- 验证证据：cursor session 2d1d0d28-89de-4c7e-9e05-5135f6725d28；代码基线：none

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 来源会话：2d1d0d28-89de-4c7e-9e05-5135f6725d28


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "组件化封装z-index偏好",
  "source_extraction_id": "d44604109b454c76915803a669417212",
  "version": 2,
  "memory_type": "preferences"
}
-->
