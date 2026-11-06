# 管理员管理启用状态开关垂直居中修复
修复了苏州市房地产监测V3中管理员管理详情页「启用状态」开关在栅格行内未垂直居中的问题。

## Description
- 现象：管理员管理详情页「启用状态」开关在栅格行内未垂直居中，与左侧「管理员等级/类型」等控件不在同一水平线。
- 根因：全局 `el-form-item__content` 为对齐输入框设置 `min-height: 38px`，但 `el-switch` 高度更小且未在内容区居中；Headline 内 `section-form` 在 label-top 下把内容区 `min-height` 压成 0；栅格默认 `align-items: stretch` 让矮字段贴底。

## Solution
- `detail-form.scss`：`section-form` 使用 `align-items: start`；含 `el-switch` 的表单项内容区设为 `display: flex; align-items: center; min-height: 38px`（含 label-top 更高优先级覆盖）。
- `element-ui.scss`：内容区仅含开关时同样 flex 垂直居中。

## Verification
- 验证方式：刷新页面查看「启用状态」是否与左侧控件在同一水平线；若有偏差需说明开发企业或经纪机构端以对 `label-position`。
- 涉及文件：zhi2-web-admin/src/views/company/companyAdmin/detail.vue、zhi2-web-admin/src/views/benefit/pubVoucherTemplate/detail.vue。
- 所属项目：苏州市房地产监测V3；来源会话ID：36544904-a945-436e-bd9e-7077b15c8ffc。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_switch_center",
  "source_extraction_id": "23d2035267364d4a8767fdb7aec62216",
  "version": 1,
  "memory_type": "entities"
}
-->