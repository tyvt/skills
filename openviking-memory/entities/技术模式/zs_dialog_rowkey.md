# zs-select-dialog row-key 必传
打开 zs-select-dialog 默认勾选列时，宿主未传 row-key 会导致 ElTable 报警告，须显式传主键。

## 问题根因
- 组件内部默认 showCheckbox: true 会渲染选择列；宿主未传 row-key 时组件 rowKey 默认空字符串
- 有选择列的 ElTable 在 data 变化时必须提供有效 row-key（同属「row-key 为空导致 tbody 不渲染」契约一类）

## 修复方案
- 弹窗显式传入与选中回填字段一致的主键，如物业管理区域用 row-key="complexId"，与 handlePick/setProject 使用的 row.complexId 对齐
- 其他业务对照列表主键字段（houseId、projectId 等）同理
- 宜兴公共收益 pubBankDetailDay/index.vue 补充 row-key="regulatoryAccount" 对齐 bankDetailDay 等页面

## 验证与归属
- 验证：会话 300657ce，accountQuery/type.vue 选择弹窗未传 row-key，补 row-key="complexId" 后警告消失
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountQuery/type.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- 所属项目：园区物管2.0；代码基线：177bc3ce4；来源会话：300657ce-6fc5-408d-932e-3dc812b1084d
- 另例：会话 dcef345c，宜兴公共收益 pubBankDetailDay/index.vue 补 row-key="regulatoryAccount" 对齐 bankDetailDay 等页面；涉及文件 zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue 等；来源会话：dcef345c-2c73-4fc3-8747-b6d3d2a53a1f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_rowkey",
  "source_extraction_id": "4c41132cc4414e02ab9756bee071929d",
  "version": 2,
  "memory_type": "entities"
}
-->