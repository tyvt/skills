# 监管账户列表缺失单据状态筛选
宜兴公共收益项目中监管账户列表补全「单据状态」筛选条件的修复套路。

## 问题背景
- `zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue` 的 `queryParams` 缺 `bizState` 筛选

## 解决方案
- 在 `queryParams` 新增 `bizState: undefined`
- 搜索表单复用 `bizStateOptions` 添加「单据状态」下拉补全筛选

## 验证与归属
- 验证证据：src=宜兴公共收益/002.md
- 涉及文件：zhi2-web-admin/src/views/benefit/pubManagementOrg/index.vue、zhi2-web-admin/src/views/benefit/pubRegulatoryAgreement/index.vue、zhi2-web-admin/src/views/benefit/pubMerchantNumber/index.vue、zhi2-web-admin/src/main.js、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue
- 所属项目：宜兴公共收益；代码基线 none；来源会话 4e3bbb4c-fe08-48ad-bb13-b18a4c24dc15

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_bizstate_filter",
  "source_extraction_id": "1af5f05a76db443a9f62de599737d5e9",
  "version": 1,
  "memory_type": "entities"
}
-->