# 手持端登录立即登录按钮主色为蓝色
物业手持端登录页「立即登录」按钮主色已切换为蓝色，通过注入 staff 主题变量实现。

## 问题根因
- 按钮用 ZsButton type="primary"，背景色由组件内 var(--primary-color) 决定。
- 登录页此前未注入 staff 主题变量，小程序端继承全局业主端主色 #0A3D62（深藏青）。
- 页面残留 background: #2583f5 因同权重打不过组件样式，一直是死代码。

## 解决方案
- 修改 src/staff/pages/login/index.vue：样式块改为 scoped lang="scss"，引入 @/staff/styles/theme.scss，在 .login-page 根节点 @include staff-page-theme。
- 主题蓝 #1677ff 通过 CSS 变量继承流入按钮组件（与 pages_facility 下 13 处页面成熟写法一致）。
- 删除无效残留 background: #2583f5；修复 disabled/登录中半透明态正确解析为半透明蓝。

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序（原 src=泰兴小程序/014.md）。
- 涉及文件：src/staff/pages/login/index.vue、@/staff/styles/theme.scss、src/staff/components/ZsButton/ZsButton.vue、src/staff/styles/index.css、src/styles/index.css 等。
- 来源会话ID：6a2c3ba7-f36d-4655-8e1c-0836814c4317
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "handheld_login_blue",
  "source_extraction_id": "d0e22eb5dac845d1a38d305efc1b5c08",
  "version": 2,
  "memory_type": "entities"
}
-->