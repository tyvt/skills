# web-view嵌入场景的houseId统一解析
小程序web-view嵌入H5时，维修资金等页的房屋上下文统一由utils/h5Context.getH5Selection解析，避免各页散落读URL。

## 解析规则
- houseId优先取getH5Param('houseId')，否则回退userStore.houseId
- communityName等同理通过getH5Selection统一获取

## 联调约束
- 传给/external/maintenanceHouse/getHouseInfo的houseId须与维修资金侧「房屋唯一号」一致
- 联调失败先核对小程序入参链路与后端映射，而非先改前端文案

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话a343d1aa引用getH5Selection代码段，截图H320214000001603即getHouseInfo入参来源
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/h5Context.js、src/pages_owner/maintain/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：a343d1aa-9a2b-44b9-9046-e30e130c5be6；代码基线：38bd192

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "h5context_geth5selection",
  "source_extraction_id": "15d4ef385e484d06ad824eb7386927bc",
  "version": 1,
  "memory_type": "entities"
}
-->