# 缺少 dictUrl 的业务类型列显示了原始数字

在项目 苏州市房地产监测V3 中，"业务类型"列因缺少 `dictUrl` 而显示原始数字代码；已通过字典配置修复。

## 问题根因
- `houseLimitAudit/index.vue` 中的 "业务类型" 列使用了 `type: 'tag'` 但未配置 `dictUrl`
- 组件回退到错误的字典，将代码显示为原始数字

## 解决方案
- 列表列添加了 `dictUrl: HOUSE_LIMIT_BUSINESS_TYPE_DICT`
- 搜索项改为 `type: 'dict'` + `dictUrl`

## 验证与归属
- 验证证据: src=cursor session=a4b95ede-26b5-43a3-8433-7a4a7725ca8c
- 涉及文件: building/houseLimitAudit/index.vue, building/houseLimit/houseLimitConstants.js, mixins/ListTemplate.js, components/zs-table-column/zs-table-column.vue, components/dict-tag/dict-tag.vue, building/houseLimit/limitFormMixin.js, components/zs-search-form/SearchFormItem.vue
- 所属项目: 苏州市房地产监测V3; 会话: a4b95ede-26b5-43a3-8433-7a4a7725ca8c

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "house_limit_business_type_dict",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->
