# detail.vue校验规则固化于data
`detail.vue` 将 `verifyRules` 置于 `data()` 导致 `required` 在组件创建时固化，接口返回后 `watch` 更新 `indicatorData` 但规则不重算。

## 现象
- `verifyRules` 放在 `data()`，`required` 在组件创建时固化
- 接口返回后 `watch` 更新 `indicatorData`，但校验规则不重算

## 根因
- `data()` 在组件初始化时一次性求值，后续依赖变化不触发规则重算

## 解决方案
- 将校验规则改放 `computed` 以响应 `inputType` 变化，实现动态重算

## 关联信息
- 验证证据：src=G/003.md
- 涉及文件：detail.vue
- 来源会话：2509c8e6-b8b1-456b-9e5e-3b3d52ade90b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_verifyrules_computed",
  "source_extraction_id": "926112b8f1dd4580a35269f495566a01",
  "version": 1,
  "memory_type": "entities"
}
-->