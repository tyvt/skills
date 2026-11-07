# 对外首页「更多」弹窗居中修复
门户对外首页商品房「更多」弹窗因全局 margin:auto!important 且无 flex 被顶到页面顶部的 bug 与修复要点。

## 根因
- 全局样式写了 margin:auto !important
- 遮罩层未用 flex 布局，弹窗被顶到页面最上方

## 修复要点
- 非 scoped 样式给 .el-dialog__wrapper.unified-login-menu-more-wrap 加 display:flex + 水平垂直居中
- 弹窗本体用 margin:0 auto，标题栏仍贴顶
- 刷新后重试「更多 >」

## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/components/ExternalInfoDialog.vue
- zhi2-web-admin/src/router/index.js
- zhi2-web-admin/tests/e2e/unified-login-visual.spec.ts

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：cursor 会话提取
- 所属项目：门户；来源会话：78fdc940-8661-40b6-8283-2194198f4096

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "more_popup_center_fix",
  "source_extraction_id": "852f63b02f764f4283bf1f49d7c63473",
  "version": 1,
  "memory_type": "entities"
}
-->