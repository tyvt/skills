# 在 gitignore 中忽略门户的 E2E 产物
门户的 E2E 测试生成的临时产物必须被 Git 忽略。

## 描述
- 截图和测试结果是临时产物
- `.gitignore` 应忽略 `tests/e2e/screenshots/` 和 `test-results/`
- 已被跟踪的文件必须被移除

## 涉及的文件
- `zhi2-web-admin/tests/e2e/unified-login-visual.spec.ts`
- `zhi2-web-admin/playwright.config.ts`
- `zhi2-web-admin/src/views/home/UnifiedLogin.vue`

## 验证与归属
- 验证证据: `src=门户/024.md`
- 所属项目: portal (门户)
- 会话: `58e74ae7-d504-49ac-8c05-02b1c6cadd94`
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_e2e_gitignore",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->