# 存量房页面未置 searchFlag 致结果区不渲染
存量房页面 `stockHouseContract.vue` 接口报错时未置 `searchFlag` 为 true，导致查询结果区域不渲染。

## 问题根因
- `stockHouseContract.vue` 接口报错时未设置 `searchFlag=true`
- 查询结果区域依赖 `searchFlag` 渲染，故不渲染

## 解决方案
- 参考 `houseNewContract.vue` 增加 `.catch()` 处理并设置 `searchFlag=true`
- 兼容 `res.data` 为对象、数组或空值

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=cursor session=e5a11fd1-77fb-4778-8bf6-a4cb438ff07d
- 涉及文件：stockHouseContract.vue、houseNewContract.vue、transaction.js、houseNewContractDetail.vue、stockHouseContractDetail.vue、myContract.vue、contractCard.vue、out.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：e5a11fd1-77fb-4778-8bf6-a4cb438ff07d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stockhouse_searchflag_missing",
  "source_extraction_id": "3a59079b73a04c218cfc0817a391dccd",
  "version": 1,
  "memory_type": "entities"
}
-->