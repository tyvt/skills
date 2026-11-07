# E2E 登录无人值守方案
跑防汛自动化测试时，让本地后端 `/code` 直接返回 captcha 答案，比图片识别更稳定。

## 背景与方案
- 本地后端和数据库均在本机（DBX 已连），无需脚本做 OCR 验证码识别
- 用户诉求：不要走图片识别，让 `/code` 接口返回 captcha 答案，启动本地苏住房后端服务，代理过去
- 图片识别在 CI/无人值守场景天然不稳定，会让 E2E 偶发红且掩盖真实缺陷

## 实施要点
- 本地起后端网关与业务服务，让 `/code` 响应体带 captcha 答案（测试环境专用分支/开关，不带生产）
- E2E 登录流程读该答案直接填入验证码框，配合 `ctx.ui.login`
- 代理链路：前端 dev 站点接口代理指向本地后端（`env/.env` 代理/后端地址），nginx 站点同理
- 测试账号用联调专用账号（如 `zsbase`）而非真实业务账号，避免污染生产数据
- 验收后清掉本地跑出的历史测试数据

## 验证与归属
- 来源会话 session-42ca405e-529e-4af3-98b5-81e2b92083de（基线 6156653）用户诉求 1/4/6
- 测试账号 zsbase / Zs@2026Aa! 走完整联调
- 涉及文件：env/.env、env/.env.test、zhi2-web-admin/src/views/login.vue、e2e-flood-crud.cjs


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_login_bypass",
  "source_extraction_id": "f53177084e504b838182c24425977ff7",
  "version": 1,
  "memory_type": "entities"
}
-->