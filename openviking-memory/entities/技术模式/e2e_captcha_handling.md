# 测试环境验证码处理方案
产品2.0自动化测试不推荐用 OCR 识别验证码，应在测试环境弱化或绕过验证码。

## 推荐方案
- 测试环境将 `/code` 接口改为返回固定内容（如 1234），后端校验时测试环境放行
- 纯技术可用 tesseract.js 对规则蓝字验证码做 OCR，但识别不稳定、实现复杂，且偏离 E2E 关注用户登录流程的真实目标

## 涉及文件
- tesseract.js
- res.js（`/code` 接口）

## 验证与归属
- 所属项目：2-0；来源会话：be5b577d-159c-4126-a301-a93c2e1de71f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_captcha_handling",
  "source_extraction_id": "8a9af5502aec47c3be80b7a1a22b0f05",
  "version": 1,
  "memory_type": "entities"
}
-->