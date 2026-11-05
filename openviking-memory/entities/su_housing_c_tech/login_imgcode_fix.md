# 登录页图形验证码未贴右侧修复
苏住房C(zhi2-mobile-shimin)登录页图形验证码未贴右侧，已通过恢复样式与去除临时宽高修复。

## 问题根因
- form.scss 中 uni-forms-item__content 样式被改动，导致图形验证码未贴右侧
- login/index.vue 加了临时 style="width: 100%" 撑满

## 修复内容
- form.scss：恢复 uni-forms-item__content 原始样式
- ImgCode/index.vue：保留 .img-code 下 display: contents（解决小程序里 ImgCode 组件宿主无法撑满问题）
- ImgCode/index.vue：保留 .img-code .container 的撑满与底部分割线（display: contents 后分割线需挪到 container 上）
- ImgCode/index.vue：恢复 .container 命名和原 justify-content: space-between 布局
- login/index.vue：去掉临时 style="width: 100%"

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/styles/form.scss、src/components/ImgCode/index.vue、src/pages_main/login/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：f888dab8-e1a9-417b-9761-339cbc03bf70；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "login_imgcode_fix",
  "source_extraction_id": "319434979eb5456683b6c30a531f83cd",
  "version": 1,
  "memory_type": "entities"
}
-->