# 监管项目表单 prop 与 rules 不一致致校验失效
苏州市房地产监测V3 监管项目 jgxm/detail.vue 中 prop 与 rules 名称不一致，导致 required 校验无法绑定表单项。

## 问题根因
- jgxm/detail.vue 中 prop='regulatorProjectNameOriginal' 与 rules.regulatorProjectName 不一致
- required 校验绑不上表单项而失效

## 修复方案
- 对齐 prop 与 rules 名称为同一字段
- flex 容器使用 :deep(.el-input) 保证输入框撑满

## 涉及文件
- jgxm/detail.vue
- src/utils/detailLayout.js
- Step1BasicInfo.vue
- superviseBank/detail.vue
- package.json

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/223.md
- 来源会话：7f739b97-ea61-46d6-9fa0-e1be2e315211；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jgxm_prop_rules_mismatch",
  "source_extraction_id": "8b8969cc4b26467f9fcb5928d426f082",
  "version": 1,
  "memory_type": "entities"
}
-->