# 子表弹窗 form 工厂预定义全字段（产品2.0）
产品2.0 机构注册银行账户子表弹窗因 Vue2 后加属性非响应式，导致选银行回填不反显，需用工厂函数预定义全字段并配合 $set。

## 问题现象
- 新增态下先填账户名称/银行账号，再通过 setBank 选开户银行回填 this.form.bankName，输入框不立即反显
- 需清空其他字段触发重渲染后才显示，静默无报错

## 根因
- Vue2 无法侦测「在对象上后加的属性」
- form 初始只声明 companyRegisterId，bankName/bankId/bankNo 均为后加属性、非响应式，赋值后视图不更新

## 解决方案
- 抽 createDefaultForm() 工厂预定义全部表单字段，handleAdd/handleUpdate 都用它初始化
- 回填外部选中值（如选银行）时用 this.$set() 赋值，并顺带 clearValidate 清掉 bankName 校验状态
- 套路泛化：子表弹窗 form 一律用工厂函数声明全字段，不许依赖「后面再加」；回填外部数据一律 $set

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/company/companyRegister/components/bankTable.vue、companyManagement/components/bankTable.vue
- 所属项目：产品2.0；来源会话：44cfc1d2-8149-4819-b5f1-42bdc46f2173；基线：50767de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_form_factory",
  "source_extraction_id": "aa6a9cc932774c7691d3f30fa719d440",
  "version": 1,
  "memory_type": "entities"
}
-->