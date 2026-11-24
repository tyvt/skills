# 停车泊位审批按钮的权限显隐链路
产品2.0 的 zhi2-web-admin 停车泊位列表页「审批」按钮由权限字符控制是否渲染，权限显隐与业务禁用是两套独立机制。

## 权限链路
- 按钮定义在 `zhi2-web-admin/src/views/benefit/parkingSpace/index.vue:176-186`，`label: '审批'`，`attrs.permission` 为模板字符串 `` `${this.moduleName}:${this.businessName}:approval` ``
- 同文件 :46-47 定义 `moduleName='benefit'`、`businessName='pubParkingSpaceDetail'`，因此权限字符为 `benefit:pubParkingSpaceDetail:approval`
- 同文件 :7 用 `zs-button` + `v-bind="button.attrs"` 渲染，把 `permission` 作为 prop 传入组件
- `zhi2-web-admin/src/components/zs-button/zs-button.vue:2` 为 `<el-button v-if="checkPermission(permission, buttonName)">`，无权限时 `v-if=false`，按钮直接不渲染（隐藏）

## 校验逻辑
- `zhi2-web-admin/src/utils/permission.js:31-38`：无权限数组时默认放行；有数组则与 `store.getters.permissions` 比对
- 命中 `*:*:*`（超管）或权限列表包含该权限字符才显示，否则隐藏并打印 `[权限不足]` 警告

## 业务禁用
- 该按钮另叠加一层业务禁用（非显隐）：`disabled: isApproveDisabled()`（同文件 :127-131）
- 未勾选记录、或勾选记录的 `bizState` 不全为 `'1'` 时按钮置灰不可点

## 归属与结论
- 「能不能看到」由权限控制，「看到后能不能点」由业务状态控制，两者独立
- 所属项目：产品2.0（zhi2-web-admin）；2026-11-24 首次为只读排查（未改动代码），同日再按禅道 6939 删除该列表「审批」按钮定义与孤儿函数 `isApproveDisabled`，保留审批弹窗/方法待业务逻辑完善后恢复（见 zentao_bug_6939）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_approval_permission",
  "source_extraction_id": "a71d7dc63d8749c498469bcf355b2ab7",
  "version": 2,
  "memory_type": "entities"
}
-->