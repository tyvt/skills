# UnifiedLogin 菜单弹窗合并前审查
UnifiedLoginMenuMoreDialog.vue 与 UnifiedLogin.vue 的 ESLint 通过，但存在 3 项 HIGH 问题建议合并前处理（BLOCK）。

## 问题清单（HIGH）
- 弹窗菜单项用 `<li @click>`，缺键盘/读屏支持，建议改 `<button>` 或补全 role/tabindex 与 Enter/Space
- 子菜单 v-for 使用 index 作为 :key，扩展数据后易出问题
- links + previewCount 与 children 双轨模型不一致，仅「商品房」有「更多」逻辑，需统一约定或集中 normalize

## 问题清单（MEDIUM）
- getMenuChildren 在模板里每次重算
- previewCount 边界、空列表弹窗等

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- E2E 已覆盖 7 项菜单与 dialogTitle 文案
- 涉及文件：UnifiedLoginMenuMoreDialog.vue、UnifiedLogin.vue、unified-login-visual.spec.ts、ExternalInfoDialog.vue
- 所属项目：门户；来源会话ID：ecbf0459-d7d2-4d99-934b-c0bdf8b4c2cb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_menu_review",
  "source_extraction_id": "f32c83e1c8fe4363aa3e476f149c79ff",
  "version": 1,
  "memory_type": "entities"
}
-->