# 苏服办certify_token识别与登录修复
在个人中心加入人脸识别测试入口时，修复苏服办小程序传入 token 未被正确识别的问题。

## 关键信息
- 微信打开地址 index.html?token=...（在 hash 之前）是苏服办传入的 certify_token，专用于扫脸，不是苏住房业务 accessToken

## 之前代码问题
- App.vue 只读 hash 里的 token，读不到 index.html?token=，微信带的苏服办 token 从未被正确识别
- loginWithSfbTicket 登录后若后端没返回 sfbToken，会用空字符串覆盖 localStorage.tokenjssdk，清掉 SDK 从 URL 写入的正确 token
- 扫脸凭证优先级错误：优先用了登录接口返回的空/错误 sfbToken，而非 URL 里的苏服办 token
- 支付宝无 URL token，只能靠 getTicket 换 token；若 my.onMessage 未绑定会表现为「没反应」

## 涉及文件与归属
- 涉及 index.html、App.vue、loginWithSfbTicket
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 618cde10-d52f-49ca-a993-700278308c9e；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_token_fix",
  "source_extraction_id": "0a3c17d20fbd48f7804787d4f6d0736e",
  "version": 1,
  "memory_type": "entities"
}
-->