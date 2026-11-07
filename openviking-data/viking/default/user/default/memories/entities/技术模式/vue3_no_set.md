# Vue3 迁移全局禁用 this.$set
产品2.0 升级 Vue 3 后选项式组件调用 `this.$set` 会报 `this.$set is not a function`。
## 问题根因
- Vue 3 移除 $set，RecursiveMenu.updateMenuState 等旧调用在运行时报错（如 RecursiveMenu.vue:173 堆栈）。
## 解决方案
- 全仓库批量改为对已有响应式对象/数组直接赋值或替换。
- 侧边栏菜单、表格、多级表单、弹窗等需一并扫净，用户要求「全局修改」。
## 验证与归属
- 验证：RecursiveMenu.vue:173 堆栈；用户要求全局修改。
- 涉及文件：zhi2-web-admin/src/layout/components/RecursiveMenu.vue；所属项目：2-0；来源会话：493b9fee-985b-412b-b70e-0415a8d267a2。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_no_set",
  "source_extraction_id": "aeb6021c119446819b122f4f280cd7ed",
  "version": 1,
  "memory_type": "entities"
}
-->