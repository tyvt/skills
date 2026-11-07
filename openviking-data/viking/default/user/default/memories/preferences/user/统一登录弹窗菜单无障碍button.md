- 在将 `UnifiedLoginMenuMoreDialog.vue` 与 `UnifiedLogin.vue` 合并之前，先处理无障碍与 `key` 问题。
- 菜单项 `<li @click>` 改为 `<button>`，或补全 `role`/`tabindex` 与键盘事件；子菜单 `v-for` 禁止用 `index` 作 `:key`。
- 集中规范化双模型 `links`+`previewCount` 与 `children`。
- 涉及文件: UnifiedLoginMenuMoreDialog.vue, UnifiedLogin.vue, ExternalInfoDialog.vue, tests/e2e/unified-login-visual.spec.ts
- 来源会话: ecbf0459-d7d2-4d99-934b-c0bdf8b4c2cb

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "无障碍登录弹窗菜单使用 button",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "preferences"
}
-->
