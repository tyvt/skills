# 字典全量接口切换
苏住房G 项目将字典全量查询由分页接口切换为按类型全量接口。

## 修改内容
- 仅修改 dict.js 中 `getDictsIncludeDisabled`
- 请求由 `/system/dictData/list` 分页接口改为 `/system/dictData/listByType/{dictType}?isAll=1`
- 响应数据由 `res.rows` 改为 `res.data`
- 缓存 key 仍为 `${dictType}_all`，与 `getDicts` 互不冲突

## 验证结果
- 代码库中已无 `/system/dictData/list` 调用
- 使用方示例：staffManagement/components/index.vue

## 验证与归属
- 涉及文件：dict.js、staffManagement/components/index.vue、companyListQuery.js
- 所属项目：苏住房G；来源会话ID：58dcbdff-1362-4418-9b41-bd4b7e15dd6c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_full_api_switch",
  "source_extraction_id": "9d36e0008f33493084394e9c26960c81",
  "version": 1,
  "memory_type": "entities"
}
-->