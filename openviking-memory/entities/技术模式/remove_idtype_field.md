# 在人员详情页面中移除 idType 字段
已移除编辑项「证件类型」、展示 `basicInfoView` 和必填验证 `idType`，涉及 `AgencyPersonnelDetail.vue` 和 `LeasePersonnelDetail.vue`；停止加载字典 `document_type`。

## 详情
- 保存负载仍然发送 `idType:'01'` 以与后端兼容
- 还影响 e2e 测试：agency-personnel-real-api-flow.spec.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：5d103f6d-b346-4d26-8144-3e36ee398668
- 验证证据: src=苏州市房地产监测V3/266.md
- 涉及文件: AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; 会话: 5d103f6d-b346-4d26-8144-3e36ee398668; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_idtype_field",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 1,
  "memory_type": "entities"
}
-->