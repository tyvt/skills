# detail.vue校验规则固化于data
`detail.vue` 将 `verifyRules` 置于 `data()` 导致 `required` 在组件创建时固化，接口返回后 `watch` 更新 `indicatorData` 但规则不重算。

## 现象
- `verifyRules` 放在 `data()`，`required` 在组件创建时固化
- 接口返回后 `watch` 更新 `indicatorData`，但校验规则不重算
- 初始 `indicatorData` 为 `{ itemList: [], topScore: undefined }`，`inputType` 为 `undefined`
- `undefined != '3'` 与 `this.verifyForm.verifiedType == '1'` 均为 true，使 `required` 被算成 true 并固化在内存
- `watch` 后续将 `indicatorData` 更新为 `inputType === '3'`，但 Element UI 仍按「申报选项必填」校验
- 同文件主表单 `rules` 用 `computed`，可随 `inputType` 动态重算，不受影响

## 根因
- `data()` 在组件初始化时一次性求值，后续依赖变化不触发规则重算

## 解决方案
- 将校验规则改放 `computed` 以响应 `inputType` 变化，实现动态重算

## 关联信息
- 验证证据：extracted source=cursor project=G
- 涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\views\evaluation\creditDeclarationComponents\detail.vue
- 来源会话：2509c8e6-b8b1-456b-9e5e-3b3d52ade90b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_verifyrules_computed",
  "source_extraction_id": "c236da9a3df445bb9d98b7def057c10b",
  "version": 2,
  "memory_type": "entities"
}
-->