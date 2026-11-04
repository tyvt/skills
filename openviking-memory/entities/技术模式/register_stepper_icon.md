# 注册步骤使用完成图标
`RegisterStepper/index.vue` 按 `completeIcon` → `currentIcon` → `pendingIcon` 的顺序加载已完成状态图标，移除了带蓝色背景的 `el-icon-check`。

## 行为
- 已完成状态使用 `completeIcon`，回退到 `currentIcon`，然后 `pendingIcon`。
- 带 `el-icon-check` 的蓝色背景已被移除。

## 样式维护
- 如果出现样式异常，请替换 `public/assets/images/register-step/` 中的 PNG，不要修改组件逻辑。

## 相关文件
- `components/RegisterStepper/index.vue`
- `views/register/companyRegister.vue`
- `views/institutionRegister/index.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_stepper_icon",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "entities"
}
-->