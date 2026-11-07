# 批量移除res.data.code==200判断
苏住房C 批量移除 `res.data.code == 200` 成功判断及对应 else 分支，依赖 HTTP 拦截器自动 reject。

## 修改范围
- 共修改 10 个 Vue 文件和 2 个 API 文件
- Vue 文件移除 `if (res.data.code == 200)` 及对应 `else` 分支
- API 文件移除 `noReject: true`，让非成功响应走 `.catch()`

## 涉及Vue文件
- house/owner/manual.vue、addHouseContract.vue、addHouse.vue、add.vue
- house/verify.vue
- decision/common/StepChoose.vue、decision/optional/StepChoose.vue
- elect/components/StepChoose.vue、StepChooseGroup.vue、elect/detail.vue

## 涉及API文件
- api/autonomy.js 的 ownerDecision
- api/property.js 的 handleHouseOwner

## 验证与归属
- HTTP 拦截器(`httpInstance.js`)已在 `code != 200` 时自动 `reject` 并弹窗
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：732c8290-b822-4472-af21-d64590d4673f

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "res_code_removed",
  "source_extraction_id": "b9576b83830643c7a838f2b915795c6c",
  "version": 1,
  "memory_type": "entities"
}
-->