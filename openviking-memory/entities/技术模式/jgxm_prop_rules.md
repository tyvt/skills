# 监管项目prop与rules不一致致校验失效
审查 `jgxm/detail.vue` 发现 prop 与 rules 不一致导致 required 校验可能绑不上表单项。

## 问题根因
- `prop="regulatorProjectNameOriginal"` 与 `rules.regulatorProjectName` 不一致，required 校验可能绑不上表单项。
- flex 容器内需用 `:deep(.el-input)` 保证输入撑满宽度。

## 解决方案
- 本次未改代码，仅作为审查记录与后续修复提示。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/023.md
- 涉及文件：jgxm/detail.vue、detailLayout.js、Step1BasicInfo.vue、superviseBank/detail.vue、package.json
- 所属项目：苏州市房地产监测V3；来源会话：7f739b97-ea61-46d6-9fa0-e1be2e315211；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jgxm_prop_rules",
  "source_extraction_id": "24ce2097e17b4d698afe338a8b2912e2",
  "version": 1,
  "memory_type": "entities"
}
-->