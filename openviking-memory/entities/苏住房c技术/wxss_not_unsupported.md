# 微信小程序WXSS不支持:not()伪类
苏住房C（uni-app Vue3）构建时微信开发者工具报wxss编译错误，根因为WXSS整类不支持:not()等伪类，需改写显式选择器或套容器承接样式。

## 现象与根因
- zhi2-mobile-shimin 自动预览/构建报 wxss 编译错误 ErrorFileCount[3]，error at token ':'
- 微信小程序 WXSS 选择器支持面比标准 CSS 窄，`:not(...)` 被整类拒绝，任一被引入的 scss 出现 `:not(` 都会被打进每份 wxss 造成一连串报错
- 典型来源：页面直系选择 `> :not(.page-bg)`、`.container-main > :not(.page-bg)` 与 uni.scss 全局 `.page:not(.page-wrapper)` 污染所有页面
- 命中文件示例：TypeChoose_Suzhufang.vue、pages_owner/house/index.vue、pages_owner/tenant/index.vue、pages_owner/income/index.vue

## 解决方案
- 把 `:not()` 展开成显式选择器清单，如 `> :not(.page-bg)` 改为 `.type-text, .title_card_container`
- 全局 uni.scss 里 `.page:not(.page-wrapper)` 直接降级为 `.page`
- 套容器承接样式时必须把原有 `flex: 1`、`min-height: 0` 一起搬到新容器，否则滚动区域失效
- 改完在页面/组件级扫 `:not` 数量应为 0，再回开发者工具重新编译验证；新增样式禁用 `:not()/:has()` 一类现代伪类

## 验证与归属
- 会话 7482cc2e（2026-08-25，基线 5f0f4dc）：用户贴 wxss 编译错误，逐文件替换并改 uni.scss，复核 :not 数量为 0；涉及 TypeChoose_Suzhufang.vue、house/index.vue、tenant/index.vue、uni.scss
- 会话 42b1dbae（基线 9832ba3）：pages_owner/income/index.wxss 等三处 error at token ':'，逐文件替换后 :not 数量为 0；随后修改 maintain/detail.vue 保留 flex/min-height 构建通过；涉及 income/index.vue、maintain/detail.vue、styles/filter.scss、components/PageBg/PageBg.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxss_not_unsupported",
  "source_extraction_id": "2e192de19d9f4bb18647ef27da14cff8",
  "version": 2,
  "memory_type": "entities"
}
-->