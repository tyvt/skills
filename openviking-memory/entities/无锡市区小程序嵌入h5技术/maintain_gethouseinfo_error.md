# 维修资金房屋信息报错源自getHouseInfo
pages_owner/maintain/index.vue 页面维修资金与房屋明细报错，根因是 POST /external/maintenanceHouse/getHouseInfo 接口调用异常。

## 问题现象
- 维修资金与房屋明细页面报错
- 报错指向房屋余额及交易明细查询失败

## 根因
- 报错源自 `POST /external/maintenanceHouse/getHouseInfo` 接口
- 该接口前置 `GET /external/maintenanceHouse/getToken`
- 调用位于 zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/index.vue 151-162 行

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：无锡市区小程序嵌入H5/016.md
- 涉及文件：src/pages_owner/maintain/index.vue、src/api/repair.js、src/store/repair.js、src/api/index.js、src/utils/h5Context.js、src/api/maintenance.js、src/pages_owner/maintain/utils.js、src/pages_owner/maintain/components/TransactionTable.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：a343d1aa-9a2b-44b9-9046-e30e130c5be6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "maintain_gethouseinfo_error",
  "source_extraction_id": "eff8d90abd104a4a8d65d75af3d6c80f",
  "version": 1,
  "memory_type": "entities"
}
-->