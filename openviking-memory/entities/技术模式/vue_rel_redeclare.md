# Vue异步组件RELATION重复声明构建失败
苏住房G新增「添加条件组」多条件查询后，Vue 异步组件报 Identifier 'RELATION' has already been declared，真实错误是构建期 SyntaxError 导致页面整个 chunk 加载失败。

## 现象与根因
- 控制台出现 [Vue warn]: Failed to resolve async component: () => value()，紧跟 Reason: SyntaxError: Identifier 'RELATION' has already been declared，页面组件渲染不出来
- Vue warn 只是异步 chunk 加载失败后的二次包装，不要顺着 async component 方向查
- 同一作用域 RELATION（且/或关系常量）被声明两次：新组件 setup 里又写 const RELATION，而 mixins/table.js 或公共常量已注入/导出同名符号；或脚本改写把 import 合并进结构导致 import { RELATION } 与本地 const RELATION 并存

## 解法
- 全局搜该符号所有声明（含 import、mixins 注入、const/let），只留一处，从公共常量文件 import 复用
- 养成批量脚本改文件后立刻 build/启动看控制台的习惯——这类错误 ESLint 未必拦住，Vite 只在模块求值时才抛

## 验证与归属
- 来源会话63d4baf6（基线d109b83）用户诉求2原文贴出报错；涉及 zs-search-form.vue、mixins/table.js、listMixins.js
- 涉及文件：zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue、src/mixins/table.js、src/mixins/listMixins.js、src/views/publicQuery/complex/index.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_rel_redeclare",
  "source_extraction_id": "945bb1e362c547b283081240c4923464",
  "version": 1,
  "memory_type": "entities"
}
-->