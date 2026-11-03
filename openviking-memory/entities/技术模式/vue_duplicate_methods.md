# Vue 同名 methods 静默覆盖
园区物管2.0 的 Vue 组件 methods 里同名方法定义两次会静默覆盖，靠 no-duplicate-vue-options 门禁拦截。

## 问题根因
- Vue 组件 methods 里同名方法定义两次不会报运行时错误，后一个定义静默覆盖前一个
- assetLeaseApply 与 resourcesLeaseContractFiling 两页各写两遍 getQueryParams，合并改动时第二处只补了 parentDeptId
- 第一处的业务参数逻辑（applyType/contractTypes 等）实际被覆盖，属静默丢逻辑

## 解决方案
- 把两段逻辑合并成一个方法（保留业务参数 + 在同一方法里补 $store.state.user.currentProjectId）
- 删掉重复定义后 eslint --fix
- 项目已有 no-duplicate-vue-options 规则兜底，提交被拦时按「后定义覆盖前定义」理解报错，合并逻辑而不是简单删一份

## 验证与归属
- 验证：会话 38ac27d7 两页 methods 各两次定义 getQueryParams 触发 no-duplicate-vue-options；解法为合并为一个方法并补 parentDeptId
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/index.vue、zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/index.vue
- 所属项目：园区物管2.0；代码基线：49e7729ce；来源会话：38ac27d7-c45f-4497-b949-64781b2d3118

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_duplicate_methods",
  "source_extraction_id": "a1ffc258770840b091dc679561b91a7b",
  "version": 1,
  "memory_type": "entities"
}
-->