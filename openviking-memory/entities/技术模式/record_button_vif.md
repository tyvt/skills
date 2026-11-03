# 备案按钮 v-if 限制移除
淮安物管 zhi2-web-admin 公共查询复杂详情页中备案按钮因子组件 v-if 限制在有数据时隐藏，移除后始终显示。

## 问题背景
- detail.vue 引用的 committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue 中备案按钮因 v-if="!hasData" 等条件在有数据时隐藏。

## 修复方案
- 移除各子组件 v-if 限制及冗余状态变量，备案按钮始终显示，表格内容正常展示。

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/detail.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/committeeTable.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/managementOrgPanel.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/regulatoryAccountPanel.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/buildingTable.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/propertyContractTable.vue

## 验证与归属
- 验证证据：src=淮安物管/015.md
- 来源会话：4a4ea16a-5909-4259-b187-a74d02887a92；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_button_vif",
  "source_extraction_id": "2ba854edc6664b4e909fc2e8d9323249",
  "version": 1,
  "memory_type": "entities"
}
-->