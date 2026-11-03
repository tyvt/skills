# 登录授权弹窗结构与跳转规范
在 pages/home/login/index 实现按设计稿的登录授权弹窗结构与跳转逻辑。

## 路由注册
- 在 pages.json 注册 pages/home/login/index 路由

## 弹窗结构
- pages/home/login/index.vue 实现全屏遮罩、居中圆角弹窗与 uni-icons 图标
- 底部双按钮：左按钮 navigateBack，右按钮跳转 /pages/face/verify

## 验证与归属
- 来源会话：cf9e07b8-2418-4ea4-8944-e6e30fe516eb
- 涉及文件：pages.json、pages/home/login/index.vue、pages/face/verify.vue、pages/face/face.vue、App.vue、pages/area-manage/area-manage.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "login_auth_dialog_pattern",
  "source_extraction_id": "c2465f155ae24dbdbc2237a960d3ebb5",
  "version": 1,
  "memory_type": "entities"
}
-->