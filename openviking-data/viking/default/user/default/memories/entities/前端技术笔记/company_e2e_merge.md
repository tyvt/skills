# 产品2.0 开发企业注册 E2E 测试视频合并优化
产品2.0 开发企业注册的 E2E 测试用例视频已从 12 段约 2.5 分钟合并为 2 段约 58 秒，测试覆盖不变。

## 优化思路
- 之前重复原因：全流程、5 个独立 UI 用例、返回导航、股东 CRUD 各自重走 Step1→3，maxlength 用例也单独打开页面，12 段全部拼进一个视频
- 调整后 `company-register.spec.js` 录 2 段：① 全流程 Step1→5（每步顺带做 UI 断言）② 步骤返回 + 股东维护（同一会话连续完成）
- `company-register-fields.spec.js` 不录屏：maxlength + 边界接口校验（4 个用例）

## 验证与覆盖
- 测试覆盖不变：仍是 6 个用例 / 12 项断言
- 运行方式不变：`npm run test:e2e:company-register`
- 合并输出：`test-results/company-register-full.webm`（约 58 秒）

## 验证与归属
- 涉及文件：`company-register.spec.js`、`company-register-fields.spec.js`、`package.json`
- 所属项目：产品2.0；来源会话ID：1a0da812-3129-4757-ad86-ae58155f438e
- 验证证据：extracted source=cursor project=产品2.0

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "company_e2e_merge",
  "source_extraction_id": "b12861a579a6400884413657f5f2a484",
  "version": 1,
  "memory_type": "entities"
}
-->