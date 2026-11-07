# 家园区一网通办 H5/小程序
家园区一网通办前端 H5/小程序仓库，处理一网通办授权登录回调。

## 登录流程
- App.vue 的 onLaunch 从 window.location.href 用正则 /token=([^&#]+)/ 取 token，取不到存 null 到 urlToken
- login.vue 的 getToken() 读 urlToken，有则调后端 ywtbLogin（接口 /version/1/app/ywtb/login）
- 无 token 且非开发环境时，login.vue 静默卡在「正在登录...」不跳转

## 关键事实
- 本仓库全仓无 retcode 相关代码与「一网通办retcode状态码为null」文案
- retcode 为空提示来自外层宿主容器/一网通办授权桥接 SDK，非本地 H5 渲染
- 上游授权回跳未带有效 retcode 会导致 H5 拿不到 token 而登录空转

## 涉及文件
- src/App.vue
- src/pages/login.vue

## 归属
- 所属项目：家园区一网通办；来源会话：2026-11-05 调试登录报错

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "category": "家园区技术",
  "name": "jiayuanqu_ywtb_h5",
  "source_extraction_id": "e6c158a1e7b14728a599573a9cd515c9",
  "version": 1,
  "memory_type": "entities"
}
-->