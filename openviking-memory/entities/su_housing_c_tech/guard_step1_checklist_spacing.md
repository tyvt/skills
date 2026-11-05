# guard申请页电梯选项间距修复
苏住房C小程序 `pages_guard/guardApply/components/step1.vue` 为「是否有电梯」是/否选项增加间距。

## 问题原因
- 全局样式 `uni.scss` 将 `.checklist-box` 的 `margin-right` 设为 `0 !important`
- 原先用的 `gap: 32rpx` 在小程序里可能不生效，导致两个选项贴在一起

## 修复内容
- 在 `step1.vue` 中为非最后一项选项设置 `margin-right: 32rpx !important`
- 代码：`:deep(.uni-data-checklist .checklist-group .checklist-box:not(:last-child)){ margin-right: 32rpx !important; }`
- 说明：`index.vue` 仅为步骤容器，实际渲染在 `step1.vue`

## 验证与归属
- 刷新小程序后可见选项间距
- 涉及文件：`step1.vue`、`uni.scss`
- 所属项目：苏住房C；来源会话ID：f19a79a2-7549-477c-9068-dfc6f1414d26；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "guard_step1_checklist_spacing",
  "source_extraction_id": "68876c8622ce424a85240de90cbdd4c6",
  "version": 1,
  "memory_type": "entities"
}
-->