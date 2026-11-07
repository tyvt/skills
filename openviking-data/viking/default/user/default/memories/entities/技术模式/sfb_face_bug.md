# H5 苏服办 SDK 扫脸在 web-view 失败
苏住房C 移动端 H5 包进苏服办小程序 web-view 后，微信/支付宝端人脸识别失败的三处根因。

## 问题现象
- 苏服办内扫脸正常，微信内报 script error/人脸识别测试失败，支付宝内点击无反应
- H5 被包进苏服办官方小程序（微信端/支付宝端）的 web-view 打开

## 根因分析
- 苏服办把扫脸凭证放页面地址 index.html?token=（hash 前），App.vue 只读 hash 里的 ?token= 导致微信凭证未被识别
- loginWithSfbTicket 登录后若后端无 sfbToken 会用空串覆盖 localStorage.tokenjssdk，清掉 SDK 写入的正确值
- 扫脸凭证取值优先用登录接口返回的空值而非 URL 里的；支付宝无 URL token 只能靠 getTicket 换，my.onMessage 未绑定则无反应

## 解决方案
- 启动 initSfbTokenFromPageUrl() 读页面级 ?token= 写入 sfbToken + tokenjssdk
- 凭证获取收敛为 ensureFaceCertifyToken()：URL token → SDK 缓存 → store → ticket 登录
- loginWithSfbTicket 禁止空值覆盖已有苏服办 token；App.vue 区分页面 ?token=（苏服办）与 hash ?token=（业务 accessToken）
- 支付宝端恢复 my.onMessage 桥接；不按环境分支处理，差异只在凭证来源

## 验证与归属
- 涉及文件：src/hooks/useFaceVerify.js、src/pages/common/face.vue、src/pages/index/my.vue、src/pages/index/components/My_Suzhufang.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 618cde10；代码基线 77666f8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_face_bug",
  "source_extraction_id": "81d0452c856b49acb88f4e24cefb5ea2",
  "version": 1,
  "memory_type": "entities"
}
-->