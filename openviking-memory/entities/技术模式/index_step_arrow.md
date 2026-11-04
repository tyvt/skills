# 步骤条的箭头及窄屏错位
门户中的 `index-new.vue` 里的步骤条 (`.flow-step-cell`) 使用了固定的 12px CSS 箭头和 `padding-right: dw(14)`，在窄屏下错位并导致水平溢出；`v-for` 使用了 `:key='si'`，这不是稳定的业务键。

## 问题
- 固定的 12px CSS 箭头 + padding-right dw(14) 在窄屏下错位；整行水平溢出
- 模板 `:key='si'` 不是稳定的业务键
- `npm run lint` 扫描 `src/**/*.{vue,js}`（约 3506 个样式项）且未隔离 `index-new.vue` 的更改

## 解决方案
- 统一箭头和 padding 的单位（一致地使用 dw()）
- `v-for` 应使用稳定的业务键代替 `si`

## 验证与归属
- 验证证据: portal/037.md
- 涉及文件: zhi2-web-admin/src/views/home/index-new.vue; tests/e2e/portal-home-visual.spec.ts; package.json
- 会话: d6e2d37c-78bf-4548-8cba-1179801832f4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_step_arrow",
  "source_extraction_id": "dd37fc1ce95e4bc7ac6e21d7160d2ee6",
  "version": 1,
  "memory_type": "entities"
}
-->