# 用户管理新增保存后返回逻辑修复
产品2.0 用户管理新增保存后点返回退到新增页而非列表页，因返回逻辑使用 history.go(-1)。

## 问题原因
- 新增保存后 `changeFormState` 从 `/system/user/add` 跳转到 `/system/user/{id}`（详情页）
- 浏览器历史：列表页 → 新增页 → 详情页
- `OperationBtnGroup` 的「返回」用 `$router.go(-1)` 只退到新增页

## 修复要点
- 返回逻辑与全局 `goBack` 对齐：去掉当前路径最后一段回到父路径（如 `/system/user/123` → `/system/user`）
- 修改 `OperationBtnGroup/index.vue`

## 涉及文件
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/views/system/user/detail.vue
- zhi2-web-admin/src/mixins/formComponents.js
- zhi2-web-admin/src/mixins/detailMixins.js
- zhi2-web-admin/src/main.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：65432183-de0d-46d6-bd78-1b5f9fc846c8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_add_goback_fix",
  "source_extraction_id": "3f14e79c13954057ad98487b06daa383",
  "version": 1,
  "memory_type": "entities"
}
-->