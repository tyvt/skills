# 更改实名navigateTo同路由静默失败
昆山市民小程序更改实名人脸成功后用uni.navigateTo跳转同路由致静默失败，已在当前页直接切换模式修复。

## 问题根因
- 更改实名人脸成功后用 `uni.navigateTo` 跳转 `/pages/verifyUser/index?pageType=editUserInfo`
- 当前页已在栈中，小程序禁止 `navigateTo` 同路由，导致跳转静默失败
- 解绑和首次实名不受影响，因分别用 `reLaunch` 跳到其他页面

## 修复方案
- 人脸成功后在当前页直接切 `editUserInfo` 模式
- 更新 `pageType`、清空表单并刷新导航栏标题

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证证据：src=昆山市民/007.md
- 涉及文件：src/pages/verifyUser/index.vue、src/pages/common/useEidVerify.js、src/pages/verifyUser/info.vue、src/api/modules/estate.js
- 所属项目：昆山市民；来源会话ID：bc96deeb-f24b-4f60-a14d-059e81f1caf8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "navigate_edituserinfo_bug",
  "source_extraction_id": "a93b55d09bbe4c6588e6a370b98e3c85",
  "version": 2,
  "memory_type": "entities"
}
-->