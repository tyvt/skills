# 委托代售详情页去除中间空白
苏州市房地产监测V3 修复委托代售详情页查看态「basic-appendix-row」底部大块留白，E2E 用例通过。

## 修复与验证
- 新增 E2E 用例 `e2e/presale/entrust-sale-detail-layout.spec.js`，管理端登录打开详情 `2097970722194419714`（`formMode=view`），调用 `assertEntrustSaleBasicAppendixRowCompact`
- 结果：1 passed — 查看态 `basic-appendix-row--natural-height` 生效，行底相对双栏内容额外高度 < 16px
- 全流程 `entrust-sale-real-api-flow.spec.js` 未跑通（与布局无关）
- 可选环境变量 `E2E_ENTRUST_SALE_ID` 指定其它单据 ID

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：ad333c42-94b0-4a47-b655-77036ecd0e8e
- 涉及文件：e2e/presale/entrust-sale-detail-layout.spec.js、entrust-sale-real-api-flow.spec.js
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_entrust_layout",
  "source_extraction_id": "1c43be6e1763445fbf0f4d5695251802",
  "version": 1,
  "memory_type": "entities"
}
-->