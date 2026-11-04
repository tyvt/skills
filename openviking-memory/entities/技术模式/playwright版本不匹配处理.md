# playwright版本不匹配处理
在 nginx 部署站点跑 Playwright 用例时，包版本与浏览器版本不匹配会导致浏览器起不来。
## 根因
- Playwright 按自身版本去 ~/.cache/ms-playwright 找对应版本号目录
- 机器装的是旧版浏览器（如 1243）而包是新版（如去找 1248），目录名对不上直接失败，E2E 连启动都做不到
## 处理要点
- 先核对两边版本：包版本看 node_modules/@playwright/test 的 version，浏览器目录看 ~/.cache/ms-playwright 下的目录名
- 临时用目录联接（junction）补出期望的版本目录指向已装浏览器目录（本批建了两个 1248 目录联接）
- 验证完把临时联接全部删除，并确认原有 1243 浏览器包完好（310 个文件）
- 长期解法是让浏览器版本与包版本对齐，不要长期留联接以免掩盖不匹配
## 验证与归属
- 验证证据：会话 session-c8f6771f-0380-4bad-a2ab-8390785d2a68（基线 d8addc3）最终结论第 4 点
- 涉及文件：zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts、zhi2-web-admin/package.json
- 来源会话：session-c8f6771f-0380-4bad-a2ab-8390785d2a68；代码基线：d8addc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright版本不匹配处理",
  "source_extraction_id": "4e7595f56a8b4f269590e606ea01b358",
  "version": 1,
  "memory_type": "entities"
}
-->