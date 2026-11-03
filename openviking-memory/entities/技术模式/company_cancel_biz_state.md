# 机构注销列表移除机构类型筛选并增业务状态列
`companyCancel/index.vue` 移除机构类型筛选，新增业务状态列展示 bizState。

## 筛选移除
- 移除「机构类型」筛选及 `companyType` 参数
- 移除 `company_type` 字典加载残留

## 列表增强
- 于「注销原因」与「操作」间新增「业务状态」列
- 使用 `zs-table-column` 绑定 `prop="bizState"` 与 `dict-url="biz_state"`

## 验证与归属
- 验证证据：extracted source=cursor session=0ddf3408-a91a-40b6-a6b4-be7f00a8a464
- 涉及文件：companyCancel/index.vue、companyRecordAgency/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：0ddf3408-a91a-40b6-a6b4-be7f00a8a464；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_biz_state",
  "source_extraction_id": "154e1f80c9644439946847ff8e8bf216",
  "version": 1,
  "memory_type": "entities"
}
-->