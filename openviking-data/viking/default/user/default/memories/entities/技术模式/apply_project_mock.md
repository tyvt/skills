---
audit_status: valid
last_checked: 2026-11-26T15:21:24+08:00
verdict_note: 属实：泰兴小程序 maintainProject.js 有 fetchApplyPage/fetchProjectPage/setSelectedAccount，apply.vue/project.vue 对接，mock 分页成立。
---
# 维修申请与维修项目页对接
泰兴小程序维修申请页与维修项目页已完整接上，包含 `z-paging`、mock 数据与 store 业务逻辑。

## store 改动
- `maintainProject.js` 新增维修申请/维修项目 mock 分页接口：`fetchApplyPage(pageNum, pageSize, accountId)`、`fetchProjectPage(pageNum, pageSize, accountId)`。
- 新增 `selectedAccount` 与 `setSelectedAccount(account)`，用于从列表页传递上下文。
- 保留原有 `fetchAccountPage`，统一分页/延时 mock 逻辑。

## 页面实现
- `apply.vue`：使用 `z-paging` + `v-model="maintainProjectStore.applyList"`，展示 `维修对象类别`、`维修对象名称`，支持按 `accountId` 过滤。
- `project.vue`：使用 `z-paging` 对接设计稿。
- 页面注册与跳转修改：`pages.js` 已完成相关页面注册和跳转调整。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`maintainProject.js`、`apply.vue`、`project.vue`、`pages.js`。
- 来源会话ID：3248cc3b-b003-4b89-a084-3b8ffc0182ee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apply_project_mock",
  "source_extraction_id": "886227d69a4c4d8ea47f9fd200dcd0da",
  "version": 2,
  "memory_type": "entities"
}
-->