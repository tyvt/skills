# 从业人员注销弹窗改用公共组件
苏州市房地产监测V3 修复从业人员列表注销弹窗留白大且不符场景的问题，新增专用 `CancelDialog.vue` 替代通用 `StatusAdjustDialog`。

## 改动说明
- 新增 `CancelDialog.vue`（从业人员专用注销弹窗），对齐分支机构 `CancelDialog` 与模块内弹窗规范：`zs-dialog` + `form-box` 包裹，`zs-form`/`zs-form-item`/`zs-textarea` 等公共组件，`label-width="110px"`、`label-position="right"`，底部 `dialog-footer`
- 弹窗标题改为「从业人员注销」，仅保留「注销原因」（必填，最多500字），备案绑定经纪人时仍展示替代人员选择与提示
- 更新 `AgencyPersonnelList.vue`：注销按钮改为打开 `CancelDialog`
- 删除不再使用的 `StatusAdjustDialog.vue`

## 预期效果
- 注销弹窗只展示必要字段，空白区域明显减少，交互与分支机构注销弹窗保持一致

## 涉及文件与归属
- 涉及：`CancelDialog.vue`、`AgencyPersonnelList.vue`、`StatusAdjustDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：4f0d7fda-2a90-4a60-8c51-710beac49303；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_cancel_dialog",
  "source_extraction_id": "8ee8ad2a783a42efa0955c2b001cebc4",
  "version": 1,
  "memory_type": "entities"
}
-->