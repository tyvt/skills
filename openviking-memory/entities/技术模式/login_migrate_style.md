# login_migrate_style
登录页从 assets 迁进 views 后整页控件尺寸全坏，需补回 scoped 样式与选择器层级。

## 现象
- 输入框高度不对、前置图标与文字不对齐、忘记密码页样式错、发送验证码按钮高度/宽度/颜色都不对。
- 页面能渲染但样式整体失真，用户连续多轮返图打回。

## 根因
- 原 assets 下页面样式未随文件迁移，或迁移后选择器作用域不再命中。
- zs-input 等组件不写死高度，高度与图标对齐原本依赖登录页样式；缺失后退化浏览器默认尺寸。

## 修复做法
- 迁移页面文件须把对应样式块一并迁入目标 SFC，确认 scoped 边界与选择器层级对齐组件内部结构。
- 组件库默认无尺寸兜底，不要指望 zs-input 自动给出设计稿高度；验收需登录页+忘记密码页+验证码按钮三处同比。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 acfae044 用户连续诉求迁移后 CSS 样式、输入框高度、图标对齐、忘记密码样式、按钮高宽色问题。
- 涉及文件：src/views/login.vue、src/views/home/ForgotPassword.vue、src/components/zs-input/zs-input.vue、src/router/index.js
- 所属项目：产品2.0；来源会话：acfae044-ec7d-4f5e-bb61-36dc593a35da；代码基线：bd398ef

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_migrate_style",
  "source_extraction_id": "1ce6084d6ca64635b40c426f08a19a89",
  "version": 1,
  "memory_type": "entities"
}
-->