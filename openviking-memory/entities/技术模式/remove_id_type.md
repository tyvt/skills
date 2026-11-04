# 从人员详情页移除证件类型字段
在 苏州市房地产监测V3 项目中，从 `AgencyPersonnelDetail.vue` 和 `LeasePersonnelDetail.vue` 的编辑表单中移除了 «证件类型» 项。

## 问题根因
- 编辑表单显示了多余的 «证件类型» 字段
- `basicInfoView` 显示了该字段；存在必填规则 `idType` 和字典 `document_type` 的加载

## 解决方案
- 在 `AgencyPersonnelDetail.vue` 和 `LeasePersonnelDetail.vue` 中从表单移除该项
- `basicInfoView` 隐藏该字段
- 删除必填规则 `idType` 和字典 `document_type` 的加载
- 在表单中保留默认值 `idType: '01'` 并在保存 payload 中保留该值；后端逻辑保持兼容

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/066.md
- 涉及文件: AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; 会话: 5d103f6d-b346-4d26-8144-3e36ee398668; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_id_type",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->