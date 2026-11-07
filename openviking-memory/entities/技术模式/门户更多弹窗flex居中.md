# 门户更多弹窗Flex居中
对外首页商品房「更多」弹窗因 wrapper 非 flex 导致 margin:auto 把对话框顶到页顶，需用 flex 居中修复。

## 问题根因
- 使用类名 `unified-login-menu-more-wrap` 的 `el-dialog`，全局样式写 `margin: auto !important`
- `.el-dialog__wrapper` 未做 flex 垂直居中，弹窗跑到页面最上方而非视口居中

## 修复方案
- 非 scoped 样式给 `.el-dialog__wrapper.unified-login-menu-more-wrap` 设 `display: flex` 并水平垂直居中
- 弹窗本体 `margin: 0 auto`，标题栏贴顶消除顶部白边
- 不对 wrapper 的 `display` 加 `!important`，以免压过 `v-show` 内联 `display:none`

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/src/views/home/components/ExternalInfoDialog.vue
- 所属项目：门户；来源会话：78fdc940-8661-40b6-8283-2194198f4096；代码基线：50578e9

## 验证证据
- 用户反馈标题栏贴顶与「要页面居中，现在跑到页面顶部了」
- 结论确认全局 margin:auto !important 但遮罩无 flex 导致顶到页顶，flex 居中修复

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "门户更多弹窗Flex居中",
  "source_extraction_id": "335b424c18714584bd287e254aa5296a",
  "version": 1,
  "memory_type": "entities"
}
-->
