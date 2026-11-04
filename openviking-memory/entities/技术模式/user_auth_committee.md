# 组织名称字段集成到用户授权列表查询
根本原因：后端的组织名称字段 `committeeName` 未连接到前端。关键修复：`autonomy/userAuth/index.vue` 的 `queryParams` 和 `formItems` 增加了对 `committeeName` 的支持以进行模糊搜索，且 `columns` 新增了映射该字段的“组织名称”列。

## 验证证据
- 来源提取自 cursor 会话 a64c833f-c485-4bfe-899a-5d177a83f9f3

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/userAuth/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/userAuth/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/change/industry/index.vue
- autonomy/userAuth/index.vue

## 归属
- 所属项目: 园区物管2.0
- 来源会话: a64c833f-c485-4bfe-899a-5d177a83f9f3
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_auth_committee",
  "source_extraction_id": "7450b259a3f74eb1a01721b1303c3886",
  "version": 3,
  "memory_type": "entities"
}
-->