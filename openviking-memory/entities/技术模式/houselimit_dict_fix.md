# 业务类型字典回退修复
苏州市房地产监测V3 的 `houseLimitAudit/index.vue` 修复了「业务类型」列显示原始数字（如 1）而非字典中文的问题。

## 问题根因
- 「业务类型」列原用 `type: 'tag'` + `options: this.bizTypeOptions`，未配置 `dictUrl`
- `zs-table-column` 在 `options` 为空时按字段名回退请求 `business_type`，而非正确的 `house_limit_business_type`
- 码值 `1` 匹配不到字典，只能显示原始数字
- 「业务状态」列正常，因其用了 `dictUrl: BIZ_STATE_DICT_TYPE` 自行拉字典

## 修改内容
- 列表列：加上 `dictUrl: HOUSE_LIMIT_BUSINESS_TYPE_DICT`
- 搜索筛选项：从 `select` + 手动 options 改为 `type: 'dict'` + `dictUrl`

## 验证与归属
- 刷新页面后业务类型显示中文；若仍显示 `1` 需核对后台字典 `house_limit_business_type` 配置
- 所属项目：苏州市房地产监测V3；来源会话：a4b95ede-26b5-43a3-8433-7a4a7725ca8c
- 涉及文件：`src/views/building/houseLimitAudit/index.vue`、`houseLimitConstants.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "houselimit_dict_fix",
  "source_extraction_id": "638fb30e6cd94513816c8de2632f1313",
  "version": 1,
  "memory_type": "entities"
}
-->