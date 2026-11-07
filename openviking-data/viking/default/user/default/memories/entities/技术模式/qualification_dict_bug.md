# 资质详情页资质状态未加载字典
苏州市房地产监测V3 中 `zhi2-web-admin/src/views/toB/qualificationRecord/detail.vue` 的「资质状态」字段误设 `type:'text'` 且未加载字典，显示原始值 `1`。

## 问题根因
- 「资质状态」字段误设 `type: 'text'` 未绑定字典，直接显示原始值 `1`
- 后端未配置对应字典条目导致无法映射显示

## 解决方案
- 字段改为 `type: 'tag'` 并绑定 `qualificationStateOptions`
- `data` 新增 `qualificationStateOptions` 数组
- `initDict()` 加载 `company_qualification_state` 字典
- 后端需配置 `company_qualification_state` 对应字典条目

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/124.md
- 涉及文件：zhi2-web-admin/src/views/toB/qualificationRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a161b2-e6e3-7553-b4af-dfec6cfefa0f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_dict_bug",
  "source_extraction_id": "49b1868bc018469f96c995906c65075e",
  "version": 1,
  "memory_type": "entities"
}
-->