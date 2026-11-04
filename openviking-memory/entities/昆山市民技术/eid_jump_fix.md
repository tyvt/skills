# 昆山市民EidVerify重复跳转修复
昆山市民 E 证通验证流程曾因 pending 结果被多次处理导致重复跳转，已通过结果去重与轮询收敛修复。

## 问题根因
- `onSuccess` 回调和 `onShow` 里的 `tryConsumePendingResult` 各处理了一次同一条 pending 结果
- `verifyBeforeChange` 分支过早将 `isHandlingResult` 设回 `false`，无法阻挡第二次处理
- `onShow` 中 0ms/800ms/1500ms 三次轮询放大了重复触发

## 修复方案
- `onSuccess` 执行后立即 `takePendingVerifyResult()` 清掉 pending
- 用 `resultId` + `HANDLED_RESULT_KEY` 防止同一结果处理两次
- `onShow` 仅保留一次 600ms 延迟兜底（仅 callback 未执行时）
- 跳转修改页前写入 `ACTIVE_PAGE_TYPE = editUserInfo`
- `onLoad` 优先读 URL 的 `pageType`，避免残留 `verifyBeforeChange`

## 验证与归属
- 验证：会话 3178d4d9 用户要求参数改 key 取 eidToken 并修复重复跳转
- 涉及文件：src/pages/common/useEidVerify.js、src/pages/verifyUser/info.vue、src/pages/verifyUser/index.vue、src/pages/common/useFaceVerify.js、src/pages_vote/vote/faceSuccess.vue
- 所属项目：昆山市民；来源会话ID：3178d4d9-97a5-4520-8ff8-c7b1235a110f

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "eid_jump_fix",
  "source_extraction_id": "c534b7c594854b9089e2fda834ef7f9b",
  "version": 1,
  "memory_type": "entities"
}
-->