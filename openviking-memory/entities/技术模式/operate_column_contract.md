# operate_column_contract
苏房 zs-operate-column 所在页必须在 data() 声明 moduleName/businessName，否则列表操作列 mixin 契约断裂。
## 问题现象
- 系统日志页 views/system/operlog/index.vue 渲染报 Vue warn：Property or method "moduleName" is not defined on the instance but referenced during render。
- 模板使用了 <zs-operate-column :moduleName="moduleName" :businessName="businessName" :buttons="buttons" />，但 data() 未声明这两个字段。
## 根因与影响
- listMixins 依赖的 table.js mixin 用 moduleName 拼接口路径与 tableId、用 businessName 拼权限前缀；缺字段导致权限码拼出 undefined，按钮显示/禁用异常，表现像操作列没了/点不动。
- 同目录 dict/index.vue、user/index.vue 等成熟页面都无条件声明了这两个字段，复刻时应照抄。
## 解决方案
- 在 data() 补 moduleName: 'system'、businessName: 'operLog'，取值必须与接口路径 /system/operLog/page 的段一致。
- 验收以刷新后两条 Vue 警告消失 + 操作列权限码正确为准。
## 验证与归属
- 验证：会话 6b87fa8d 定位模板第24行使用未声明字段；listMixins 的 table mixin 需要它们用于 tableId 与权限前缀；修复为补 moduleName:'system'、businessName:'operLog'。
- 涉及文件：zhi2-web-admin/src/views/system/operlog/index.vue、src/mixins/listMixins.js、src/mixins/table.js、src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：苏住房G；来源会话：6b87fa8d-f4b1-449c-ad47-3f43156f144d；代码基线：a945fa1
- 区别：与 OperationBtnGroup 里 prop 与 computed 同名 businessName 互相覆盖不同，本条是两者都不存在导致整条 mixin 契约失效。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_contract",
  "source_extraction_id": "fa60d003d05a4982a4ab7a431b2de4be",
  "version": 1,
  "memory_type": "entities"
}
-->