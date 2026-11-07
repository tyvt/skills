# 合同文本 PDF 预览改为 fetch+blob
门户在 Vite 开发环境直接 window.open PDF 会回退到首页，已改为先 fetch 再用 blob URL 打开。

## 根因
- Vite 开发环境（8082）中 window.open('/assets/files/xxx.pdf') 被按页面导航处理，常回 index.html，出现 …/assets/files/…pdf#/UnifiedLogin?redirect=/index（门户首页而非 PDF）。
- 同路径 fetch 能拿到 application/pdf（测试已验证）。

## 修复要点
- 合同打开改为：先 fetch PDF → 用 blob URL 在新标签打开。
- 若弹窗被拦，则在当前页用 blob 打开，不再回退到静态路径。

## 验证
- 已在 8082 跑完 E2E，6/6 通过；断言拉取 PDF（content-type:application/pdf）、URL 无重复 assets/files、当前页仍在 /#/UnifiedLogin、未误开门户弹层。
- 涉及文件：index.html、tests/e2e/unified-login-visual.spec.ts、UnifiedLogin.vue；来源会话 b92385ab-4138-464e-904b-5e1850ffa89d；项目门户。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pdf_preview_blob",
  "source_extraction_id": "1121f675ae5041a1b8d5b2fb551f6b4f",
  "version": 1,
  "memory_type": "entities"
}
-->
