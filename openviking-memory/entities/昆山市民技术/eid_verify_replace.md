# 腾讯云E证通替换原生人脸核身流程
昆山市民为替换 uni.startFacialRecognitionVerify 原生人脸流程，接入腾讯云 E 证通（mp_ecard_sdk）并完成核身逻辑封装。

## 接入方式
- `pages.json` 注册 `mp_ecard_sdk/index/index` 并改原生页为 `index.vue`
- `App.vue` 的 `onLaunch` 调 `initEid()`，`onShow` 排除 `wx0e2cb0b052a91c92` 返回场景避免冲突

## 核身逻辑
- 封装于 `src/pages/common/useEidVerify.js`
- 通过 `src/api/modules/estate.js` 的 `getEidToken` 与 `faceRecognition` 完成凭证获取及校验

## 验证与归属
- 验证证据：src=cursor session=557ceece-0aee-4751-ad10-916eb7fccb30
- 所属项目：昆山市民；代码基线：none
- 涉及文件：src/pages.json、src/App.vue、src/pages/common/useFaceVerify.js、src/pages/verifyUser/index.vue、src/pages/verifyUser/info.vue、src/mp_ecard_sdk/main.js、src/api/modules/estate.js、src/pages_vote/vote/faceError.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "eid_verify_replace",
  "source_extraction_id": "d2d502880c35424ea5806bfda71a4a91",
  "version": 1,
  "memory_type": "entities"
}
-->