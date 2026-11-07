- 主流 PC 浏览器测试配置为 Chromium（Chrome）、Firefox、Edge 三个项目，未包含 WebKit（Windows 上录像会报写入路径错误）。
- 录像配置 `video: 'on'`，每个用例无论成功或失败都会录制并保存为 `video.webm`。
- 将 `/404` 加入路由白名单，以便未登录也能访问 404 页；修正 404「返回首页」用例断言（未登录时会被重定向到登录页）。
- 配置 `reuseExistingServer: true`，端口被占用时会复用已有 dev 服务。
- 涉及文件 `playwright.config.js`，所属项目 2-0；已跑通 36 passed（12 用例 × 3 浏览器，约 33.7s）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Playwright测试配置",
  "source_extraction_id": "7b9e232713d94e20ac5b54d4b643803b",
  "version": 1,
  "memory_type": "preferences"
}
-->