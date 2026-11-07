- 通过回调参数 `portalPostAction=ownerDecisionVote` 区分「绑定房屋」与「进入业主决策」，选屋成功后自动走现有投票 H5 逻辑
- 第三方选屋 `backUrl`（H5 `pages/index/home`）增加可选参数：`portalPostAction=ownerDecisionVote` 为业主决策选屋回调；不传则保持原绑定房屋逻辑
- 链路：`bdc.vue` → `verify.vue` → `home.vue` 的 `queryParams.portalPostAction`
- 点击「业主决策」：已登录+已实名+已有房屋→直接 `openOwnerDecisionVoteH5()`；无房屋→跳转灵犀选屋(`bdc`)带 `portalPostAction=ownerDecisionVote`；未实名→先 `verify` 再把 `portalPostAction` 传到 `bdc`
- 从门户「绑定房屋」入口进入时会清空 `pendingPortalPostAction`，避免误触发业主决策
- 所属项目：小程序；来源会话：3a9cefa7-d876-4dcb-bc47-8944def53bc0；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=小程序


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "业主决策回调portalPostAction参数区分",
  "source_extraction_id": "319ceeb1dbb643c898b8a5bab118bd5f",
  "version": 1,
  "memory_type": "preferences"
}
-->
