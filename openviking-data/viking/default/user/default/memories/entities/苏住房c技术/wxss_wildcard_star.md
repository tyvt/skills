# 微信小程序WXSS不支持> *通配符致form.scss编译错
苏住房C（uni-app）中PasswordForm.vue引入的form.scss使用`> *`子选择器，因微信小程序WXSS不支持通配符`*`导致编译报错，需通过条件编译适配MP端。
## 现象与根因
- zhi2-mobile-shimin 构建/预览报 wxss 编译错误，根因为 WXSS 不支持 `> *` 通配符子选择器
- 典型来源：@/styles/form.scss 中 `> *` 选择器被 PasswordForm.vue 引入后打入 wxss 触发报错
- 微信小程序环境对通配符 `*` 支持有限，标准 CSS 写法需在 MP 端改写
## 解决方案
- 在 form.scss 采用 uni-app 条件编译：`#ifdef MP` 下改 `> view` 适配 virtualHost 根节点，`#ifndef MP`（H5/App）保留原 `> *` 写法
- 改动需同步 form.scss 与 form2.scss，确保各端编译通过
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/066.md；form.scss 条件编译后 MP 端 `> view`、H5/App 保留原写法
- 涉及文件：PasswordForm.vue、form.scss、form2.scss、login/index.vue、ImgCode/index.vue、stockHouseSign/apply.vue、VerifyCode/index.vue、uni.scss
- 所属项目：苏住房C；来源会话ID：3f6a535b-0e0d-41d1-aacb-0ee81bac9792；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxss_wildcard_star",
  "source_extraction_id": "b1017c16efbe49578723df1f2aed4396",
  "version": 1,
  "memory_type": "entities"
}
-->