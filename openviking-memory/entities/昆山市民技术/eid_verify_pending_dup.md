# 昆山市民E证通实名变更重复消费pending
实名信息变更流程中 `onSuccess` 与 `onShow` 各处理一次同一 pending，叠加过早重置导致卡在修改页，需防重并修正回跳逻辑。

## 问题根因
- 内部录入页 → E证通（`useEidVerify`，回跳参数 key 取 `eidToken`）→ 回业务页 → 应 `redirectTo` 实名信息页而非停在 `editUserInfo`。
- `onSuccess` 与 `onShow` 内 `tryConsumePendingResult` 各处理一次同一 pending。
- `verifyBeforeChange` 过早重置 `isHandlingResult`，叠加 onShow 多次轮询放大重复跳转。

## 解决方案
- `onSuccess` 后立即 `takePendingVerifyResult()`；用 `resultId` + `HANDLED_RESULT_KEY` 防重；onShow 仅保留一次 600ms 兜底。
- 跳转修改页前写 `ACTIVE_PAGE_TYPE=editUserInfo`；`onLoad` 优先读 URL `pageType`。
- 调试搜 `[EidVerify]`、`[VerifyUser]` 日志。

## 验证与归属
- 验证：会话 3178d4d9 faceRecognition 已成功仍停留在修改实名信息页，列出重复跳转三点根因与防重修复。
- 涉及文件：src/pages/common/useEidVerify.js、src/pages/verifyUser/index.vue、src/pages/verifyUser/info.vue、src/pages/common/useFaceVerify.js。
- 所属项目：昆山市民；代码基线：827c0d4；来源会话ID：3178d4d9-97a5-4520-8ff8-c7b1235a110f。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "eid_verify_pending_dup",
  "source_extraction_id": "c532054893f54bbe98ba7697d2d3b474",
  "version": 1,
  "memory_type": "entities"
}
-->