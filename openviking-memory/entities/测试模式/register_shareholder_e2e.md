# 企业注册导航与股东E2E测试
产品2.0 的 zhi2-web-admin 企业注册全流程 E2E 测试 navigation-shareholder.spec.js 已通过，覆盖步骤回退与股东增删改查。

## 测试覆盖
- 两项 E2E 测试均通过（约 50s），用例文件 e2e/register/navigation-shareholder.spec.js
- Step2/3/4 点击上一步：Step1 企业名保留、Step2 法人姓名保留、Step3 要件配置恢复、Step4 可再次前进
- Step4 股东维护：新增 → 编辑（王五→赵六）→ 行删除 → 批量新增两人 → 批量删除

## 修复要点
- Step2 返回后再前进需重新填写图片/短信验证码，新增 proceedStep2WithSave helper
- 股东身份证 320501199001010009 校验位无效，改用 TEST_ID_NUMBER_PRIMARY / TEST_ID_NUMBER_SECONDARY
- Step3 附件恢复：Step3Appendix.vue 中先 loadConfig 再 loadUploadedList，增强 enrichUploadedList 的 appendixConfigId 匹配
- 批量删除按钮限定为 .table-action

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：e2e/register/navigation-shareholder.spec.js、Step3Appendix.vue、e2e/fixtures/register-helpers.js
- 所属项目：产品2.0；来源会话：706c30d3-6c4d-4142-b37e-3c31a05c20b6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "register_shareholder_e2e",
  "source_extraction_id": "c5172269f24c433381c4000831c218d5",
  "version": 1,
  "memory_type": "entities"
}
-->