# 微信小程序WXSS不支持:not()伪类
微信小程序WXSS整类不支持 `:not()` 等伪类（不只禁通配符），编译报 error at token ':'，需包容器承接样式。

## 问题根因
- WXSS选择器支持面比标准CSS窄，`:not(...)` 被整类拒绝；只要任一被引入的scss（uni.scss全局、页面scss、被多组件@import的样式）出现 `:not(`，就会被打进每份wxss造成一连串报错
- 典型来源：`.container-main > :not(.page-bg)` 与 uni.scss 里的 `.page:not(.page-wrapper)`

## 解决方案
- 搜索全仓 `:not(` 改写为显式类名枚举，如 `> :not(.page-bg)` → 给内容区套 `<div class="container-body">` 再写 `.container-body`
- 套容器时必须把原有 `flex: 1`、`min-height: 0` 一起搬到新容器，否则滚动区域失效
- 改完在页面/组件级扫 `:not` 数量应为0，重新构建后到微信开发者工具重新编译验证

## 验证与归属
- 验证证据：pages_owner/income/index.wxss 与另两处 error at token ':'，根因确认WXSS不支持:not()，逐文件替换后三个wxss中:not数量为0；随后修改maintain/detail.vue保留flex/min-height构建通过
- 涉及文件：pages_owner/income/index.vue、pages_owner/maintain/detail.vue、uni.scss、styles/filter.scss、components/PageBg/PageBg.vue
- 所属项目：苏住房C；来源会话ID：42b1dbae-331e-42a5-8f4d-a65e0368e56b；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxss_not_bug",
  "source_extraction_id": "1e9d9fcc5d254f8bb6175bced3e8798b",
  "version": 1,
  "memory_type": "entities"
}
-->