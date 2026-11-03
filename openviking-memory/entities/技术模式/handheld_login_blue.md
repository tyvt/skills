# 手持端登录立即登录按钮主色为蓝色
物业手持端登录页「立即登录」按钮主色设定为蓝色，原组件引用默认色值未适配手持端规范。
## 问题根因
- 登录页「立即登录」按钮原组件引用默认色值，未适配手持端规范。
- 手持端规范要求该按钮主色为蓝色。
## 解决方案
- 将按钮主色设定为蓝色，适配手持端规范。
## 验证与归属
- 验证证据：src=泰兴小程序/014.md
- 涉及文件：src/staff/pages/login/index.vue、src/staff/components/ZsButton/ZsButton.vue、src/staff/styles/theme.scss、src/staff/styles/index.css、src/styles/index.css、src/staff/components/ImgCode/index.vue、src/staff/pages_facility/record/index.vue、src/package.json
- 来源会话ID：6a2c3ba7-f36d-4655-8e1c-0836814c4317
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "handheld_login_blue",
  "source_extraction_id": "c798a37960e444eb882910bebc0f0274",
  "version": 1,
  "memory_type": "entities"
}
-->