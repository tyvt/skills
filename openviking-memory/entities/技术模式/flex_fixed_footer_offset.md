# flex内fixed底栏未设左右致偏移
.login 页面 flex 布局下 fixed 底栏未设 left/right 致偏左不居中，需补 left:0;right:0 并避免外层 transform。

## 问题现象
- 底栏 `.el-login-footer` 偏左不居中

## 根因
- `.login.login--form-only` 设 `align-items: flex-end`
- flex 子节点 `.el-login-footer` 在 `position: fixed` 且 `left`/`right` 为 `auto` 时按 flex 静态位置布局

## 解决方案
- 为 `.el-login-footer` 添加 `left:0; right:0; box-sizing:border-box` 并依赖内部 `text-align:center` 居中
- 外层 `.login` 避免 `transform` 以免 fixed 相对该层定位

## 验证与归属
- 验证证据：src=园区物管2.0/030.md
- 涉及文件：zhi2-web-admin/src/views/login.vue
- 所属项目：园区物管2.0；代码基线 none；来源会话 4b4a9576-d928-45cc-bdb7-cc109ec7c990

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flex_fixed_footer_offset",
  "source_extraction_id": "7573fea884d54cc7a5763884e2477eaa",
  "version": 1,
  "memory_type": "entities"
}
-->