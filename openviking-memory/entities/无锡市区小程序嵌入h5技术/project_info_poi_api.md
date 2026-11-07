# 小区信息页数据与周边POI接口分工
pages_owner/project/info/index.vue的小区详情、地图Key与周边配套分别调用不同接口，避免与维修资金接口混淆。

## 小区详情与Key
- 小区详情GET /property/complex/getExtendedByComplexId/{complexId}（property.js getPropertyDetail），含complexName、address、buildingCount、houseCount、subdistrictName、communityName、xcoordinate/ycoordinate等字段
- 展示「交付日期」用deliveryYear映射，后端deliveryDate为空则显示-
- 地图Key：GET /system/config/getByKey/qq.map.key（与园区项目同一配置键）

## 周边配套localSearch
- 先调腾讯geocoder/v1逆地理取adcode拼boundary，再place/v1/search
- keyword为分类名，filter为facilityCategory（transaction.js）中的poi编码，orderby _distance
- 列表距离来自_distance，纯展示地图不要与维修资金接口混淆

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话b30d2f3f用户问小区信息页用的接口，结论列出后端详情、配置Key、腾讯WebService两步及facilityCategory表
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/project/info/index.vue、src/api/property.js、src/utils/transaction.js、src/utils/qqMapKey.js
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：b30d2f3f-1f15-46f0-9efa-aa95170ed55f；代码基线：289666e

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "project_info_poi_api",
  "source_extraction_id": "db939e041a9d4a98beb9e35906b8523f",
  "version": 2,
  "memory_type": "entities"
}
-->