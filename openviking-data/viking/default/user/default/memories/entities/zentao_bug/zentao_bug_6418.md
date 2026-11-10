# 禅道 Bug 6418
禅道缺陷 6418：test 构建开启 VITE_UI_REF8443=true 导致历史/汛前填报/详情/求援整页被静态演示数据替换，提交不进真实列表、筛选数字不随列表变化。

## Description
- 现象对得上静态演示页，并非接口未返回数据。
- `Ref8443History.vue` 写死文案：「全部工单 (14)」「已提交归档 (12)」及两张固定卡片（待提交、已提交）。
- test 构建开 `VITE_UI_REF8443=true`，历史、汛前填报、详情、求援整页被替换成演示数据。

## Fix
- `.env.test` 中 `VITE_UI_REF8443` 改为 `false`。
- `isRef8443()` 在 `VITE_DATA_MODE=remote` 时固定返回 false，避免远程模式被静态页盖住。

## Verification
- `npm run test`：34 个单测通过，`uni build -m test` 完成。
- 产物里 `VITE_UI_REF8443` 为 `"false"`，`isRef8443` 收成恒 false，包内已无「全部工单 (14)」。

## Status
- 代码已改完，测试构建已重新打出（截至 2026-11-10 会话）。
- 未提交，未回写禅道。
- 待验证账号 601117997：汛前检查提交后进历史记录数量应与实际工单一致，已提交归档不再出现演示用待提交卡片。
- 提交并回写禅道需用户告知。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6418",
  "source_extraction_id": "bf4a5c4178e34964ad92192b2549ccbb",
  "version": 1,
  "memory_type": "entities"
}
-->