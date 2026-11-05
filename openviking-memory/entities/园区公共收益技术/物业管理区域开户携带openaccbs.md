# 物业管理区域开户携带openAccBS
园区公共收益项目在物业管理区域开户新增/编辑时，请求体统一携带 openAccBS 字段的技术约定。

## 实现做法
- `maintenance/accountOpen/complex/detail.vue` 中 `form.openAccBS` 默认值由 `undefined` 改为 `'2'`
- `getForm()` 返回对象显式包含 `openAccBS: '2'`
- `form.js` 的 `addRequest()` 与 `editRequest()` 均调用 `getForm()`

## 接口影响
- POST `/maintenance/account` 与 PUT `/maintenance/account` 请求体均含 `openAccBS: "2"`

## 验证与归属
- 所属项目：园区公共收益
- 来源会话：ff5a7c00-ebe9-4246-8cf1-277a6aafbe76

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "物业管理区域开户携带openAccBS",
  "source_extraction_id": "b54bc1ccecb74c09a7332b0885a45cc1",
  "version": 1,
  "memory_type": "entities"
}
-->