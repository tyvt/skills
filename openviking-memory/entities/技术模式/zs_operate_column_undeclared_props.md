# zs-operate-column用未声明属性致警告
园区公共收益项目中组件 `zs-operate-column` 使用 `moduleName` 与 `businessName`，但页面 `data()` 未定义且 `listMixins` 不提供，需参考 `logininfor/index.vue` 自行声明。

## 问题根因
- `zs-operate-column` 组件使用 `moduleName` 与 `businessName` 属性
- 页面 `data()` 未定义这两个属性且 `listMixins` 不提供，产生 Vue 警告且权限校验异常

## 解决方案
- 在 `data()` 补充 `moduleName: 'bankagent'`、`businessName: 'operlog'`
- 取值对齐权限标识 `bankagent/operlog:remove` 等，消除 Vue 警告并正常校验权限

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：src=园区公共收益/041.md
- 涉及文件：zhi2-web-admin/src/views/system/operlog/index.vue、src/mixins/listMixins.js、src/views/system/logininfor/index.vue、src/mixins/table.js、src/mixins/permsMixins.js
- 所属项目：园区公共收益；来源会话：6be2e0b2-c654-4450-88c2-a78a8fe79c79；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_column_undeclared_props",
  "source_extraction_id": "381659ee9de44443be66fc4b57c43a44",
  "version": 1,
  "memory_type": "entities"
}
-->