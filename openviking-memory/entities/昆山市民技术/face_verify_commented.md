# 人脸核身仅实名认证生效投票核验已注释
昆山市民微信小程序人脸核身仅在实名认证链路生效，投票核验的苏政通原生桥接代码已注释未实际调用。

## 实名认证链路
- 微信小程序实名认证调用 `uni.startFacialRecognitionVerify`
- 后端接口 `/estate/weChatOauth/faceRecognition`
- 入口页面 `pages/verifyUser/verifyUser/index.vue`

## 投票核验状态
- 投票核验 `useFaceVerify` 原生桥接苏政通拍照代码已注释
- 该原生人脸核身代码未实际调用

## 验证与归属
- 验证证据：src=cursor session=cbf090fd-dbf7-4699-9af7-6c33b203af19
- 所属项目：昆山市民；代码基线：none
- 涉及文件：src/pages/verifyUser/index.vue、src/pages/verifyUser/info.vue、src/pages_vote/vote/faceSuccess.vue、src/pages_vote/vote/vote_confirm.vue、src/pages_vote/vote/affirm.vue、src/pages_election/election/confirmElection.vue、README.md、src/pages_home/home.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "face_verify_commented",
  "source_extraction_id": "d2d502880c35424ea5806bfda71a4a91",
  "version": 1,
  "memory_type": "entities"
}
-->