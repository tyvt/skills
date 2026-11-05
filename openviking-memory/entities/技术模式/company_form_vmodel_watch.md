# 公司基本信息表单prop双向绑定警告修复
产品2.0 CompanyBasicInfoForm.vue 因直接对 form prop 做 v-model 触发 Vue 单向数据流警告，已修复。

## 问题根因
- 子组件通过 :form="form" 接收父组件数据
- 模板里用 v-model="form.xxx" 直接改写 prop，触发 Vue 单向数据流警告

## 解决方案
- 子组件增加 localForm，通过 watch 与父组件 form 保持同一对象引用（非深拷贝）
- data(){return{localForm:{}}}，watch:{form:{immediate:true,handler(val){this.localForm=val||{}}}}
- 所有编辑绑定改为 localForm，不再直接对 form prop 做 v-model
- localForm 与父组件 form 仍是同一引用，父组件校验、保存逻辑不受影响

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoForm.vue、toB/companyRecord/detail.vue
- 所属项目：产品2.0；来源会话：f4820caa-7dba-4a66-83ef-64ac5b12adb3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_form_vmodel_watch",
  "source_extraction_id": "82270027bd254d6e9e2b58eca3f38ac5",
  "version": 1,
  "memory_type": "entities"
}
-->