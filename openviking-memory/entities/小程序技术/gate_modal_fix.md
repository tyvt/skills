# 门禁弹窗文字截断共用样式修复
登录与添加房屋两个 portal-gate-modal 弹窗文字换行截断，修改共用样式后一并修复。

## 问题根因
- 登录拦截与添加房屋拦截弹窗文字被截断
- 共用样式（换行/边距）在小屏下不适配

## 解决方案
- 修改共用 portal-gate-modal 组件样式，两种弹窗一起修复
- home.vue 与 externalWebview.vue 同用该组件

## 验证与归属
- 验证：011.md 会话 门禁弹窗文字换行截断改共用样式
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue
- 来源会话ID：11-gate-modal
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gate_modal_fix",
  "source_extraction_id": "fcb833032af14e8ea003acd1fc6646fe",
  "version": 1,
  "memory_type": "entities"
}
-->