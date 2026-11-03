# 苏周到扫码登录接口与职责拆分
门户 UnifiedLogin 接入苏周到时后端契约为三个 POST 接口，login 仅在授权回调页调用。

## 接口契约
- 三个接口均为 POST：getQrLoginParam（返回 qrCodeId、qrUrl，pageUrl 指向前端授权成功链路）
- scanLogin?qrCodeId=...（PC 端轮询，未扫码时 accessToken 为 null）
- login（入参 { code, qrCodeId } 换登录态）

## 职责拆分
- 苏周到 H5 打开 pageUrl 上的授权回调页，在回调页 created → submitAuth() 里调用 login
- 仅当 code == 200 才 replace 到成功页（如 SuzhouDaoAuthSuccess.vue）
- 成功页只做展示与「完成」关窗，不得再调 login
- PC 主流程靠登录页轮询 scanLogin 拿 accessToken，与成功页无关

## 落地注意
- 扫码 H5 与回调/成功页放在当前 zhi2-web-admin 工程内
- 核对 nginx/网关前缀与 env 一致

## 涉及文件与归属
- 涉及 SuzhouDaoAuthCallback.vue、SuzhouDaoAuthSuccess.vue、UnifiedLogin.vue、src/api
- 所属项目：门户；来源会话 f66860ed；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_dao_login",
  "source_extraction_id": "24c50c3f5b784d6182980508c1026f96",
  "version": 1,
  "memory_type": "entities"
}
-->