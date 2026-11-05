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
- 苏服办入口 `token` 仅供人脸识别SDK与登录换票使用，不得作为业务 `Authorization` 请求头
- 请求拦截器（api/index.js）判断：若当前 token 与苏服办 URL token 相同且为苏服办入口，则不添加 `Authorization` 头
- `h5Context.js` 新增 `clearSfbTokenIfStored()`，在苏服办登录前清除误存的苏服办 token
- `usePortal.js` 苏服办入口初始化时先清除误存 token 并始终走 `sfbLogin` 换内部 `accessToken`
- `sfbFaceAuth.js` 人脸识别只使用 URL 中的苏服办 token，不再回退 `userStore.token`
- 后端 `Authorization` 须用 `sfbEncryptionLogin`（`/security/ctAuth/sfbEncryptionLogin`）换取内部token

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：29e8fb63-fada-4c3c-a4c3-485a533bae2f、d5e17de9-b54b-41c7-804d-32a7473aa185（token不进请求头修复）
- 代码基线：7993464
- 涉及文件：index.html、src/utils/sfbFaceAuth.js、src/utils/h5Context.js、src/pages/face/face.vue、src/pages/face/bdc.vue、src/api/security.js、src/api/index.js、src/usePortal.js

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_h5_integration",
  "source_extraction_id": "63dce1141adb41349106ccb0a7746519",
  "version": 2,
  "memory_type": "entities"
}
-->