# 租赁合同备案前端对接文档对齐
苏州市房地产监测V3 按《租赁合同备案-前端对接文档》对齐租赁合同前端逻辑。

## 产权核验
- 提交字段改为 `administrativeArea`（字典 `ECONOMIC_INSTITUTIONS_REGION`），不再传 RD 系列 `regionCode`
- 下拉排除筛选项「全部」（`dictValue = 0`）
- 园区证号图示仍按工业园区（字典值 `9`）切换

## 列表与详情
- 行政区域优先用 `administrativeArea` + 字典渲染；无该字段时仍用 `regionCode` 兜底
- 租赁信息：`月租金` 仅传 `monthlyRent`（不传 `contractAmount`）

## 出租人/承租人子表
- 列表与证件展示读取 `lessorType` / `lesseeType`（兼容旧 `partyType`）
- 保存时只传接口字段，去掉多余 `partyType`

## 常量与联调
- `leaseContractConstants.js`：补充行政区域字典、园区常量、`filterAdministrativeAreaOptions`
- E2E mock / 断言改为校验 `administrativeArea: '9'`（园区）等

## 验证与归属
- 涉及文件：`leaseContractConstants.js`、`PropertyVerifyDialog.vue`、`index.vue`、`detail.vue`、`PartyTable.vue`、`PartyDialog.vue`、`lease-contract-mocks.js`、`lease-contract-real-api-flow.spec.js` 及对接文档
- 所属项目：苏州市房地产监测V3；来源会话ID：6631c584-2e4d-4124-840c-3e4918698ae7；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_contract_doc_align",
  "source_extraction_id": "6a00dea484364694864f56aa0b0b9ba2",
  "version": 1,
  "memory_type": "entities"
}
-->