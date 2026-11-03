# zs-select-dialog 混入 table mixin 与 prop selectable 同名冲突
zs-select-dialog.vue 同时声明函数型 prop `selectable` 又混入含同名 data 的 table mixin，触发 Vue 同名冲突告警且行为互相踩，应改用轻量 tableComponents mixin。

## 问题现象
- 控制台报 [Vue warn]: The data property "selectable" is already declared as a prop，出现在工单报事等使用选择弹窗的页面

## 根因分析
- 组件声明函数类型 prop `selectable`（控制行是否可选，传给 zs-select-column）
- 同时混入 @/mixins/table，其 data 里也有布尔 `selectable`（表示是否显示多选列）
- Vue 不允许同名 prop 与 data，二者冲突告警且行为互相踩

## 解决方案
- 把 `mixins: [table]` 换成 `mixins: [tableComponents]`——tableComponents 只注册 zs-table、zs-select-column 等组件、不含 selectable 等 data
- zs-select-dialog 自身已实现列表查询与选择逻辑，不需要完整 table mixin
- 经验：给已有同名 data/prop 的公共弹窗组件补 mixin 时，优先选只注册组件的轻量 mixin（tableComponents），完整 table mixin 只给真正跑列表逻辑的页面用

## 验证与归属
- 验证：会话 09ed34db 报错栈定位 zs-select-dialog.vue，根因为 prop selectable（函数）与 table mixin data selectable（布尔）同名；修复为 mixins 由 table 换成 tableComponents，警告消失
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/mixins/tableComponents.js
- 所属项目：产品2.0；来源会话：09ed34db-94d4-41c6-856b-023f0668f865；代码基线：0161609

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_dialog_mixin_conflict",
  "source_extraction_id": "5bc1c57573344e21b65d5779775495df",
  "version": 1,
  "memory_type": "entities"
}
-->