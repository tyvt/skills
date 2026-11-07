# 租赁合同备案页业务状态筛选来源
产品2.0 租赁合同备案页 `resourcesLeaseContractFiling/index.vue` 自创建起即包含「业务状态」筛选项，并非后续追加。

## 首次加入信息
- 首次加入时间：2026-05-07；提交人：cll（1005583730@qq.com）；提交：`717e0e6f1`
- 说明：租赁合同停车泊位；页面从租赁合同功能拆出时即带完整筛选区

## 筛选区构成
- 包含：物业管理区域名称、合同名称、资源类型、承租方名称、缴款状态、业务状态
- 原 `pubRevenueContract/index.vue` 列表有「业务状态」列但搜索区无此筛选项

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`resourcesLeaseContractFiling/index.vue`、`pubRevenueContract/index.vue`
- 所属项目：产品2.0；来源会话：7fcdcc25-208a-4099-b05d-179f9783abeb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_filing_filter",
  "source_extraction_id": "fe9e7839c3e6497a831416b10b84332b",
  "version": 1,
  "memory_type": "entities"
}
-->