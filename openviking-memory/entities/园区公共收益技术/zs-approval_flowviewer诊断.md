# zs-approval_flowViewer诊断
园区公共收益项目中 `zs-approval` 组件 `flowViewer` 调用条件与特定角色未触发的诊断结论。

## 关键结论
- `company:companyRegister:approval` 仅控制按钮 `zs-button` 权限校验，不会触发 `flowViewer`
- 特定角色未调 `flowViewer` 通常因：`zs-approval` 未渲染（`bizState != 1`）或 `getKey()` 提前退出（`busCode` 为空或 `dataId` 取不到）

## 调用拦截点
- `flowViewer` 仅在 `zs-approval/index.vue` 的 `getKey()` 中调用
- `getKey()` 前置判断：`if (!this.getId() && !this.id) return;` 以及 `if (!this.$route.meta.busCode) return;`

## 排查提示
- 超级管理员可见按钮且调 `flowViewer`，说明同数据同路由下管理员前置条件满足；特定角色多半是路由 meta 或业务状态不一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：`zs-approval/index.vue`、`OperationBtnGroup/index.vue`、`system/menu/index.vue`、`company/companyRegister/detail.vue`、`mixins/approval.js`
- 所属项目：园区公共收益
- 来源会话：af6dbc70-f0b6-4b96-8516-bdf350b8dbe6

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "zs-approval_flowViewer诊断",
  "source_extraction_id": "b54bc1ccecb74c09a7332b0885a45cc1",
  "version": 1,
  "memory_type": "entities"
}
-->