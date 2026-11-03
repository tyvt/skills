# Vite 开发环境用 window.open 打开 public 下 PDF 落到 index.html
门户 UnifiedLogin 等 hash 路由页面里，直接 window.open 打开 public 下 PDF 在 Vite dev 常被当成 SPA 导航回 index.html。
## 问题现象
- 点击预览仍是页面而非 PDF，URL 带上 #/UnifiedLogin?redirect=...。
- 同路径 fetch 却能拿到 content-type: application/pdf。
## 修复做法
- 先 fetch PDF → URL.createObjectURL 在新标签打开。
- 弹窗被拦则在当前页用 blob 打开，不要回退到静态路径导航。
- E2E 断言响应为 application/pdf、当前 hash 路由未误开弹层。
## 验证与归属
- 会话 b92385ab：用户反馈点击预览仍是页面；根因 Vite 下 window.open 按页面导航处理。
- 改为 fetch+blob URL，unified-login-visual.spec.ts 6/6 通过。
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、publicPortal/pages/InformationPages.vue、tests/e2e/unified-login-visual.spec.ts。
- 所属项目：门户；代码基线：dfee5a6；来源会话ID：b92385ab-4138-464e-904b-5e1850ffa89d。

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "portal_pdf_window_open",
  "source_extraction_id": "08a22315a92147d78d710883711e5733",
  "version": 1,
  "memory_type": "entities"
}
-->