# 资质详情页状态字典未加载
资质详情页「资质状态」字段因未加载字典显示原始值1，改为tag类型绑定字典选项修复。

## 问题根因
- `toB/qualificationRecord/detail.vue` 的 `contentInfo` 中「资质状态」为 `type: 'text'` 且未加载字典，显示原始值 `1`
- 旧列表 `qualificationTable.vue` 用 `certState` 字段未改动

## 解决方案
- `detail.vue` 改为 `type: 'tag'` 绑定 `qualificationStateOptions`
- `data` 中声明空数组 `qualificationStateOptions`
- `initDict()` 加载 `company_qualification_state` 字典

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/324.md
- 涉及文件：toB/qualificationRecord/detail.vue、qualificationTable.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a161b2-e6e3-7553-b4af-dfec6cfefa0f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_status_dict",
  "source_extraction_id": "bcd04e9a91754eea9e43e07c2c83f87f",
  "version": 1,
  "memory_type": "entities"
}
-->