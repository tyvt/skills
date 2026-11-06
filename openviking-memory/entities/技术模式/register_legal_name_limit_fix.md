# 注册法人姓名长度限制修复
苏州市房地产监测V3 开发企业注册中法人姓名输入框长度限制与校验修复，避免超长触发后端 400 错误。

## 修复要点
- `Step2LegalPerson.vue` 法人姓名输入框增加 `maxlength="30"` 与 `show-word-limit`
- 使用 `v-model.trim` 去除首尾空格
- 校验规则增加 `{ min: 2, max: 30, message: '请输入2到30个字符' }`，提交前拦截超长输入
- `register-helpers.js` 中 `REGISTER_MAX_LENGTH_FIELDS.step2` 法人姓名 `max` 从 150 改为 30

## 验证与归属
- `Step2 法人信息字段 maxlength` 用例已通过（1 passed, 2.0s）
- 涉及文件：`Step2LegalPerson.vue`、`register-helpers.js`
- 项目：苏州市房地产监测V3；来源会话ID：e3d71734-ab93-48dc-b3f5-54b9eddd55be

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_legal_name_limit_fix",
  "source_extraction_id": "b4544ae815e34326a45b94c399c09bc2",
  "version": 1,
  "memory_type": "entities"
}
-->