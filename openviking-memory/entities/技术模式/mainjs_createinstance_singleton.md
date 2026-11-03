# main.js 重复 createInstance 导致全局组件二次注册
产品2.0 中入口连续触发 createInstance 会使 registerGlobalComponents 重复注册组件并报已注册警告。

## 问题根因
- URL 带 token 等场景可能连续触发 createInstance（token 分支已创建，后续 else 再调一次）
- registerGlobalComponents 重复 app.component 出现 `Component "xxx" has already been registered`
- 与 token + iframe 双路径各调一次并列，需单例挂载 + 注册幂等双保险

## 解决方案
- createInstance 若 instance 已存在直接返回（挂载单例）
- registerGlobalComponents 在 `app._context.components[name]` 已存在时 continue
- 用 defineAsyncComponent(loader) 注册 glob 异步组件

## 验证与归属
- 验证证据：会话 1210ef9d，main.js:39 registerGlobalComponents 多次触发，已改幂等保护与单例 mount；src=2-0/017.md
- 涉及文件：zhi2-web-admin/src/main.js
- 所属项目：2-0；来源会话ID：1210ef9d-24f4-4452-a7cc-89267ce1e575；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mainjs_createinstance_singleton",
  "source_extraction_id": "5735c2b524dc4e538e7180fc8a41d720",
  "version": 2,
  "memory_type": "entities"
}
-->