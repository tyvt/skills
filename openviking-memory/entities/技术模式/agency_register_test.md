# 经纪/租赁机构一步注册改造测试
苏州市房地产监测V3 经纪/租赁机构一步注册改造后执行 13 条 Playwright 用例（production-readonly 项目）的测试结果。
## 测试结果
- 通过 11 条，跳过 2 条（真实接口联调），失败 0 条
- 通过主要用例：Mock `institution-register-flow.spec.js`、布局 `register-layout.spec.js`、企信通 `institution-register-extract.spec.js`、租赁 `lease-institution-register-organ-type.spec.js`（busCode=030300、无加盟品牌）、`institution-register.spec.js` 租赁单页可见性
- 跳过用例：`institution-register-real-api-flow.spec.js`（saveAndSubmit 返回 500）、`institution-register.spec.js` 单页联调（后端 saveA 异常）
## 验证与归属
- 涉及文件：`institution-register-flow.spec.js`、`register-layout.spec.js`、`institution-register-extract.spec.js`、`lease-institution-register-organ-type.spec.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：73cbbe2e-2230-4506-9d89-48940a649115；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_register_test",
  "source_extraction_id": "069f712b5e4e47259870a25360d9451d",
  "version": 1,
  "memory_type": "entities"
}
-->