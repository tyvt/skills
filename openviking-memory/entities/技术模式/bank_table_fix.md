# 企业注册银行账户弹窗Vue2响应式修复
产品2.0项目中companyRegister/components/bankTable.vue新增银行账户弹窗因Vue2响应式缺陷导致选择开户银行无法即时反显的问题已修复。

## 问题根因
- 新增时form仅初始化companyRegisterId，未预定义bankName、bankId、bankNo
- 用户填写账户名称、银行账号后，setBank直接赋值this.form.bankName = row.unionBankName，新增属性非响应式
- Vue2无法侦测后加属性，输入框不立即更新，需清空其他字段触发重渲染才显示

## 修复方案
- 增加createDefaultForm()预定义全部表单字段
- handleAdd/handleUpdate使用默认表单结构初始化
- setBank改用this.$set()赋值，并清除bankName校验状态

## 涉及文件与验证
- 参照同项目companyManagement/components/bankTable.vue做法
- 涉及文件：companyRegister/components/bankTable.vue、companyManagement/components/bankTable.vue
- 验证：新增银行账户弹窗先填账户名称和银行账号，再选开户银行应可立即反显
- 来源会话ID：44cfc1d2-8149-4819-b5f1-42bdc46f2173；项目：产品2.0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_table_fix",
  "source_extraction_id": "43d08df398dd40149127f1a7c83beead",
  "version": 1,
  "memory_type": "entities"
}
-->