# 苏住房G 接口前缀与 env 目录实际位置
苏住房G 前端接口基址 VITE_APP_BASE_API 定义在父仓库根 env 目录，子模块内无同名 env，拼 URL 需以此为准。

## 关键事实
- 项目主体在父仓库子模块 zhi2-web-admin（前端纯 SPA），但 VITE_APP_BASE_API 定义在父仓库根 d:\repository\苏住房G\env\.env，值为 'api/v2.0'
- 子模块里没有可读的同名 env 文件，页面里 moduleName+businessName 拼出的 /property/complex/page 实际请求为 /api/v2.0/property/complex/page
- 业务目录 src/api/ 下通常无对应 js 文件（如 src/api/property/ 无 complex.js），接口经 listMixins/table.js 的 moduleName+businessName+apiMethod+apiSuffix 约定拼装
- 路由不在 router/index.js 静态注册，由后端 /system/menu/listRouters 下发 component，经 loadView() 映射到 src/views/，搜不到静态路由属正常

## 排查做法
- 核对全路径直接看父仓库 env/.env 的 VITE_APP_BASE_API 再拼模块段
- 查接口契约看列表 mixin 的约定字段，而非找 api 封装
- 找环境变量（代理、加密开关、base api）一律先去父仓库 env 目录，子模块内向上一级找

## 验证与归属
- 验证证据：会话 467ee981（基线 9fb6c2c）探索报告确认前缀、无独立 API 文件、动态路由下发
- 涉及文件：env/.env、mixins/table.js、mixins/listMixins.js、store/modules/permission.js、views/property/complex/index.vue
- 所属项目：苏住房G；来源会话：467ee981-9fc0-412b-b2a5-a58b1c9799c9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_api_env",
  "source_extraction_id": "cf02b3f3f9344491b308ce9fec4efa24",
  "version": 1,
  "memory_type": "entities"
}
-->