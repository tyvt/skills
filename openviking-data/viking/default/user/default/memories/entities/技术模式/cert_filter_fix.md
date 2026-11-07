# 证书管理筛选条UI修复
苏州市房地产监测V3 证书管理 UI 筛选条已按 CSS 分析修复，待本地验证。

## 修改内容
- 修复 `form-content-col` 的 flex 布局，使搜索条横向排列
- 搜索条横向 mixin 调整
- `zs-form` 容器判断修正

## 背景与验证
- 后台 Playwright 探测已跑完（约35s，退出码0），但登录后仍停在 `http://localhost:8082/login#/login?redirect=%2Ftodo`，通用选择器未能真正登进系统，未用自动化验证证书管理筛选条
- 涉及文件：`ProjectCertificateTabs.vue`、`element-ui.scss`、`src/styles` 等
- 所属项目：苏州市房地产监测V3；来源会话：f702fb33-72f8-4f2e-bc90-481ed771ea30
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_filter_fix",
  "source_extraction_id": "31186a8f7ee640d1ae7c16b5a1e5ae2a",
  "version": 1,
  "memory_type": "entities"
}
-->