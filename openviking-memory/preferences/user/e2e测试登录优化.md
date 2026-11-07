- 若一次登录可完成的用例，合并为单用例单次登录，内部用 test.step 保留分步结果，步骤间共用同一 page 不重复登录/恢复会话
- 跨账号场景保留必要登录（如审批需管理端登录，清理需 switchToCompany 切回企业端）
- 增强 auth-helpers.js 中 loginAsCompanyOnce 恢复会话后的动态路由注入，供其他 spec 复用
- 涉及文件：auth-helpers.js、e2e/company/personnel-record.spec.js；所属项目：产品2.0；来源会话：8e08b807-7c70-4ef1-9c7b-e56fd2d3d711

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "E2E测试登录优化",
  "source_extraction_id": "a48dd282358949759bf01ba7db0ac1c9",
  "version": 1,
  "memory_type": "preferences"
}
-->
