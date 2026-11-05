# 账户拆分功能调整页面字段与弹窗逻辑修复
园区公共收益项目账户拆分功能调整页面字段与弹窗逻辑已修复。

## 修复内容
- 列表页 index.vue：筛选条件为关键字、楼幢号、户室号、业务状态（固定 operatorType:1）；列表列「账户拆分时间」改为「创建时间」(createTime)
- 详情页 detail.vue：新增 HeadTitle（申请编号、业务状态、备案时间）；按设计图重排字段并更新标签（如「原本金全额」「原账户冻结金额」等）；补充「申请人联系电话」；申请时间改为只读；备注限制1200字；精简校验（仅保留区域、账号、申请人必填，手机号可选校验）；操作按钮移至底部；切换物业区域时清空已选账号；setAccountName 改为按字段 merge 避免覆盖主单 ID
- accountNameDialog.vue：拆出账户/拆入账户两种模式（不同标题、筛选项、列），统一单选/多选 + 确定按钮；请求携带 operatorType:1
- AccountListTable.vue：标题改为「业主账号拆分表」；列对齐设计（含业主账号，移除结息相关列）；合计行改为「合计」；修复 :form="form" 传递（原 $attrs.form 无效）

## 涉及文件
- c:/Users/Administrator/Downloads/账户拆分-前端接口对接文档.md
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountSplit/index.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountSplit/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountSplit/components/AccountListTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountSplit/components/AccountListDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountSplit/components/accountNameDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountOpen/complex/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/accountChange/detail.vue

## 验证与归属
- 验证：src=园区公共收益/005.md；来源会话 46eb821e-f488-4bb3-b973-6647aedb4d2b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_split_fix",
  "source_extraction_id": "b555c8349a924ea8baf9720c753e2722",
  "version": 1,
  "memory_type": "entities"
}
-->