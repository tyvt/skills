- 在从业人员 E2E 测试中，若一次登录可完成的多个步骤，合并为单个用例并仅登录一次，避免重复登录/恢复会话
- 跨账号场景（如管理端审批）保留必要登录，审批后使用 `switchToCompany` 完整切回企业端
- 增强 `auth-helpers.js` 中 `loginAsCompanyOnce` 恢复会话后的动态路由注入，供其他 spec 复用
- 来源会话：8e08b807-7c70-4ef1-9c7b-e56fd2d3d711（产品2.0）

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "E2E测试登录策略",
  "source_extraction_id": "3689ba371e1f48ea9ea4cc5ea35e0fbf",
  "version": 1,
  "memory_type": "preferences"
}
-->