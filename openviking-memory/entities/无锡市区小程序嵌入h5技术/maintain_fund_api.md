# 维修资金页房屋信息接口
pages_owner/maintain/index.vue的维修资金房屋信息由两步外部接口获取，报错常发生在第二步getHouseInfo。

## 接口流程
- 第一步 GET /external/maintenanceHouse/getToken：获取维修资金外部系统令牌
- 第二步 POST /external/maintenanceHouse/getHouseInfo：查询房屋余额、地址、交易明细（报错常在此）
- 完整URL为 {VITE_APP_API_BASE_URL 或小程序 BASE_URL/api/v2.0} + 上述路径

## 页面与报错
- 对应页面：pages_owner/maintain/index.vue（维修资金/您的房屋专属资金账户/房屋历史交易明细布局）
- 报错来自该页拉取维修资金房屋信息时的接口调用

## 验证与归属
- 涉及文件：src/pages_owner/maintain/index.vue、src/utils/h5Context.js、@/api/index.js
- 来源会话：a343d1aa-9a2b-44b9-9046-e30e130c5be6
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "maintain_fund_api",
  "source_extraction_id": "b152b5befc5a42e3af934b208fbec5c4",
  "version": 1,
  "memory_type": "entities"
}
-->