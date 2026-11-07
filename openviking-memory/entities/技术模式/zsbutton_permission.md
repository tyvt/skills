# ZsButton 布尔 permission 透传类型警告
ZsButton 的 permission prop 声明为 Array，通过 v-bind="attrs" 透传布尔 permission:false 会触发类型警告。

## 问题根因
- ZsButton 的 permission prop 声明为 Array 类型，布尔值会触发 Vue 类型警告 `Expected Array, got Boolean`
- 把按钮配置对象里的 permission:false 经 v-bind="button.attrs" 透传给 ZsButton 会触发告警
- zs-operate-column 的 permission 语义不同：布尔为开关（内部 if(!button.permission) return true），写在 buttons 配置里合法

## 解决方案
- ZsButton 按钮 attrs 里不要写 permission:false，直接省略即可达到「不受权限限制」效果
- 确需权限控制时传数组如 permission:['company:personnelRecord:add']
- 排查此类警告时先分清 permission 流向哪个组件（ZsButton 还是 zs-operate-column）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 238293ef，从 certificatesTable.vue 操作按钮 attrs 移除 permission:false，buttons 配置里的保留给 zs-operate-column
- 涉及文件：zhi2-web-admin/src/components/zs-button/zs-button.vue；zhi2-web-admin/src/views/company/staffManagement/components/certificatesTable.vue
- 所属项目：产品2.0；来源会话ID：238293ef-3bd5-4396-98d5-3034f011a25c；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_permission",
  "source_extraction_id": "b458b054e1c74a3cbbd66c380cfde872",
  "version": 1,
  "memory_type": "entities"
}
-->