# Step2 Data Empty Disable
调用 `POST /estate/totalprice/getCurrentPriceInfo` 返回 `data` 为空时，`step2.vue` 的 `getDetail` 方法执行 `msgWarning('当前维修项目无需审计')` 并 `return`，终止金额与明细加载。

## 约束逻辑
- 禁填逻辑绑定于 `priceRes.data` 假值判断，属前端业务规则约束。

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：src=太仓G/008.md
- 涉及文件：zhi1-web-admin/src/views/repairFunds/usage/fundUsageKs/steps/step2.vue、step2-1.vue、mixin.js、config.js、detail.vue、step3.vue、api/usage/totalPrice.js、api/usage/maintainProject.js
- 所属项目：太仓G；来源会话：4a311fa2-9aff-4019-80bf-ed046a95ab57；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step2_data_disable",
  "source_extraction_id": "753a048e5c3947b4b939168968e98562",
  "version": 1,
  "memory_type": "entities"
}
-->