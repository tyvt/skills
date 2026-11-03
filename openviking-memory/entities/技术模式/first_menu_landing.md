# 登录后按菜单顺序进入首个非隐藏叶子页
苏州市房地产监测V3 登录后通过 resolveFirstMenuPath 深度优先取第一个非hidden叶子项跳转首菜单。

## 修复方案
- 新增 utils/landingPath.js 的 resolveFirstMenuPath，深度优先取第一个非hidden叶子项（跳过 Layout/ParentView）
- 登录成功优先 URL redirect，否则 /index 后跳转解析首菜单
- 根路径重定向 /index，无菜单回退 DEFAULT_LANDING_PATH('/todo')

## 涉及文件
- router/index.js、store/modules/permission.js、utils/ruoyi.js
- views/login.vue、layout/components/Sidebar/RecursiveMenu.vue、views/LoginForm.vue
- views/companyLogin.vue、layout/components/Navbar.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/129.md
- 来源会话：4f960b97-1c4b-4b74-94fb-4c515763dae7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "first_menu_landing",
  "source_extraction_id": "d59ddbfaa7294cb29f8936825d8b0a16",
  "version": 1,
  "memory_type": "entities"
}
-->