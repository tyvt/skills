# home类型页成启动页致login自动登录未触发
pages/home 配置 type: "home" 被 @uni-helper/vite-plugin-uni-pages 排至首位作为入口，冷启动不加载 login.vue 致自动登录失效。

## 问题根因
- pages/home 配置 type: "home" 被 @uni-helper/vite-plugin-uni-pages 排至首位作为入口
- 冷启动不加载 login.vue 致自动登录失效

## 解决方案
- pages.config.ts 与 src/pages.json 将 type: "home" 移至 pages/login
- login.vue 用 onLoad 替代 onMounted 触发登录

## 涉及文件
- login.vue
- pages.config.ts
- src/pages.json

## 验证与归属
- 验证：extracted source=cursor session=8758d9c3-c86e-4622-b482-ea9ce521acd6
- 来源会话ID：8758d9c3-c86e-4622-b482-ea9ce521acd6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home类型页成启动页致login自动登录未触发",
  "source_extraction_id": "d3a37d7a74404efd9cb7a275d22e9e8d",
  "version": 1,
  "memory_type": "entities"
}
-->