# 小程序门户代码最小化精简
在不改动任何业务逻辑的前提下，对 home.vue 与 externalWebview.vue 等相关文件做了最小化代码精简，净减少约 25 行。

## 精简内容
- 去掉薄包装方法 `goLogin()`，由 `onGateConfirm` 直接调用 `startLoginFlow()`
- 去掉 `closeLingXiResultModal()`，模板内联 `showLingXiResultModal = false`
- 去掉 `persistPortalUserSnapshot()`，各处直接调用 `writePortalSnapshot(this.portalUser)`
- 去掉 `mergeLingXiHouseIntoPortal()`，调用处直接写两行合并逻辑

## 小幅简化
- `displayComplexName` 用三元表达式合并分支
- `startLoginFlow` 用已有的 `isPortalVerified()` 替代重复的实名判断
- 删除未使用的 `formatDateYmd` 方法

## 注释与验证
- 合并 `promptPortalRealNameAuth` 上重复注释，删除跨文件自引用注释
- 未改动模板结构、样式和任何分支判断
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：b300def8-6c07-409d-ac21-89114d486c21；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=小程序


<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_code_simplify",
  "source_extraction_id": "acfa3d29203d49719c288b371914a6bf",
  "version": 1,
  "memory_type": "entities"
}
-->
