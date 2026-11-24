# 苏住房G 大屏页
苏住房G 项目的大屏展示页面，通过 8101 端口在实机环境访问与验证。

## 访问与登录
- 通过 8101 端口打开，未登录时会跳转到登录页。
- 登录账号为 zsbase，密码为 10 位。
- 登录页使用算术验证码，本次为 `8+1=?`（答案 9）；验证码图为页面第 4 个 img，以 base64 data URL 返回，需解码落盘后 OCR。

## 验证进展
- 2026-11-24 填入验证码 9 并点击登录后仍停留登录页，无 token、也无红字报错，接口响应与验证码刷新状态待查。
- 切换测试网关后需重建会话并重新登录才能验证页面。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "前端页面",
  "name": "苏住房g大屏页",
  "source_extraction_id": "8f450e1205b9484b83642ded6f3e51ad",
  "version": 1,
  "memory_type": "entities"
}
-->