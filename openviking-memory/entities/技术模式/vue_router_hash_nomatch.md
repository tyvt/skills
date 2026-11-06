# hash 路由 No match 路径形态与动态路由时机
产品2.0 中 zhi2-web-admin 使用 createWebHashHistory 时，缺 /#/ 或动态路由未 addRoute 会报 No match 警告。

## 问题根因
- 浏览器直开 `http://host/to-C/xqgl/project`（无 /#/）触发 `[Vue Router warn]: No match found`
- 通配符路由在 GenerateRoutes 动态添加，直链首次解析可能在 addRoute 完成前先 warn 一次

## 解决方案
- 外链/菜单统一 hash 形态或只用 router.push 的 path
- 若去 # 则改 createWebHistory 并配服务器 history fallback
- 进不去则核对后端菜单 component/path 与前端 views 是否一致
- 页面最终能进多为时机问题，无需特殊处理

## 验证与归属
- 验证证据：会话 dab975d3，用户报 /to-C/xqgl/project 无匹配，区分 hash URL 形态与动态路由首次解析时机；另见验证文档 src=2-0/017.md
- 涉及文件：zhi2-web-admin/src/router/index.js、zhi2-web-admin/src/store/modules/permission.js
- 所属项目：2-0；来源会话ID：dab975d3-8f02-4099-9922-936f5a02194f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_router_hash_nomatch",
  "source_extraction_id": "464ccee4c19e426fbb67c2365f53421a",
  "version": 2,
  "memory_type": "entities"
}
-->