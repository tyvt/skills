# 业主维修资金首页走external/maintenanceHouse双步接口
pages_owner/maintain/index.vue的维修资金链路是GET /external/maintenanceHouse/getToken再POST /external/maintenanceHouse/getHouseInfo，非AppMaintain。

## 接口链路
- GET /external/maintenanceHouse/getToken取外部系统token
- POST /external/maintenanceHouse/getHouseInfo，body含token与houseId（字符串）
- 完整前缀为VITE_APP_API_BASE_URL或小程序注入的BASE_URL/api/v2.0
- Toast「查询房屋信息失败」等多为后端返回的msg，经@/api/index.js拦截器统一弹出，表示外部维修资金系统按该房屋唯一号查不到数据

## 区别与注意
- 项目内另有/estate/AppMaintain/*（repair.js，如selectAccount）供其他维修资金列表/明细页使用，勿与当前H5首页混查
- houseId示例H320214000001603

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：a343d1aa-9a2b-44b9-9046-e30e130c5be6
- 验证会话：a343d1aa-9a2b-44b9-9046-e30e130c5be6（基线38bd192），用户截图报错页对应maintain/index.vue
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/index.vue、src/api/repair.js、src/api/index.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "external_maintenance_house",
  "source_extraction_id": "bbb7f3378b7b486988e7b7bf5524a595",
  "version": 1,
  "memory_type": "entities"
}
-->