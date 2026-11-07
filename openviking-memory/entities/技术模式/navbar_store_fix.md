# Navbar标题从store读取修复
产品2.0项目zhi2-web-admin/src/layout/components/Navbar.vue标题改为从store读取，避免空标题。

## 变更内容
- 删除data中的title: import.meta.env.VITE_APP_PROJECT_NAME
- computed新增title()返回this.platformConfig.platformName || import.meta.env.VITE_APP_PROJECT_NAME
- 优先使用store.state.app.platformConfig.platformName，未拿到配置时回退环境变量

## 涉及文件与说明
- 涉及文件：Navbar.vue、store/modules/app.js
- 现有3个lint/ts报错在原文件其他位置，非本次改动引入
- 来源会话ID：6a14ed22-6423-4953-948b-32e9d3050f1b；项目：产品2.0；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_store_fix",
  "source_extraction_id": "43d08df398dd40149127f1a7c83beead",
  "version": 1,
  "memory_type": "entities"
}
-->
