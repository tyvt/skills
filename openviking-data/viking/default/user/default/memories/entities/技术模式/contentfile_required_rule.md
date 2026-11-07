# 文件内容校验未置必填致星号缺失
园区公共收益项目(zhi2-web-admin)中 detail.vue 的 contentFile 校验规则缺少 required: true，导致 Element UI 不渲染红色 * 必填标识。

## 问题根因
- detail.vue 的 contentFile 校验规则未设置 required: true，Element UI 不渲染红色 * 标识必填

## 解决方案
- 在 contentFile 校验规则中增加 required: true，使 Element UI 渲染红色 * 标识必填
- 自定义 validator 与提交前逻辑保持不变

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/regulation/record/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-form/zs-form.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/regulation/change/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/regulation/components/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/regulation/record/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：src=园区公共收益/031.md
- 来源会话ID：2de21899-9a42-4931-969d-24b90830bfad；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contentfile_required_rule",
  "source_extraction_id": "54321c7594a74859a7337318f84f2255",
  "version": 1,
  "memory_type": "entities"
}
-->