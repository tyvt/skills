# Portal Broker Branch
机构档案列在 BrokerPages 的分支列表中显示为空白。

## 描述
- 档案列的 Slot 仅在 `state==='list' && kind==='agencies'` 时渲染；在 `view=stores` 时条件不满足。
- 修复后，在分支列表和 `isBrokerList` 中也显示基本信息，并调用 `openRecord`。

## 文件
- `BrokerPages.vue`, `RentalPages.vue`, `UnifiedLogin.vue`, `mock/brokers.js`, `tests/e2e/public-portal-interactions.spec.ts`

## 验证
- 源会话: `01c99a3c-2693-474a-bcc9-5c73f2538cbe`

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：01c99a3c-2693-474a-bcc9-5c73f2538cbe


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_broker_branch",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->
