# 区域银行授权启用状态列显示错乱修复
苏住房G 项目 regionBankAuth 模块中市级和区级「启用状态」列反复切换时显示错乱的技术修复记录。

## 问题根因
- 列组件被错误复用：原列 key 仅 `column.prop || column.label`，市级和区级启用状态列 prop 均为 enableStatus 但类型不同（dict vs switch），Vue 复用同一列组件实例只更新 props，内部渲染器不重建
- 快速切换请求互相覆盖：快速点击市/区/街道时多个 getList 并发，后发请求可能先返回，旧数据覆盖新数据

## 修复方案
- 表格按层级强制重建：`:key="tableViewKey"`（值为 city / district / street）
- 列 key 包含层级和类型：`` `${tableViewKey}-${column.prop}-${column.type}` ``
- 请求序号保护：用 listRequestId 丢弃过期响应

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/views/system/regionBankAuth/index.vue、src/views/system/regionBankAuth/detail.vue
- 来源会话ID：ecdea30a-99b2-441c-917e-7cbad52000ed；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_bank_auth_enable",
  "source_extraction_id": "6c1f939346714376a840e7687a9737f5",
  "version": 1,
  "memory_type": "entities"
}
-->