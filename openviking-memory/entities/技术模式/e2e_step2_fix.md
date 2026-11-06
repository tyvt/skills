# 企业注册 Step2 表单标签对齐测试竞态修复
苏州市房地产监测V3 中 register 用例因 Step2 表单未挂载完成即断言 label 数量导致失败，已调整测试等待逻辑。

## 失败原因
- register-step-2 容器在 v-if 可见但内部 Step2LegalPerson 表单可能未挂载
- 测试仅等容器可见即查找 .el-form-item__label，此时 count 为 0

## 修复内容
- assertRegisterFormLabelRightAligned 改为等待第一个 label 可见而非检查数量
- Step2 用例额外等待「法定代表人姓名」输入框可见确保表单挂载

## 验证与归属
- 连跑 3 轮共 9 个 register 用例均通过
- 涉及文件：company-register-visual.spec.js、register-helpers.js、Step2LegalPerson.vue
- 所属项目：苏州市房地产监测V3；来源会话：a2d69268-dd50-4d1d-ad28-dc9e24e9c0e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_step2_fix",
  "source_extraction_id": "78f87c11712447268d552847ce02e222",
  "version": 1,
  "memory_type": "entities"
}
-->