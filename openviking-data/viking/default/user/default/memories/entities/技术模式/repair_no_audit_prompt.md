# 维修项目无需审计提示关联页面禁填
太仓G端维修资金用法页面在接口返回空时提示「当前维修项目无需审计」并禁止填数。

## 触发条件
- 调用 `POST /estate/totalprice/getCurrentPriceInfo` 后，若返回体 `data` 为空（`null`/`undefined`/假值）
- 执行 `msgWarning('当前维修项目无需审计')` 并 `return`，不再加载金额、对象明细等

## 涉及文件
- `repairFunds/usage/fundUsageKs/steps/step2.vue`（约270-284行）
- `repairFunds/usage/fundUsageKs/steps/step2-1.vue`（约250-264行）

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 所属项目：太仓G；来源会话：4a311fa2-9aff-4019-80bf-ed046a95ab57；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "repair_no_audit_prompt",
  "source_extraction_id": "dd32723f05a14b2bb4948bdacf39d9ea",
  "version": 1,
  "memory_type": "entities"
}
-->