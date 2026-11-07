# 人工添加页complexId缺失报错修复
苏住房C小程序「人工添加」页面(register.vue)提交时因未传complexId导致后端报“物业管理区域权限不能为空”，已修复。

## 问题原因
- 调用 `ctUserIdentityApply` 接口时未传 `complexId`，后端校验失败
- `complexId` 应在用户从小区认证页(project/auth.vue)进入添加房屋流程时写入 `useHouseStore`

## 修改内容
- 在 `register.vue` 提交参数中补充 `complexId: useHouseStore.complexId`
- 取值与同流程的 `addHouse.vue`、`addHouseContract.vue` 一致
- 提交参数还包含 `identityPhoto`、`certificatePhoto` 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：75b9fd04-a06e-4dd9-a25b-46eb96b4328a
- 涉及文件：`src/pages_owner/house/owner/register.vue` 等
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "register_complexid_fix",
  "source_extraction_id": "4a5cd770e47e42c0a4dc5f927600c595",
  "version": 1,
  "memory_type": "entities"
}
-->