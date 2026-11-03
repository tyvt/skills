# 函数式挂载选择弹窗需注入上下文
园区物管2.0 中通过 SelectDialog.open() 动态创建 zs-select-dialog-func 实例时，必须注入 parent/store/router，否则混入 table 的 tableConfig getter 崩溃。

## 问题根因
- 动态创建的根实例未挂 Vuex store，而 zs-select-dialog-func 混入 @/mixins/table，其 tableConfig 计算属性访问 this.$store.getters 导致 $store 为 undefined 崩溃
- 与已知函数式弹窗坑（propsData 传 visible 被丢、resolve/reject 竞态）是不同的第三个根因

## 解决方案
- 创建实例时除组件 options 外注入 parent: instance、store: window.__VUE_APP_STORE__ || instance.$store、router: window.__VUE_APP_ROUTER__ || instance.$router
- 与 main.js 既有设计对齐，新增「函数式挂载组件 + 访问 $store 的 mixin」组合时必须检查此注入，不能只传 propsData

## 验证与归属
- 验证：会话 7f55cc88 报错栈指向 open() 经 mixins/table.js 的 tableConfig getter；修复代码注入三参数；验证证据 src=园区物管2.0/048.md
- 涉及文件：zs-select-dialog-func.vue、mixins/table.js、autonomy/general/detail.vue、main.js、utils/tableColumnConfig.js；所属项目：园区物管2.0；代码基线：736a824e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_func_store",
  "source_extraction_id": "8113bd74d4ec46b1b7e66b0d382dcb64",
  "version": 2,
  "memory_type": "entities"
}
-->