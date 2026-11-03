# 苏服办/支付宝H5扫脸拉不起：容器人脸上下文缺失
无锡市区H5嵌在苏服办/支付宝WebView，生产未改代码也突然无法拉起人脸识别，相同token重登容器后可识别。

## 问题根因
- 支付宝/苏服办登录时除下发token外，还在容器内部建立人脸识别所需认证上下文，该状态不出现在URL里
- 清缓存会销毁容器内人脸认证上下文，重新登录会重建
- 业务token仍可复用，URL参数与H5 Storage不是根因，不能统一提示为「token失效」

## 验证与定位
- 用「相同URL+相同token→清缓存失败/重登成功」向业务方证明问题在宿主容器会话
- 分别验证「只重登苏服办」「只重登支付宝」「仅杀进程不重登」以定位层级
- 会话e195dccb：宿主H5 location跳转、此前可扫脸且做过支付宝与苏服办返回值兼容；最终结论token可复用

## 解决方案
- 用户提示改为「人脸识别环境未就绪，请重新登录苏服办后从业务入口进入」
- 与支付宝/苏服办扫脸成功返回值不一致的兼容逻辑单独回归
- 避免将容器状态问题误判为业务代码回归

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue、src/utils/h5Context.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：e195dccb-9f1b-45aa-92cf-65961851f833；代码基线：7993464

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "sfb_face_container_bug",
  "source_extraction_id": "2ecfaf2eb90d45a1a96af78198fcde16",
  "version": 1,
  "memory_type": "entities"
}
-->