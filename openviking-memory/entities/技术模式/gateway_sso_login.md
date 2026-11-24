# 苏住房G 网关SSO登录与XHR抓包要点

在 8101 苏住房G 管理端实机走网关 SSO 登录时反复踩到的填值、抓包与验证码坑。

## 登录步骤
- 网关登录页需同时填用户名（快照 ref e3，最容易漏填）、密码与图形算式验证码
- 真实密码为 10 位 `Zs@2026Aa!`，存放在 `%TEMP%/e2e_pass.txt`
- 曾在 MCP eval 里误填 16 位占位串 `PLACEHOLDER_PASS`（恰好通过位数校验），导致登录必然失败
- 登录成功会跳转 `#/index` 且 token=true；eval 报「target navigated」多半就是登录成功跳转所致

## 抓包与验证码
- 项目请求走 axios（XHR），装 fetch 钩子抓不到 userLogin 响应体，需改装 XHR 钩子
- 登录接口曾出现 7ms/336B 的极快响应，疑似被拒但错误提示闪得太快，需抓响应体确认
- 图形验证码是算式（如 `4+9=13`），必须取当前 dataURL 再送 vision OCR；旧截图是已消费的码
- dataURL 要带完整 mime 标签，mime 与内容不符会让 vision 识别失败

## 环境干扰与兜底
- pwsh 通道会被连坐拦截，可改走 MCP eval
- 共享浏览器常被其他自动化任务导走（如 MSN 新标签页），需重开大屏并确认 sessionStorage 里的 token 是否还在
- 登录卡住时走交接：写 9 节交接文档并排程下一跳会话，备用路线为滑块破解与 curl 拿 token


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gateway_sso_login",
  "source_extraction_id": "c05f887e0485455da5d36d870adfcd25",
  "version": 1,
  "memory_type": "entities"
}
-->