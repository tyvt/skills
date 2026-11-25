# 苏住房防汛C端H5 验证码登录与实机登录要点
苏住房防汛C端H5（zhi2-mobile-query-h5-c-unlimited）真实接口的短信/图形验证码登录流程，以及 agent-browser 实机登录踩坑。

## verify 模式登录流程
- portal/appLogin/captcha 返回 uuid + 4 位图片，页面挂载即拉取且强制图形验证码。
- 后续依次传 phone、证件号后几位（idNumberSuffix）和 SMS 验证码。
- 用户曾提供 SMS 码 123456，但缺 phone 与 idNumberSuffix 无法登录。
- 登录为短信三重校验；原无头表单流程无法拿 token，助手无法直接拉真实数据。

## 实机状态与输入
- 新浏览器会话 localStorage 无 token，列表空态「暂无求援记录」即未登录，需按交接文档第 7 节重新完整登录；登录后求援工单列表首条为 QYGD20261123000006。
- 2026-11-24 图形验证码仍强制且算式示例为「9-0=?」（9）、「7+6=?」（13）、「4+5=?」（9）；图片常较小模糊，需裁剪放大精读。
- 验证码输入框必须用 type 键入，不能用 fill（uni-app v-model 不响应 fill）。
- 密码框报「位数不能多于16位」时先核对实际值长度；须先清空再 type，避免重复追加。
- 登录失败停留登录页、token 未写入，验证码刷新且输入框清空；成功跳首页（TOKEN_OK）。

## HTTP 登录与双标签验证
- 2026-11-25 uni-app 登录表单在 agent-browser 中反复超时；HTTP 级登录（取码、识别、用应用 AES 加密 POST 登录接口）更可靠，得到 token、角色 admin、terminalType G（G 端）；待处理工单 2125426551918952449（QYGD20261125000005）用于验证。
- 2026-11-25 C 端 HTTP 登录排查：验证码与 uuid 未配对导致登录失败，需检查 `captchaOnOff` 配置并核对验证码脚本调用方式。
- 2026-11-25 C 端改用 agent-browser 同页填验证码以避免 uuid 失配；并用 8162 走 browser 注入 token 做历史页验证。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_h5_captcha_login",
  "source_extraction_id": "518c31b423ab4ec3b0236eabbead369d",
  "version": 6,
  "memory_type": "entities"
}
-->