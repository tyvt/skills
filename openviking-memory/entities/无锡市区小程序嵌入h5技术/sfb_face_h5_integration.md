# 无锡苏服办H5人脸集成落点
无锡苏服办H5的人脸识别通过官方jssdk与sfbFaceAuth/h5Context封装实现，入口token仅限人脸SDK使用，业务Authorization须换内部token。

## 集成架构
- `index.html` 加载官方 `https://www.jszwfw.gov.cn/jmopen/jssdk/index.js`
- `utils/sfbFaceAuth.js` 封装 `callSfbLivenessFaceAuth()` 调起扫脸
- `utils/h5Context.js` 读取缓存URL上的 `token`、`appId`
- `pages/face/face.vue` 业务页对「webview not ready」做重试
- `pages/face/bdc.vue` 人脸成功后跳不动产

## 容器路由
- 官方SDK按UA路由子SDK：hanweb（jmportal+deviceready）、harmony、wechat、alipay等
- 须从苏服办/对应容器入口带 `token`+`appId` 打开H5

## 鉴权分离
- 苏服办入口 `token` 仅供人脸识别SDK使用，不得作为业务 `Authorization`
- 后端 `Authorization` 须用 `sfbEncryptionLogin`（`/security/ctAuth/sfbEncryptionLogin`）换取内部token
- 与「web-view扫脸失败三处根因」互补：本仓实现集中在上述文件

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：29e8fb63-fada-4c3c-a4c3-485a533bae2f
- 代码基线：7993464
- 涉及文件：index.html、src/utils/sfbFaceAuth.js、src/utils/h5Context.js、src/pages/face/face.vue、src/pages/face/bdc.vue、src/api/security.js

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_h5_integration",
  "source_extraction_id": "259ccd137522413f8a275a710d09c982",
  "version": 1,
  "memory_type": "entities"
}
-->