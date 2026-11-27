---
audit_status: valid
last_checked: 2026-11-27T22:42:29+08:00
verdict_note: busCode 动态解析偏好，无可证伪的具体代码主张
---
- 在调查变更模块（`surveyChange`）中，`busCode` 应动态地从菜单路由的 `meta` 或 `filePath` 中解析，消除硬编码常量。
- 移除 `surveyChangeConstants.js` 中的常量。
- `detail.vue` 和 `ApprovalDialog.vue` 分别通过计算属性 `surveyChangeBusCode` 和 prop `busCode` 传递 `busCode`。
- 如果菜单未配置 `busCode`，应提示检查配置。


<!-- MEMORY_FIELDS
{
  "version": 1
}
-->