# 签订按钮合同主键未传递修复
苏州市房地产监测V3 修复预售合同「签订」按钮未正确传递新建合同主键的问题。

## 修改内容
- contractRequest.js 新增 `unwrapCreatedId()`，统一从 v3 响应 `data` 或 `id` 字段取新建主键
- chooseHouseDialog.vue 的 `submit()`：改用 `unwrapCreatedId(saveRes)` 读取 `data: "1"`，不再用 `const { id } = await saveContract(...)`
- 主键为空时提示「创建合同失败，未返回合同主键」并中断
- saveContract 请求体增加 `contractNo: this.contractNo`
- `handleSubmit()` 增加合同范本校验：未选择时提示「请选择合同范本」

## 涉及文件
- zhi2-web-admin/src/views/contract/utils/contractRequest.js
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：2f167a0c-4e6a-4493-a802-ed1e537f2f6a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_primary_key_fix",
  "source_extraction_id": "b7b0aa0fe086415bb2597677d3dc2469",
  "version": 1,
  "memory_type": "entities"
}
-->