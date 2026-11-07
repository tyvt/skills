# 人工核验证件信息快照修复
苏住房C小程序人工核验页（FormManual.vue）在提交时因 store 被清空导致证件信息丢失，已通过 onLoad 快照修复。

## 问题根因
- 原实现在提交时（checkRepeatRealName、manualAuditRealName）直接读取 userStore 的证件信息
- 上传照片期间 App.onShow → getUserInfo 会清空临时数据，导致提交请求体为空
- 无兜底校验，可能发出空请求

## 修复内容
- FormManual.vue 新增 verifyInfo，在 onLoad 中从 userStore 读取 idType、idNumber、username、nationality、oldIdNumber 并保存
- 提交函数改为使用 verifyInfo.*，不再提交时读 store
- 快照为空时提示「证件信息缺失，请返回上一步重新填写」
- 兼容非本地证件（FormNonLocal→humanReview→FormManual）与本地身份证（FormLocal）流程

## 涉及文件与归属
- 涉及文件：pages_my/verification/FormManual.vue、api/security.js、pages_my/verification/FormLocal.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：fe7db194-e3eb-4ff2-81a5-4fc5d0da76f3；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "form_snapshot_fix",
  "source_extraction_id": "642aa7d9ea214737a67f2ff39ac74aef",
  "version": 1,
  "memory_type": "entities"
}
-->
