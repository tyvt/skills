# 待办跳转未兼容detailId致缺主键误跳转
待办跳转未兼容 detailId 字段且缺参时未拦截错误跳转，导致缺主键误跳转。

## 问题根因
- 待办跳转未兼容 detailId 字段
- 缺参时未拦截错误跳转，导致误跳转

## 修复方案
- 在 zhi2-web-admin/src/utils/ruoyi.js 中以 dataId ?? detailId 提取主键
- 缺参返回 { missingId: true } 阻止跳转

## 验证与归属
- 验证证据：src=苏住房G/035.md
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js、src/views/flowable/todo.vue、src/store/modules/permission.js、src/router/index.js、src/views/institution/record/detail.vue、src/mixins/approval.js、src/components/zs-approval/ApprovalProcessDialog.vue、src/components/ApprovalProcess/index.vue
- 所属项目：苏住房G；来源会话ID：e352315b-e61c-4698-bab4-d2f7fd6e18b3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "todo_detailid_bug",
  "source_extraction_id": "a81b0be46c114c94bdf5b0efa2e5f31f",
  "version": 1,
  "memory_type": "entities"
}
-->