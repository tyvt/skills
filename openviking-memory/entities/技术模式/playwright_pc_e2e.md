# Playwright PC三浏览器全量E2E录屏规范
产品2.0要求主流PC浏览器跑全量E2E且无论成败保留录像。
## 解决方案
- playwright.config的use设video:'on'，outputDir为test-results
- projects配Chromium(Desktop Chrome)、Firefox、Desktop Edge三个桌面项目，移动端不测
- Windows上WebKit录像常失败，PC验收以Chrome/Edge/Firefox为主时可先不配WebKit
- webServer用reuseExistingServer:true避免端口占用重复起dev
- 未登录场景测404把/#/404加入路由白名单；断言返回首页接受重定向到登录页而非dashboard
## 涉及文件
- zhi2-web-admin/playwright.config.js
- zhi2-web-admin/tests/e2e
## 验证与归属
- 所属项目：2-0；代码基线：none
- 验证证据：会话d648e339要求覆盖主流PC浏览器、成功失败都录屏；结论36 passed(12×3)、video.webm落盘、配置chromium/firefox/edge与video:'on'
- 来源会话ID：d648e339-2291-4af1-9452-f7df11d80f3b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_pc_e2e",
  "source_extraction_id": "e7cf9d3a99174c338e4a5820d2038936",
  "version": 1,
  "memory_type": "entities"
}
-->