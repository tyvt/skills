# 小屏提示框文字遮挡系共用样式边距不足
portal-gate-modal组件的login与house类型共用，小屏适配需调整共用样式边距。

## 问题根因
- login与house类型共用portal-gate-modal.vue组件
- 小屏下文字遮挡系共用样式边距不足（换行、左右边距）

## 解决方案
- 调整共用样式（换行、左右边距）以适配小屏
- home.vue与externalWebview.vue引用同步生效

## 验证与归属
- 涉及文件：components/portal-gate-modal/portal-gate-modal.vue、home.vue、externalWebview.vue
- 来源会话：89963d64-03a6-4bc1-8b8f-ca67ab26fc19
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gate_modal_screen",
  "source_extraction_id": "13a6f7e5d40744838e74b52e260871ff",
  "version": 1,
  "memory_type": "entities"
}
-->