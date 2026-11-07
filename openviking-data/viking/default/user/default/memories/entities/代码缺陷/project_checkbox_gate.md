# 楼盘项目列表勾选门禁连坐
在苏住房G项目(zhi2-web-admin)楼盘项目列表(building/project)，通用listMixins/table.js的isSelectable仅放行草稿态，导致已备案行无法勾选执行导出/授权等只读动作。
## 根因
- table.js的isSelectable(row){return row.bizState=='0'}为批量删除设计，只放行草稿态
- 页面勾选语义变为「选中后导出/授权」，已备案行(如恋雪小花园)被禁用，致「设置对外权限」「导出小区房屋」按钮置灰
- 通用逻辑劫持业务状态门控，与勾选弹窗分母/row-key重复等已知数据传参问题根因不同
## 解决方案
- 本页覆写勾选能力，允许任意业务状态行被勾选
- 批量删除作用域单独收窄为草稿态(删除回调过滤或禁用删除入口)，保证「能选」不等于「能删」
- 避免误删已备案数据
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话e972de96，用户反馈「选不了下面的数据」；修复为building/project/index.vue覆写勾选、批量删除仅作用草稿
- 涉及文件：src/views/building/project/index.vue、src/mixins/listMixins.js、src/mixins/table.js
- 所属项目：苏住房G；来源会话：e972de96-ea86-4046-8a3e-d5e86948f61f；代码基线：3697a62

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "project_checkbox_gate",
  "source_extraction_id": "3c7e2243800241628db95ed98f7b1f96",
  "version": 1,
  "memory_type": "entities"
}
-->