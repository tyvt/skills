# 我的账单页补充缴费退费接入Mock接口
iHomePC 个人中心我的账单页通过 personalCenter.js 新增 Mock 接口完成补充缴费与退费申请。

## 接口变更
- `src/api/modules/personalCenter.js` 新增 `submitRentPayment`、`submitRefundApply` 与 `getRefundContractOptions` 的 Mock 接口，均返回 `code: 200`。

## 页面接入
- `src/views/personalCenter/myBill/index.vue` 接入上述接口，完成补充缴费与退费申请功能。

## 验证与归属
- 验证：来源 cursor 会话 c9107b11-9ae9-4591-b0c3-471f403a194a。
- 涉及文件：`src/api/modules/personalCenter.js`、`src/views/personalCenter/myBill/index.vue`；所属项目：iHomePC；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_mock_api",
  "source_extraction_id": "f1329ecf668e4fb1a4d941a19f455f18",
  "version": 1,
  "memory_type": "entities"
}
-->