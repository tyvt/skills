# 已备案数据详情页变更按钮缺失（router.replace 复用组件）
苏州市房地产监测V3 中已备案数据详情页「发起变更」按钮缺失，根因为 router.replace 同一路径仅变 query 时 Vue Router 复用组件，但 watch 未触发导致组件实例消失（页面白屏/未挂载）。

## 问题根因
- router.replace 同一路径只变 query 时 Vue Router 复用组件实例，页面 watch 未监听 query 变化，组件未重新挂载/白屏
- 已备案数据详情页「发起变更」按钮因此消失

## 解决方案
- 改用 changeFormState 的 push 机制替代 router.replace，确保组件随状态正确响应

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：toB/personnelRecord/components/detail.vue、src/views/company/staffManagement/components/detail.vue、src/components/zs-button/zs-button.vue、src/utils/permission.js、src/store/modules/user.js（res.permissions）
- 所属项目：苏州市房地产监测V3；来源会话：session_bfd35c0390159714bb4edd3c876c153a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_replace_watch",
  "source_extraction_id": "b18177727e884bf08b33fa82839cc86b",
  "version": 1,
  "memory_type": "entities"
}
-->