# 预览入口 stub 缺失全局方法致白屏
苏住房G 首页V2独立预览入口 preview-main.js 仅 stub 部分依赖，未覆盖页面 created 调用的全局方法致崩溃。
## 问题根因
- preview-main.js 只 stub $get/$store/$router 就挂载 HomeIndexV2，而页面 created 调 initTodoDict → this.getDicts（main.js 挂到 Vue 原型的全局方法）。
- 预览环境无该原型方法，启动阶段 getDicts is not a function 崩掉，表现为整页白屏。
- stub 清单未按页面能力演进同步更新。
## 解决方案
- 预览入口在 Vue.prototype 补齐全局方法最小实现：getDicts 返回 Promise.resolve({data:[]})、dictFormatter 返回原值、msgSuccess/msgWarning 给 noop。
- 更稳方式：预览复用项目全局 mixin/插件而非手工列 stub。
- 加页面时同步 review preview 入口，检查页面 created 调用的 this.xxx。
## 验证与归属
- 验证证据：preview-main.js:64-66 与 index-v2.vue:102-118，HomeIndexV2 created 调 getDicts，预览只 stub 部分致崩溃。
- 涉及文件：zhi2-web-admin/src/views/home/preview-main.js、index-v2.vue
- 所属项目：苏住房G；来源会话ID：22db11e4-4ebb-4504-8a6e-e93aa9791182；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "preview_stub_globals",
  "source_extraction_id": "78a06fbd1aec4ffab8656af93c6d4aae",
  "version": 1,
  "memory_type": "entities"
}
-->